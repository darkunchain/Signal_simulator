import React, { useState } from 'react';
import * as signal from 'libsignal-protocol';

function buf2hex(buf: ArrayBuffer | Uint8Array) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Utilidad simple de store
function makeStore() {
  const obj: Record<string, unknown> = {};
  return {
    get: (k: string) => obj[k],
    put: (k: string, v: unknown) => { obj[k] = v; },
    remove: (k: string) => { delete obj[k]; },
  };
}

export default function SignalStepByStep() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<any>({ log: [] });

  // Pasos del protocolo y lógica de avance
  const advance = async () => {
    let s = { ...state };

    if (step === 0) {
      // 1. Generar claves de identidad y prekeys
      s.aliceStore = makeStore();
      s.bobStore = makeStore();

      s.aliceId = await signal.KeyHelper.generateIdentityKeyPair();
      s.bobId = await signal.KeyHelper.generateIdentityKeyPair();
      s.bobRegId = await signal.KeyHelper.generateRegistrationId();

      s.bobStore.put('identityKey', s.bobId);
      s.bobStore.put('registrationId', s.bobRegId);

      s.bobPreKey = await signal.KeyHelper.generatePreKey(1);
      s.bobSignedPreKey = await signal.KeyHelper.generateSignedPreKey(s.bobId, 1);

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
      // 2. Alice hace el handshake X3DH
      s.aliceAddress = new signal.SignalProtocolAddress('bob', 1);
      s.sessionBuilder = new signal.SessionBuilder(s.aliceStore, s.aliceAddress);
      await s.sessionBuilder.processPreKey(s.bobBundle);

      s.log = [
        ...s.log,
        "",
        "🤝 Handshake X3DH ejecutado (triple DH real)",
        "RootKey y ChainKey inicial calculadas (HKDF)",
      ];
    }

    if (step === 2) {
      // 3. Alice cifra mensaje, Bob descifra, avanza ratchet
      s.sessionCipherA = new signal.SessionCipher(s.aliceStore, s.aliceAddress);
      s.sessionCipherB = new signal.SessionCipher(s.bobStore, new signal.SignalProtocolAddress('alice', 1));
      const plaintext = "¡Hola Bob!";
      s.ctA = await s.sessionCipherA.encrypt(plaintext);
      const decoded = await s.sessionCipherB.decryptPreKeyWhisperMessage(s.ctA.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Alice → Bob: mensaje enviado y recibido correctamente.",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctA.body)}`,
        `Descifrado: ${new TextDecoder().decode(decoded)}`
      ];
    }

    if (step === 3) {
      // 4. Bob responde, avanza double ratchet
      const plaintext = "¡Hola Alice!";
      s.ctB = await s.sessionCipherB.encrypt(plaintext);
      const decoded = await s.sessionCipherA.decryptWhisperMessage(s.ctB.body, 'binary');
      s.log = [
        ...s.log,
        "",
        "🟢 Bob → Alice: mensaje de respuesta.",
        `Texto original: ${plaintext}`,
        `Ciphertext: ${buf2hex(s.ctB.body)}`,
        `Descifrado: ${new TextDecoder().decode(decoded)}`
      ];
    }

    setState(s);
    setStep(step + 1);
  };

  // Títulos de pasos
  const stepTitles = [
    "Generar claves de identidad y prekeys",
    "Ejecutar handshake X3DH",
    "Enviar mensaje de Alice a Bob (Double Ratchet inicia)",
    "Respuesta de Bob (avanza Double Ratchet)",
  ];

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
      <pre style={{fontSize:14, background:'#fff', padding:14, borderRadius:8, minHeight:160, overflowX:'auto'}}>{state.log?.join('\n')}</pre>
      <button disabled={step>=4} onClick={advance} style={{marginTop:18, fontSize:17, padding:'8px 32px', borderRadius:7, background:'#005caa', color:'#fff'}}>
        {step<4 ? "Siguiente →" : "Fin"}
      </button>
    </div>
  );
}
