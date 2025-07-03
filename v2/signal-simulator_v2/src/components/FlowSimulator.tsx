import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node, BackgroundVariant } from 'reactflow';
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
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}