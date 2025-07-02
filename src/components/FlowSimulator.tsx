import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';

const randomHex = (bytes: number) => {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
};

const saltHex = randomHex(32);
const nonces = [randomHex(24), randomHex(24)];

const nodes: Node[] = [
  { id: 'alice', position: { x: 0, y: 100 }, data: { label: 'Alice (Device A)' }, type: 'input' },
  { id: 'server', position: { x: 260, y: 100 }, data: { label: 'Server' } },
  { id: 'bob', position: { x: 520, y: 100 }, data: { label: 'Bob (Device B)' }, type: 'output' },
];

const timeline: Edge[] = [
  { id: 'e1', source: 'alice', target: 'server', label: 'Publish pre-keys', animated: true },
  { id: 'e2', source: 'server', target: 'bob', label: 'Download pre-keys', animated: true },
  { id: 'e3', source: 'bob', target: 'alice', label: `X3DH → RootKey\nSalt: ${saltHex.slice(0,8)}…`, animated: true },
  { id: 'e4', source: 'alice', target: 'bob', label: `Msg #1\nNonce: ${nonces[0].slice(0,8)}…`, animated: true },
  { id: 'e5', source: 'bob', target: 'alice', label: `Msg #2\nNonce: ${nonces[1].slice(0,8)}…`, animated: true },
];

export default function FlowSimulator() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < timeline.length) {
      const t = setTimeout(() => {
        setEdges(prev => [...prev, timeline[step]]);
        setStep(step + 1);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div style={{ width: '100%', height: 520 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background variant="dots" gap={16} size={1} />
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
      <div style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', background:'#f9f9fb', padding:'0.75rem', borderRadius:'8px' }}>
        <div><strong>Salt (HKDF):</strong> {saltHex}</div>
        <div><strong>Nonce #1:</strong> {nonces[0]}</div>
        <div><strong>Nonce #2:</strong> {nonces[1]}</div>
      </div>
    </div>
  );
}