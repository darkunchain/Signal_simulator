import React, { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";
import {
  KeyRound as KeyIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  MailOpen as MailOpenIcon,
} from "lucide-react";
import "reactflow/dist/style.css";
import { AliceNode, BobNode, ServerNode } from './CustomNodes';
import { KeyEdge, MessageEdge, Key3Edge } from './AnimatedSVGEdge';
import { PasoInDoc, Paso0Doc, Paso1Doc, Paso2Doc, Paso3Doc} from './Documentacion';




const nodeTypes = {
  alice: AliceNode,
  bob: BobNode,
  server: ServerNode,
};

const edgeTypes = {
  animatedKey: KeyEdge,
  animatedMessage: MessageEdge,
  animatedKey3: Key3Edge,

};


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

const initialKeys: Record<string, string> = {
  IK_A_priv: randomHex(32),
  IK_A_pub: randomHex(32),
  IK_B_priv: randomHex(32),
  IK_B_pub: randomHex(32),
  SPK_A_priv: randomHex(32),
  SPK_A_pub: randomHex(32),
  SPK_B_priv: randomHex(32),
  SPK_B_pub: randomHex(32),
};

// ------------------------------------
// Definición de pasos
// ------------------------------------
const steps: StepSpec[] = [
  /** Paso Inicial Se quiere enviar un mensaje */
  {
    description:
      "📌 Paso Inicial: Registro de llaves publicas y privadas de verificacion de identidad",
    documentation: <PasoInDoc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 150 },
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
        position: { x: 420, y: 150 },
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
        position: { x: 210, y: 0 },
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
        data: { dur: '3.2s', repeatCount:1, scale:0.3, fill: "#17e8b6",}
      },
      {
        id: "b-to-s",
        source: "bob",
        target: "server",
        type: "animatedKey3",
        data: { dur: '3.2s', repeatCount:1, scale:0.3, fill: "#17c5e8",}
      },
    ],
    makeKeys: (prev) => ({
      ...prev,
    }),
  },
  /** Paso 0: tras X3DH */
  {
    description:
      "📌 Paso 0: Handshake X3DH completo → ambas partes tienen RK₀, CKₛ₀ y CKᵣ₀.",
    documentation: <Paso0Doc />,
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 150 },
        type: "alice",
        data: {
          label: "Alice",
          tooltipContent: (
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>🔒 Cifrado activo</li>
              <li>💬 Puede enviar mensajes</li>
              <li>🌐 Estado: Conectada</li>
            </ul>
          )
        },
      },
      {
        id: "bob",
        position: { x: 420, y: 150 },
        data: { label: "Bob" },
        type: "bob",
      },
      {
        id: "server",
        position: { x: 210, y: 0 },
        data: { label: "WhatsApp Server" },
        tooltip: 'Este es el server',
        type: "server",
      },
    ],
    makeEdges: () => [
      {
        id: "a-to-b-0",
        source: "alice",
        target: "bob",
        type: "animatedKey",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
      {
        id: "a-to-server-0",
        source: "alice",
        target: "server",
        type: "animatedMessage",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
    ],
    makeKeys: (prev) => ({
      ...prev,
      RK0: hkdf(prev.IK_A + prev.SPK_B + prev.IK_B, "RK0"),
      CKs0: hkdf(prev.IK_A, "CKs0"),
      CKr0: hkdf(prev.IK_B, "CKr0"),
    }),
  },
  /** Paso 1: mensaje se crea y cifra (sobre sin cifrar en Alice) */
  {
    description:
      "✉️ Paso 1: Alice deriva MK₁ y CKₛ₁, cifra el mensaje (sobre 🔒 aún junto a Alice).",
    documentation: <Paso1Doc />,
    makeNodes: (prev) => {
      /** añadimos node del sobre */
      const env: Node = {
        id: "env1",
        position: { x: 60, y: 50 },
        data: { label: <MailIcon /> },
        draggable: false,
        type: "default",
      };
      return [...prev, env];
    },
    makeEdges: () => [
      {
        id: "a-to-b-1",
        source: "env1",
        target: "env1",
        type: "animatedKey",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
      {
        id: "a-to-server-1",
        source: "alice",
        target: "server",
        type: "animatedMessage",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
    ],
    makeKeys: (prev) => {
      const MK1 = hkdf(prev.CKs0, "MK1");
      const CKs1 = hkdf(prev.CKs0, "CKs1");
      return { ...prev, MK1, CKs1 };
    },
  },
  /** Paso 2: sobre cifrado en tránsito */
  {
    description:
      "🚚 Paso 2: El mensaje cifrado viaja — sobre se muestra con candado en tránsito.",
    documentation: <Paso2Doc />,
    makeNodes: (prev) =>
      prev.map((n) =>
        n.id === "env1"
          ? {
              ...n,
              position: { x: 210, y: 50 },
              data: { label: <LockIcon /> },
            }
          : n
      ),
      makeEdges: () => [
      {
        id: "a-to-b-2",
        source: "env1",
        target: "env1",
        type: "animatedKey",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
    ],
    makeKeys: (prev) => prev,
  },
  /** Paso 3: sobre llega a Bob y se descifra */
  {
    description:
      "📬 Paso 3: Bob descifra con MK₁ y avanza CKᵣ — el sobre abierto llega a Bob.",
    documentation: <Paso3Doc />,
    makeNodes: (prev) =>
      prev.map((n) =>
        n.id === "env1"
          ? {
              ...n,
              position: { x: 420, y: 50 },
              data: { label: <MailOpenIcon /> },
            }
          : n
      ),
      makeEdges: () => [
      {
        id: "a-to-b-3",
        source: "env1",
        target: "env1",
        type: "animatedKey",
        data: { dur: '1.2s', repeatCount:3, scale:0.3}
      },
    ],
    makeKeys: (prev) => ({ ...prev, CKr1: hkdf(prev.CKr0, "CKr1") }),
  },
];

// ------------------------------------
// Componente principal
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

  const keyList = useMemo(
    () =>
      Object.entries(keys).map(([k, v]) => (
        <li key={k} className="flex gap-1 items-start text-xs break-all">
          <KeyIcon className="w-3 h-3 mt-0.5" />
          <span className="font-medium">{k}:</span>
          <code>{v}</code>
        </li>
      )),
    [keys]
  );

  return (
    <div className="h-screen p-4 grid grid-cols-3 gap-4 text-sm">
      {/* Flow */}
      <div
        className="col-span-2 relative border rounded-2xl shadow overflow-hidden"
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
        <button
          onClick={next}
          disabled={stepIdx >= steps.length - 1}
          className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Siguiente paso
        </button>
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
            <p className="mb-4 font-medium leading-relaxed whitespace-pre-wrap">
              {steps[stepIdx].description}
            </p>
            <ul className="space-y-1 list-none pb-12">{keyList}</ul>
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
