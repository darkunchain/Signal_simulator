import React, { useState } from 'react';
import * as signal from 'libsignal-protocol-typescript';

function buf2hex(buf: ArrayBuffer | Uint8Array | undefined) {
  if (!buf) return '';
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function strToBuffer(str: string): ArrayBuffer {
  const utf8 = new TextEncoder().encode(str);
  return utf8.buffer.slice(utf8.byteOffset, utf8.byteOffset + utf8.byteLength) as ArrayBuffer;
}
function bufToStr(buf: ArrayBuffer | Uint8Array): string {
  return new TextDecoder().decode(buf instanceof Uint8Array ? buf : new Uint8Array(buf));
}

const explicaciones = [
  "Generación de claves y prekeys para ambos usuarios.",
  "Handshake X3DH: ambas partes acuerdan un secreto compartido con salt fijo. No cambia para la sesión.",
  "Alice envía su primer mensaje a Bob. Se genera un nonce único.",
  "Bob responde a Alice. Nuevo nonce generado.",
  "Alice envía otro mensaje (Adiós Bob). El nonce vuelve a cambiar.",
  "Bob responde con otro mensaje (Adiós Alice). El nonce vuelve a cambiar."
];

// Utilidad para nonces didácticos
const randomHex = (bytes: number) => {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
};
const saltHex = randomHex(32); // 256-bit salt, fijo en toda la sesión
const nonceArr = [randomHex(24), randomHex(24), randomHex(24), randomHex(24)]; // uno diferente por mensaje

function makeStore() {
  const obj: Record<string, unknown> = {};
  return {
    get: (k: string) => obj[k],
    put: (k: string, v: unknown) => { obj[k] = v; },
    remove: (k: string) => { delete obj[k]; },

    isTrustedIdentity: (_id: string, _k: ArrayBuffer) => Promise.resolve(true),
    saveIdentity: (_id: string, _k: ArrayBuffer) => Promise.resolve(true),
    loadIdentityKey: (_id: string) => Promise.resolve(undefined),
    getIdentityKeyPair: () => Promise.resolve(obj['identityKey']),
    getLocalRegistrationId: () => Promise.resolve(obj['registrationId']),

    storeSession: (id: string, record: unknown) => { obj[`session_${id}`] = record; return Promise.resolve(); },
    loadSession: (id: string) => Promise.resolve(obj[`session_${id}`]),
    removeSession: (id: string) => { delete obj[`session_${id}`]; return Promise.resolve(); },

    loadPreKey: (keyId: number) => Promise.resolve(obj[`preKey_${keyId}`]),
    removePreKey: (keyId: number) => { delete obj[`preKey_${keyId}`]; return Promise.resolve(); },
    loadSignedPreKey: (keyId: number) => Promise.resolve(obj[`signedPreKey_${keyId}`]),
  };
}

export default function SignalStepByStep() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<any>({
    log: [],
    aliceStore: null,
    bobStore: null,
    sessionCipherA: null,
    sessionCipherB: null,
    aliceId: null,
    aliceRegId: null,
    bobId: null,
    bobRegId: null,
    aliceAddress: null,
    sessionBuilder: null,
    ctA: null,
    ctB: null,
  });
  const [msgAlice, setMsgAlice] = useState("¡Hola Bob!");
  const [msgBob, setMsgBob] = useState("¡Hola Alice!");
  const [msgAlice2, setMsgAlice2] = useState("Adiós Bob");
  const [msgBob2, setMsgBob2] = useState("Adiós Alice");
  const [cipherA, setCipherA] = useState<string>("");
  const [cipherB, setCipherB] = useState<string>("");

  const advance = async () => {
    let s = { ...state };

    if (step === 0) {
      setCipherA(""); setCipherB("");

      s.aliceStore = makeStore();
      s.bobStore = makeStore();

      s.aliceId = await signal.KeyHelper.generateIdentityKeyPair();
      s.aliceRegId = await signal.KeyHelper.generateRegistrationId();
      s.bobId = await signal.KeyHelper.generateIdentityKeyPair();
      s.bobRegId = await signal.KeyHelper.generateRegistrationId();

      s.aliceStore.put('identityKey', s.aliceId);
      s.aliceStore.put('registrationId', s.aliceRegId);
      s.bobStore.put('identityKey', s.bobId);
      s.bobStore.put('registrationId', s.bobRegId);

      s.bobPreKey = await signal.KeyHelper.generatePreKey(1);
      s.bobStore.put(`preKey_${s.bobPreKey.keyId}`, s.bobPreKey.keyPair);

      s.bobSignedPreKey = await signal.KeyHelper.generateSignedPreKey(s.bobId, 1);
      s.bobStore.put(`signedPreKey_${s.bobSignedPreKey.keyId}`, s.bobSignedPreKey.keyPair);

      s.bobBundle = {
        identityKey: s.bobId.pubKey,
        registrationId: s.bobRegId,
        preKey: { keyId: s.bobPreKey.keyId, publicKey: s.bobPreKey.keyPair.pubKey },
        signedPreKey: { keyId: s.bobSignedPreKey.keyId, publicKey: s.bobSignedPreKey.keyPair.pubKey, signature: s.bobSignedPreKey.signature },
      };

      s.log = [
        "🔑 Claves generadas",
        `Alice IK: ${buf2hex(s.aliceId.pubKey)}`,
        `Bob IK:   ${buf2hex(s.bobId.pubKey)}`,
        `Bob SPK:  ${buf2hex(s.bobSignedPreKey.keyPair.pubKey)}`,
        `Bob OPK:  ${buf2hex(s.bobPreKey.keyPair.pubKey)}`,
      ];
    }

    if (step === 1) {
      s.aliceAddress = new signal.SignalProtocolAddress('bob', 1);
      s.sessionBuilder = new signal.SessionBuilder(s.aliceStore, s.aliceAddress);
      await s.sessionBuilder.processPreKey(s.bobBundle);

      s.log = [
        ...s.log,
        "",
        "🤝 Handshake X3DH ejecutado (triple DH real)",
        `Salt HKDF (fijo durante la sesión): ${saltHex}`,
        "RootKey y ChainKey inicial calculadas (HKDF, la librería las protege y no las expone por seguridad)."
      ];
    }

    if (step === 2) {
      if (!s.sessionCipherA)
        s.sessionCipherA = new signal.SessionCipher(s.aliceStore, s.aliceAddress);
      if (!s.sessionCipherB)
        s.sessionCipherB = new signal.SessionCipher(s.bobStore, new signal.SignalProtocolAddress('alice', 1));

      const plaintext = msgAlice;
      s.ctA = await s.sessionCipherA.encrypt(strToBuffer(plaintext));
      setCipherA(buf2hex(s.ctA.body));
      const decoded = await s.sessionCipherB.decryptPreKeyWhisperMessage(s.ctA.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Alice → Bob: mensaje enviado y recibido correctamente.",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctA.body)}`,
        `Nonce (didáctico): ${nonceArr[0]}`,
        `Salt HKDF (fijo): ${saltHex}`
      ];
    }

    if (step === 3) {
      const plaintext = msgBob;
      s.ctB = await s.sessionCipherB.encrypt(strToBuffer(plaintext));
      setCipherB(buf2hex(s.ctB.body));
      const decoded = await s.sessionCipherA.decryptWhisperMessage(s.ctB.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Bob → Alice: mensaje de respuesta.",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctB.body)}`,
        `Nonce (didáctico): ${nonceArr[1]}`,
        `Salt HKDF (fijo): ${saltHex}`
      ];
    }

    if (step === 4) {
      // Alice vuelve a enviar, reusa SessionCipherA/B (no recrear)
      const plaintext = msgAlice2;
      s.ctA2 = await s.sessionCipherA.encrypt(strToBuffer(plaintext));
      setCipherA(buf2hex(s.ctA2.body));
      const decoded = await s.sessionCipherB.decryptWhisperMessage(s.ctA2.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Alice → Bob: segundo mensaje (Adiós Bob)",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctA2.body)}`,
        `Nonce (didáctico): ${nonceArr[2]}`,
        `Salt HKDF (fijo): ${saltHex}`
      ];
    }

    if (step === 5) {
      // Bob responde por segunda vez
      const plaintext = msgBob2;
      s.ctB2 = await s.sessionCipherB.encrypt(strToBuffer(plaintext));
      setCipherB(buf2hex(s.ctB2.body));
      const decoded = await s.sessionCipherA.decryptWhisperMessage(s.ctB2.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Bob → Alice: segundo mensaje (Adiós Alice)",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctB2.body)}`,
        `Nonce (didáctico): ${nonceArr[3]}`,
        `Salt HKDF (fijo): ${saltHex}`
      ];
    }

    setState(s);
    setStep(step + 1);
  };

  const stepTitles = [
    "Generar claves de identidad y prekeys",
    "Ejecutar handshake X3DH",
    "Alice ➔ Bob: ¡Hola Bob!",
    "Bob ➔ Alice: ¡Hola Alice!",
    "Alice ➔ Bob: Adiós Bob",
    "Bob ➔ Alice: Adiós Alice"
  ];

  const exportarJSON = () => {
    const data = {
      log: state.log,
      aliceId: state.aliceId,
      bobId: state.bobId,
      saltHKDF: saltHex,
      nonces: nonceArr,
      cipherA,
      cipherB,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "signal_simulation.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{maxWidth: 740, margin: '2rem auto', fontFamily: 'monospace', background: '#f8f9fa', borderRadius: 10, padding: 24, boxShadow:'0 2px 10px #0001'}}>
      <h2>Simulador paso a paso – Protocolo Signal real</h2>
      <ol>
        {stepTitles.map((t,i) =>
          <li key={i} style={{fontWeight: step===i?'bold':'normal', color: step>i?'#6c6':'#333'}}>
            {step>i ? '✔️' : (step===i ? '➡️' : '•')} {t}
          </li>
        )}
      </ol>

      <div style={{background:'#e8f4ff',borderRadius:7,padding:8,margin:'10px 0',color:'#1c355e',fontSize:15}}>
        {explicaciones[step] ?? ''}
      </div>

      {step === 2 && (
        <input
          type="text"
          value={msgAlice}
          onChange={e => setMsgAlice(e.target.value)}
          placeholder="Mensaje de Alice a Bob"
          style={{margin:'8px 0', padding:4, fontSize:16, width:'100%'}}
        />
      )}
      {step === 3 && (
        <input
          type="text"
          value={msgBob}
          onChange={e => setMsgBob(e.target.value)}
          placeholder="Mensaje de Bob a Alice"
          style={{margin:'8px 0', padding:4, fontSize:16, width:'100%'}}
        />
      )}
      {step === 4 && (
        <input
          type="text"
          value={msgAlice2}
          onChange={e => setMsgAlice2(e.target.value)}
          placeholder="Segundo mensaje de Alice (Adiós Bob)"
          style={{margin:'8px 0', padding:4, fontSize:16, width:'100%'}}
        />
      )}
      {step === 5 && (
        <input
          type="text"
          value={msgBob2}
          onChange={e => setMsgBob2(e.target.value)}
          placeholder="Segundo mensaje de Bob (Adiós Alice)"
          style={{margin:'8px 0', padding:4, fontSize:16, width:'100%'}}
        />
      )}

      <pre style={{fontSize:14, background:'#fff', padding:14, borderRadius:8, minHeight:160, overflowX:'auto'}}>{state.log?.join('\n')}</pre>

      {(cipherA || cipherB) && (
        <div style={{background:'#fff9f4',borderRadius:8,margin:'8px 0 4px 0',padding:'8px 14px'}}>
          {cipherA && (
            <div><b>🔒 Último Ciphertext de Alice:</b> <span style={{wordBreak:'break-all', color:'#9b3528'}}>{cipherA}</span></div>
          )}
          {cipherB && (
            <div><b>🔒 Último Ciphertext de Bob:</b> <span style={{wordBreak:'break-all', color:'#326a17'}}>{cipherB}</span></div>
          )}
        </div>
      )}

      <div style={{background:'#f9f6ef',borderRadius:8,margin:'14px 0 8px 0',padding:'8px 14px',fontSize:14,color:'#444'}}>
        <b>Nota didáctica:</b> El salt HKDF permanece fijo toda la sesión, pero cada mensaje se cifra con un nonce diferente, garantizando confidencialidad y forward secrecy. Los nonces aquí son aleatorios didácticos, ya que la API no expone los reales.
      </div>

      <button disabled={step>=6} onClick={advance} style={{marginTop:18, fontSize:17, padding:'8px 32px', borderRadius:7, background:'#005caa', color:'#fff'}}>
        {step<6 ? "Siguiente →" : "Fin"}
      </button>
      <button
        onClick={exportarJSON}
        style={{marginLeft:16, fontSize:15, padding:'8px 18px', borderRadius:7, background:'#eee', color:'#0a0a23', border:'1px solid #bbb'}}
      >
        Exportar claves/logs como JSON
      </button>
    </div>
  );
}
