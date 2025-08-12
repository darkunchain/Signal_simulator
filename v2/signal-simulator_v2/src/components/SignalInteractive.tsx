import React, { useMemo, useState } from "react";
import ReactFlow, {Background, Controls, Edge, Node, Position} from "reactflow";
import {KeyRound as KeyIcon} from "lucide-react";
import "reactflow/dist/style.css";
import { AliceNode, BobNode, ServerNode, HKDFNode, ECDHNode, X3DHNode, vacioNode } from './CustomNodes';
import { KeyEdge, MessageEdge, Key3Edge, BaulEdge, HolaBobEdge } from './AnimatedSVGEdge';
import { PasoInDoc, Paso1Doc, Paso2Doc, Paso3Doc, Paso4Doc} from './Documentacion';
import '../index.css';
import nacl from 'tweetnacl';                   // npm i tweetnacl
import { encodeBase64 } from 'tweetnacl-util';  // npm i tweetnacl-util
import {sha256} from 'js-sha256';



const nodeTypes = {
  alice: AliceNode,
  bob: BobNode,
  server: ServerNode,
  HKDF: HKDFNode,
  ECDH: ECDHNode,
  X3DH: X3DHNode,
  vacio: vacioNode,
};

const edgeTypes = {
  animatedKey: KeyEdge,
  animatedMessage: MessageEdge,
  animatedKey3: Key3Edge,
  animatedBaul: BaulEdge,
  animatedBob: HolaBobEdge
};




function hexToBytes(hex: string) {
  if (hex.length % 2 !== 0) throw new Error("Hex string must have even length");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

function hkdfSyncDemo(keyHex: string, info: string): string {
  return sha256(keyHex + info);
}


/**
 * 🚨 IMPORTANTE
 */

/** Hex aleatorio */
const randomHex = (bytes: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/** Simulación HKDF (visual) */
const hkdf = (input: string, label: string) =>
  `${label}-${input.slice(0, 8)}${randomHex(4)}`;

// ------------------------------------
// Tipado y pasos
// ------------------------------------
interface StepSpec {
  description: string;
  documentation: React.ReactNode;
  makeNodes: (prev: Node[]) => Node[];
  makeEdges: (prev: Edge[]) => Edge[];
  makeKeys: (prev: Record<string, string>) => Record<string, string>;
}

/** Generar clave en formato PEM */
const randomPEMKey = (type: "PRIVATE" | "PUBLIC") => {
  const bytes = crypto.getRandomValues(new Uint8Array(20)); // 256 bytes = 2048 bits aprox
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(bytes)));
  return `\n-----BEGIN ${type} KEY-----\n${base64}\n-----END ${type} KEY-----`;
};
  


const initialKeys: Record<string, string> = {
  IK_A_priv: randomPEMKey("PRIVATE"),  
  IK_A_pub: randomPEMKey("PUBLIC"),
  IK_B_priv: randomPEMKey("PRIVATE"),
  IK_B_pub: randomPEMKey("PUBLIC"),
  SPK_A_priv: randomHex(32),
  SPK_A_pub: randomHex(32),
  SPK_B_priv: randomHex(32),
  SPK_B_pub: randomHex(32),
};

