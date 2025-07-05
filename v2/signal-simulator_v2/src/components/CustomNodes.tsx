import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Tooltip } from 'react-tooltip';
import alicePng from '../assets/images/alice.png';
import bobPng from '../assets/images/bob.png';
import serverPng from '../assets/images/server.png';


// Nodo alice
export const AliceNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={Position.Right} />
    <img src={alicePng} alt="Alice" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" render={() => data.tooltipContent}/>
    <Handle type="source" position={Position.Top} />
  </div>
);

// Nodo Bob
export const BobNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={Position.Left} />
    <img src={bobPng} alt="Bob" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info de Bob'} render={() => data.tooltipContent}/>
    <Handle type="source" position={Position.Top} />
  </div>
);

// Nodo Server
export const ServerNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={Position.Bottom} />
    <img src={serverPng} alt="Server" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
    <Handle type="source" position={Position.Bottom} />
  </div>
);