import React from "react";
import { NodeProps } from "reactflow";
import alicePng from '../assets/images/alice.png';
import bobPng from '../assets/images/bob.png';


// Nodo alice
export const AliceNode: React.FC<NodeProps> = ({ data }) => (
  <div style={{ textAlign: "center" }}>
    <img src={alicePng} alt="Alice" width={40} />
    <div>{data.label}</div>
  </div>
);

// Nodo Bob
export const BobNode: React.FC<NodeProps> = ({ data }) => (
  <div style={{ textAlign: "center" }}>
    <img src={bobPng} alt="Bob" width={40} />
    <div>{data.label}</div>
  </div>
);