// ------------------------------------
// Definición de pasos
// ------------------------------------
const steps: StepSpec[] = [

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              /** Paso Inicial registro de Llaves publicas y privadas */
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  {
    description:
      "📌 Fase Inicial: Registro de llaves publicas y privadas de verificacion de identidad",
    documentation: <PasoInDoc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 250 },
        type: "alice",
        data: {
          label: "Alice",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key de Alice IK_A_priv
                <br></br>
                <span style={{ color: "tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey de Alice SPK_A_priv
            </ul>
          )
        },
      },
      {
        id: "bob",
        position: { x: 420, y: 250 },
        type: "bob",
        data: {
          label: "Bob",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key de Bob IK_B_priv
                <br></br>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey de Bob SPK_B_priv
            </ul>
          )
        },
      },
      {
        id: "server",
        position: { x: 210, y: 100 },
        type: "server",
        data: {
          label: "WhatsApp Server",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key de Alice IK_A_pub
                <br></br>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey de Alice SPK_A_pub
                <br></br>
                <span style={{ color: "yellow" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key de Bob IK_B_pub
                <br></br>
                <span style={{ color: "yellow" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey de Bob SPK_B_pub
            </ul>
          )
        },
      },
    ],
    makeEdges: () => [
      {
        id: "a-to-s",
        source: "alice",
        target: "server",
        type: "animatedKey3",
        data: { dur: '3.2s', repeatCount:1, scale:0.3, fill: "#17e8b6", vis:3.2}
      },
      {
        id: "b-to-s",
        source: "bob",
        target: "server",
        type: "animatedKey3",
        data: { dur: '3.2s', repeatCount:1, scale:0.3, fill: "#17c5e8", vis:3.2}
      },
    ],
    makeKeys: (prev) => ({
      ...prev,
    }),
  },
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              /** Paso 1 Alice quiere enviar el primer mensaje */
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  {
    description:
      "📌 Fase 1: Alice desea enviar el primer mensaje.",
    documentation: <Paso1Doc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 250 },
        type: "alice",
        data: {
          label: "Alice",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key publica de Bob IK_B
                <br></br>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey publica de Bob SPK_B
                <br></br>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                OneTime PreKey publica de Bob OPK_B
                <br /><br />
                <span style={{ color: "tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key publica de Alice IK_A
                <br></br>
                <span style={{ color: "tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Llave Efimera de Alice EK_A
                <br></br>
            </ul>
          )
        },
      },
      {
        id: "X3DH",
        position: { x: 150, y: 250 },
        type: "X3DH",
        data: {
          label: "",
          target: Position.Left,
          source: Position.Right,
          width: 150,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <strong>DH1 = DH(IK_A, SPK_B)</strong><br />
                <em>(Identity Key de Alice + Signed PreKey de Bob)</em>
                <br></br>
                <strong>DH2 = DH(EK_A, IK_B)</strong><br />
                <em>(Clave efímera de Alice + Identity Key de Bob)</em>
                <br></br>
                <strong>DH3 = DH(EK_A, SPK_B)</strong><br />
                <em>(Clave efímera de Alice + Signed PreKey de Bob)</em>
                <br></br>
                <strong>DH4 = DH(EK_A, OPK_B)</strong><br />
                <em>(si OPK_B existe)</em>
                <br></br>
            </ul>
          )
        },
      },
      {
        id: "server",
        position: { x: 210, y: 100 },
        type: "server",
        data: {
          label: "WhatsApp Server",
          target: Position.Left,
          source: Position.Left,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
      {
        id: "HKDF",
        position: { x: 350, y: 250 },
        type: "HKDF",
        data: {
          label: "",
          target: Position.Left,
          source: Position.Right,
          width: 150,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                Concatena los resultados <strong>(DH1 || DH2 || DH3 || DH4)</strong> y aplica un KDF <em>(función de derivación de claves, como HKDF).</em><br />
                <br></br>
                <span style={{ color: "Tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                <strong>Root Key:</strong> Clave maestra para la sesión.
                <br></br>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                <strong>Chain Key:</strong> Clave inicial para derivar Message Keys (usadas por mensaje)
            </ul>
          )
        },
      },
      {
        id: "vacio",
        position: { x: 510, y: 270 },
        type: "vacio",
        data: {
          label: "",
          target: Position.Left,
          source: Position.Left,
          width: 20,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
    ],
    makeEdges: () => [
      {
        id: "server-to-a",
        source: "server",
        target: "alice",
        type: "animatedKey3",
        data: { dur: '3s', repeatCount:1, scale:0.3, fill: "#5b9918", vis:3}
      },
      {
        id: "a-to-X3DH",
        source: "alice",
        target: "X3DH",
        type: "animatedKey3",
        data: { dur: '3s', repeatCount:1, scale:0.3, fill: "#9334eb",delay: 3.3, vis:6.3}
      },
      {
        id: "a-to-X3DH1",
        source: "alice",
        target: "X3DH",
        type: "animatedKey3",
        data: { dur: '3s', repeatCount:1, scale:0.3, fill: "#5b9918",delay: 3.6, vis:6.6}
      },
      {
        id: "X3DH-to-HKDF",
        source: "X3DH",
        target: "HKDF",
        type: "animatedKey",
        data: { dur: '2s', repeatCount:1, scale:0.4, fill: "#eb5334",delay: 7, vis:9}
      },
      {
        id: "X3DH-to-HKDF1",
        source: "X3DH",
        target: "HKDF",
        type: "animatedKey",
        data: { dur: '2s', repeatCount:1, scale:0.4, fill: "#a6540c",delay: 7.3, vis:9.3}
      },
      {
        id: "HKDF-to-vacio",
        source: "HKDF",
        target: "vacio",
        type: "animatedKey",
        data: { dur: '4s', repeatCount:1, scale:0.5, fill: "#a19c12",delay: 9.5, vis:13.5}
      },
    ],
    makeKeys: (prev) => {      
      return {
      ...prev,      
      RK0: hkdfSyncDemo(prev.IK_A_priv + prev.SPK_B_pub + prev.IK_B_pub, "RK0"),
      CKs0: hkdfSyncDemo(prev.IK_A_priv, "CKs0"),
      CKr0: hkdfSyncDemo(prev.IK_B_pub, "CKr0"),
    };
  },
},

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              /** Paso 2 Llaves Root Key y Chain Key */
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  {
    description:
      "✉️ Doc: Claves RootKey y ChainKey 🔑.",
    documentation: <Paso2Doc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 250 },
        type: "alice",
        data: {
          label: "Alice",
          source: Position.Right,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                RootKey (RK0)
                <br></br>
                <span style={{ color: "purple" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                ChainKey (CK0)
                <br></br>
            </ul>
          )
        },
      },
      {
        id: "server",
        position: { x: 210, y: 100 },
        type: "server",
        data: {
          label: "WhatsApp Server",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
      {
        id: "bob",
        position: { x: 420, y: 250 },
        type: "bob",
        data: {
          label: "Bob",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
      {
        id: "vacio",
        position: { x: 40, y: 270 },
        type: "vacio",
        data: {
          label: "",
          width: 20,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
    ],
    makeEdges: () => [
      {
        id: "a-to-vacio",
        source: "alice",
        target: "vacio",
        type: "animatedKey",
        data: { dur: '10s', repeatCount:1, scale:0.4, fill: "#560e75", vis:10}
      },
      {
        id: "a-to-vacio",
        source: "alice",
        target: "vacio",
        type: "animatedKey",
        data: { dur: '10s', repeatCount:1, scale:0.4, fill: "#18660eff",delay: 1, vis:11}
      },
    ],
    makeKeys: (prev) => {
      return { ...prev
      };
    },
  },
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              /** Paso 3 Cifrado del mensaje y envio a Bob */
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  {
    description:
      "✉️ Fase 2: Alice cifra el mensaje 🔒y lo envia a Bob.",
    documentation: <Paso3Doc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 250 },
        type: "alice",
        data: {
          label: "Alice",
          target: Position.Top,
          source: Position.Top,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Root Key (RK<sub>0</sub>)
                <br></br>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Chain Key (CK<sub>0</sub>)
                <br></br>
                <span style={{ color: "green" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Mensaje en texto plano (Hola BoB)
            </ul>
          )
        },
      },
      {
        id: "server",
        position: { x: 210, y: 100 },
        type: "server",
        data: {
          label: "WhatsApp Server",
          target: Position.Left,
          source: Position.Right,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
              <strong>Estructura del Mensaje (encriptado):</strong>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">header</span> ─────────────────────────────────────────────────────────┐ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp;DH_pub_A (<span className="hljs-number">32</span>Bytes) │ pn (32Bytes) │ n (32Bytes) │ &hellip; AD (opcional) │ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└───────────────────────────────────────────────────────────────────┘</code></div> 
              <div className="overflow-y-auto p-4" dir="ltr">&nbsp;</div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">body</span> ──────────────────────────────────────────────┐</code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp; &nbsp; ciphertext (AES-CBC, padded) │ tag (<span className="hljs-number">32</span>Bytes)&nbsp; &nbsp; &nbsp; │ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└──────────────────────────────────────────────────────┘ </code></div>
            </ul>
          )
        },
      },
      {
        id: "bob",
        position: { x: 420, y: 250 },
        type: "bob",
        data: {
          label: "Bob",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
              <strong>Estructura del Mensaje (encriptado):</strong>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">header</span> ─────────────────────────────────────────────────────────┐ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp;DH_pub_A (<span className="hljs-number">32</span>Bytes) │ pn (32Bytes) │ n (32Bytes) │ &hellip; AD (opcional) │ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└───────────────────────────────────────────────────────────────────┘</code></div> 
              <div className="overflow-y-auto p-4" dir="ltr">&nbsp;</div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">body</span> ──────────────────────────────────────────────┐</code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp; &nbsp; ciphertext (AES-CBC, padded) │ tag (<span className="hljs-number">32</span>Bytes)&nbsp; &nbsp; &nbsp; │ </code></div>
              <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└──────────────────────────────────────────────────────┘ </code></div>
            </ul>
          )
        },
      },
      {
        id: "HKDF",
        position: { x: -250, y: 250 },
        type: "HKDF",
        data: {
          label: "",
          target: Position.Right,
          source: Position.Right,
          width: 150,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <h3><strong>Double Ratchet:</strong></h3>
                <strong>Ratchet Root:</strong>  DH = ECDH(IK<sub>Alice_priv</sub>, IK<sub>Bob_pub</sub>)
                <br></br>Genera Nueva Root Key y nueva Chain Key (RK<sub>1</sub>, CK<sub>1</sub>)<br></br>
                <br></br>
                <strong>Ratchet Chain:</strong> deriva el CK<sub>0</sub> para obtener MK<sub>0</sub>
                <br></br>MK<sub>0</sub>[K<sub>enc</sub>, K<sub>mac</sub>(IV/nonce)]
            </ul>
          )
        },
      },
      {
        id: "vacio",
        position: { x: -20, y: 280 },
        type: "vacio",
        data: {
          label: "",
          target: Position.Right,
          source: Position.Right,
          width: 20,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
    ],
    makeEdges: () => [
      {
        id: "a-to-HKDF",
        source: "alice",
        target: "HKDF",
        type: "animatedKey",
        data: { dur: '3s', repeatCount:1, scale:0.4, fill: "#560e75", vis:3}
      },
      {
        id: "a-to-HKDF1",
        source: "alice",
        target: "HKDF",
        type: "animatedMessage",
        data: { dur: '3s', repeatCount:1, scale:1, fill: "#560e75",delay: 0.5, vis:3.5}
      },
      {
        id: "HKDF-to-vacio",
        source: "HKDF",
        target: "vacio",
        type: "animatedBaul",
        data: { dur: '3s', repeatCount:1, scale:0.2, fill: "#9334eb",delay: 3.5, vis:6.5}
      },
      {
        id: "a-to-Server",
        source: "alice",
        target: "server",
        type: "animatedBaul",
        data: { dur: '4s', repeatCount:1, scale:0.2, fill: "#5b9918",delay: 6.5, vis:10.5}
      },
      {
        id: "server-to-B",
        source: "server",
        target: "bob",
        type: "animatedBaul",
        data: { dur: '4s', repeatCount:1, scale:0.2, fill: "#eb5334",delay: 10.5, vis:14.5}
      },
    ],
    makeKeys: (prev) => {
      const MK1 = hkdfSyncDemo(prev.CKs0, "MK1"); // string hex de 64 chars
      const CKs1 = hkdfSyncDemo(prev.CKs0, "CKs1");
      const mk1Uint8 = hexToBytes(MK1);    // ← Uint8Array de 32 bytes
      console.log("Longitud de la clave:", mk1Uint8.length);
      const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
      const plaintext = new TextEncoder().encode('Hola Bob');
      const cipherTag = nacl.secretbox(plaintext, nonce, mk1Uint8);
      const wire = new Uint8Array(nonce.length + cipherTag.length);
      wire.set(nonce, 0);
      wire.set(cipherTag, nonce.length);
      const textHex  = Array.from(wire).map(b => b.toString(16).padStart(2, '0')).join('');
      const textB64  = encodeBase64(wire);
      return { ...prev, MK1, CKs1,
        nonce: Array.from(nonce).map(b => b.toString(16).padStart(2, '0')).join(''),
        plaintext: " Hola, Bob",
        textHex, textB64
      };
    },
  },
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              /** Paso 4 Bob descifra con MK₁ y avanza CKᵣ */
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  {
    description:
      "🚚 Fase 3: Bob descifra el mensaje",
    documentation: <Paso4Doc />,
    makeNodes: () => [
      {
        id: "bob",
        position: { x: 420, y: 250 },
        type: "bob",
        data: {
          label: "Bob",
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Identity key de Bob IK_B_priv
                <br></br>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                Signed PreKey de Bob SPK_B_priv
            </ul>
          )
        },
      },
      {
        id: "HKDF",
        position: { x: -20, y: 250 },
        type: "HKDF",
        data: {
          label: "",
          target: Position.Right,
          source: Position.Left,
          width: 150,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                Concatena los resultados <strong>(DH1 || DH2 || DH3 || DH4)</strong> y aplica un KDF <em>(función de derivación de claves, como HKDF).</em><br />
                <br></br>
                <span style={{ color: "Tomato" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                <strong>Root Key:</strong> Clave maestra para la sesión.
                <br></br>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                <strong>Chain Key:</strong> Clave inicial para derivar Message Keys (usadas por mensaje)
            </ul>
          )
        },
      },
      {
        id: "X3DH",
        position: { x: 220, y: 250 },
        type: "X3DH",
        data: {
          label: "",
          target: Position.Right,
          source: Position.Left,
          width: 150,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
                <strong>DH1 = DH(IK_A, SPK_B)</strong><br />
                <em>(Identity Key de Alice + Signed PreKey de Bob)</em>
                <br></br>
                <strong>DH2 = DH(EK_A, IK_B)</strong><br />
                <em>(Clave efímera de Alice + Identity Key de Bob)</em>
                <br></br>
                <span style={{ color: "violet" }}>
                  <KeyIcon size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                </span>
                <strong>Chain Key:</strong> Clave inicial para derivar Message Keys (usadas por mensaje)
            </ul>
          )
        },
      },
      {
        id: "vacio",
        position: { x: -60, y: 270 },
        type: "vacio",
        data: {
          label: "",
          target: Position.Right,
          source: Position.Right,
          width: 20,
          tooltipContent: (
            <ul style={{ paddingLeft: 10, margin: 0 }}>
            </ul>
          )
        },
      },
    ],
      makeEdges: () => [
      {
        id: "b-to-X3DH",
        source: "bob",
        target: "X3DH",
        type: "animatedBaul",
        data: { dur: '2s', repeatCount:1, scale:0.2, fill: "#560e75", vis:2}
      },
      {
        id: "X3DH-to-HKDF",
        source: "X3DH",
        target: "HKDF",
        type: "animatedMessage",
        data: { dur: '2s', repeatCount:1, scale:1.5, fill: "#560e75",delay: 2, vis:4}
      },
      {
        id: "X3DH-to-HKDF1",
        source: "X3DH",
        target: "HKDF",
        type: "animatedKey",
        data: { dur: '2s', repeatCount:1, scale:0.6, fill: "#560e75",delay: 2, vis:4}
      },
      {
        id: "HKDF-to-vacio",
        source: "HKDF",
        target: "vacio",
        type: "animatedMessage",
        data: { dur: '3s', repeatCount:1, scale:1.8, fill: "#9334eb",delay: 4, vis:7}
      },
      {
        id: "HKDF-to-vacio",
        source: "HKDF",
        target: "vacio",
        type: "animatedBob",
        data: { dur: '3s', repeatCount:1, scale:5, fill: "#9334eb",delay: 7, vis:20}
      }      
    ],
    makeKeys: (prev) => prev,
  },
];

// ------------------------------------
// ------------------------------------
// ------------------------------------
       // Componente principal
// ------------------------------------
// ------------------------------------
// ------------------------------------

export default function SignalInteractive() {
  const [stepIdx, setStepIdx] = useState(0);
  const [nodes, setNodes] = useState<Node[]>(steps[0].makeNodes([]));
  const [edges, setEdges] = useState<Edge[]>(steps[0].makeEdges?.([]) || []);
  const [keys, setKeys] = useState<Record<string, string>>(
    steps[0].makeKeys(initialKeys)
  );

  const next = () => {
    if (stepIdx < steps.length - 1) {
      const n = stepIdx + 1;
      setStepIdx(n);
      setNodes((prev) => steps[n].makeNodes(prev));
      setKeys((prev) => steps[n].makeKeys(prev));
      setEdges((prev) => steps[n].makeEdges?.(prev) || []);
    }
  };

  const prev = () => {
    if (stepIdx > 0) {
      const n = stepIdx - 1;
      setStepIdx(n);
      setNodes((prev) => steps[n].makeNodes(prev));
      setKeys((prev) => steps[n].makeKeys(prev));
      setEdges((prev) => steps[n].makeEdges?.(prev) || []);
    }
  };

  const keyList = useMemo(
    () =>
      Object.entries(keys).map(([k, v]) => (
        <div key={k} className="flex gap-1 items-start text-xs break-all">
          <KeyIcon className="w-3 h-3 mt-0.5" />
          <span className="font-medium"><strong> {k}: </strong></span>          
          <code
            dangerouslySetInnerHTML={{
              __html: v.replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )),
    [keys]
  );

  return (
    <div className="h-screen p-4 grid grid-cols-3 gap-4 text-sm">
      {/* Flow */}
      <div
        className="col-span-4 relative border rounded-2xl shadow overflow-hidden"
        style={{ height: "40vh" /* garantiza altura explícita */ }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          style={{ width: "100%", height: "100%" }}
        >
          <Background />
          <Controls />
        </ReactFlow>


      </div>
      {/* Panel */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          padding: "16px",
          background: "#fff",
          margin: "16px 0",
          maxWidth: "100%",
          minHeight: "180px"
        }}>
          <div style={{ flex: 1 }} className="border rounded-2xl shadow p-4 overflow-y-auto">
            <h2 className="mb-4 font-medium leading-relaxed whitespace-pre-wrap">
              {steps[stepIdx].description}
            </h2>
            <p className="space-y-1 list-none pb-12">{keyList}</p>          

                    <div
                      style={{
                        position: "sticky",
                        bottom: 16,
                        left: 16,
                        display: "flex",
                        gap: 8
                      }}
                    >
                      <button
                        onClick={prev}
                        disabled={stepIdx === 0}
                        className="rounded disabled:opacity-40"
                      >
                        <a className="button">
                          <span>PAso Anterior</span>
                        </a>
                      </button>
                      <button
                        onClick={next}
                        disabled={stepIdx >= steps.length - 1}
                        className="rounded disabled:opacity-40"
                      >
                        <a className="button">
                          <span>Siguiente paso</span>
                        </a>
                      </button>
                    </div>
          </div>
          <div
            style={{ flex: 1,
            border: "2px solid orange",
            borderRadius: "8px", }}>
            {steps[stepIdx].documentation}
          </div>
      </div>
    </div>
  );
}
