import React, { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import { Key as KeyIcon, Mail as MailIcon } from "lucide-react";
import "reactflow/dist/style.css";

/**
 * Utilidad: bytes aleatorios → hex
 * Se usa Array.from para evitar la necesidad de downlevelIteration.
 */
const randomHex = (bytes: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/**
 * Simulación burda de HKDF: no es criptográficamente correcta,
 * solo genera material distinto para ilustrar derivaciones.
 */
const hkdf = (input: string, label: string) =>
  `${label}-${input.slice(0, 8)}${randomHex(4)}`;

// ---------------------------
// Tipos y datos de simulación
// ---------------------------
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

const steps: StepSpec[] = [
  {
    description:
      "📌 Paso 0: Intercambio X3DH completado, Alice tiene la Root Key RK₀",
    makeNodes: () => [
      {
        id: "alice",
        position: { x: 0, y: 50 },
        data: { label: "Alice" },
        type: "input",
      },
      {
        id: "bob",
        position: { x: 420, y: 50 },
        data: { label: "Bob" },
        type: "output",
      },
    ],
    makeKeys: (prev) => ({
      ...prev,
      RK0: hkdf(prev.IK_A + prev.SPK_B + prev.IK_B, "RK0"),
      CKs0: hkdf(prev.IK_A, "CKs0"),
      CKr0: hkdf(prev.IK_B, "CKr0"),
    }),
  },
  {
    description: "✉️ Paso 1: Alice envía primer mensaje → genera MK₁ y CKₛ₁",
    makeNodes: (prevNodes) => [
      ...prevNodes,
      {
        id: "env1",
        position: { x: 160, y: 50 },
        data: { label: <MailIcon /> },
        draggable: false,
      },
      {
        id: "key1",
        position: { x: -20, y: 150 },
        data: { label: <KeyIcon /> },
        draggable: false,
      },
    ],
    makeKeys: (prev) => {
      const MK1 = hkdf(prev.CKs0, "MK1");
      const CKs1 = hkdf(prev.CKs0, "CKs1");
      return { ...prev, MK1, CKs1 };
    },
  },
  {
    description: "🔄 Paso 2: Alice envía segundo mensaje → MK₂, CKₛ₂",
    makeNodes: (prevNodes) => [
      ...prevNodes,
      {
        id: "env2",
        position: { x: 160, y: 100 },
        data: { label: <MailIcon /> },
        draggable: false,
      },
      {
        id: "key2",
        position: { x: -20, y: 200 },
        data: { label: <KeyIcon /> },
        draggable: false,
      },
    ],
    makeKeys: (prev) => {
      const MK2 = hkdf(prev.CKs1, "MK2");
      const CKs2 = hkdf(prev.CKs1, "CKs2");
      return { ...prev, MK2, CKs2 };
    },
  },
];

// ---------------------------
// Componente principal
// ---------------------------
export default function SignalInteractive() {
  const [stepIdx, setStepIdx] = useState(0);
  const [nodes, setNodes] = useState<Node[]>(steps[0].makeNodes([]));
  const [keys, setKeys] = useState<Record<string, string>>(
    steps[0].makeKeys(initialKeys)
  );

  const currentDescription = steps[stepIdx].description;

  const handleNext = () => {
    if (stepIdx < steps.length - 1) {
      const next = stepIdx + 1;
      setStepIdx(next);
      setNodes((prev) => steps[next].makeNodes(prev));
      setKeys((prev) => steps[next].makeKeys(prev));
    }
  };

  const edges: Edge[] = nodes
    .filter((n) => n.id.startsWith("env"))
    .map((n) => ({ id: `e-${n.id}`, source: "alice", target: "bob", animated: true }));

  const keyList = useMemo(
    () =>
      Object.entries(keys).map(([k, v]) => (
        <li key={k} className="flex gap-1 items-start text-xs break-all">
          <KeyIcon className="w-3 h-3 mt-0.5" />
          <span className="font-medium">{k}:</span>
          <code className="select-text">{v}</code>
        </li>
      )),
    [keys]
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-screen text-sm">
      {/* Zona de flujo */}
      <div className="col-span-2 border rounded-2xl shadow overflow-hidden relative">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
        <button
          onClick={handleNext}
          disabled={stepIdx >= steps.length - 1}
          className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Siguiente paso
        </button>
      </div>

      {/* Zona de explicación */}
      <div className="border rounded-2xl shadow p-4 overflow-y-auto">
        <p className="mb-4 font-medium">{currentDescription}</p>
        <ul className="space-y-1 list-none">{keyList}</ul>
      </div>
    </div>
  );
}
