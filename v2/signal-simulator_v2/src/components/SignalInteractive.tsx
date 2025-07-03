import React, { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";
import {
  Key as KeyIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  MailOpen as MailOpenIcon,
} from "lucide-react";
import "reactflow/dist/style.css";
import { AliceNode, BobNode } from './CustomNodes';

const nodeTypes = {
  alice: AliceNode,
  bob: BobNode,
};




/**
 * 🚨 IMPORTANTE
 * Asegúrate de tener en main.tsx / index.tsx algo como:
 *   import 'reactflow/dist/style.css';
 * Si lo importas aquí, igualmente funcionará, pero a veces Vite/CRA
 * optimiza CSS por componentes y puede omitir clases globales.
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
  makeNodes: (prev: Node[]) => Node[];
  makeKeys: (prev: Record<string, string>) => Record<string, string>;
}

const initialKeys: Record<string, string> = {
  IK_A: randomHex(32),
  IK_B: randomHex(32),
  SPK_B: randomHex(32),
};

// ------------------------------------
// Definición de pasos
// ------------------------------------
const steps: StepSpec[] = [
  /** Paso 0: tras X3DH */
  {
    description:
      "📌 Paso 0: Handshake X3DH completo → ambas partes tienen RK₀, CKₛ₀ y CKᵣ₀.",
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 50 },
        data: { label: "Alice" },
        type: "alice",
      },
      {
        id: "bob",
        position: { x: 420, y: 50 },
        data: { label: "Bob" },
        type: "bob",
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
      "✉️ Paso 1: Alice deriva MK₁ y CKₛ₁, cifra el mensaje (sobre 🔒 aún junto a Alice).",
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
    makeKeys: (prev) => {
      const MK1 = hkdf(prev.CKs0, "MK1");
      const CKs1 = hkdf(prev.CKs0, "CKs1");
      return { ...prev, MK1, CKs1 };
    },
  },
  /** Paso 2: sobre cifrado en tránsito */
  {
    description:
      "🚚 Paso 2: El mensaje cifrado viaja — sobre se muestra con candado en tránsito.",
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
    makeKeys: (prev) => prev,
  },
  /** Paso 3: sobre llega a Bob y se descifra */
  {
    description:
      "📬 Paso 3: Bob descifra con MK₁ y avanza CKᵣ — el sobre abierto llega a Bob.",
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
    makeKeys: (prev) => ({ ...prev, CKr1: hkdf(prev.CKr0, "CKr1") }),
  },
];

// ------------------------------------
// Componente principal
// ------------------------------------
export default function SignalInteractive() {
  const [stepIdx, setStepIdx] = useState(0);
  const [nodes, setNodes] = useState<Node[]>(steps[0].makeNodes([]));
  const [keys, setKeys] = useState<Record<string, string>>(
    steps[0].makeKeys(initialKeys)
  );

  const next = () => {
    if (stepIdx < steps.length - 1) {
      const n = stepIdx + 1;
      setStepIdx(n);
      setNodes((prev) => steps[n].makeNodes(prev));
      setKeys((prev) => steps[n].makeKeys(prev));
    }
  };

  // Memoizar edges evita el warning "nodeTypes/edgeTypes" de React Flow
  const edges: Edge[] = useMemo(() => {
    return nodes.some((n) => n.id === "env1")
      ? [
          {
            id: "edge-env1",
            source: "alice",
            target: "bob",
            animated: true,
          },
        ]
      : [];
  }, [nodes]);

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
      <div className="border rounded-2xl shadow p-4 overflow-y-auto">
        <p className="mb-4 font-medium leading-relaxed whitespace-pre-wrap">
          {steps[stepIdx].description}
        </p>
        <ul className="space-y-1 list-none pb-12">{keyList}</ul>
      </div>
    </div>
  );
}
