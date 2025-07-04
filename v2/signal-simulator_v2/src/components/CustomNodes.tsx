import React from "react";
import { NodeProps } from "reactflow";
import { Tooltip } from 'react-tooltip';
import alicePng from '../assets/images/alice.png';
import bobPng from '../assets/images/bob.png';
import serverPng from '../assets/images/server.png';


// Nodo alice
export const AliceNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <img src={alicePng} alt="Alice" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" render={() => data.tooltipContent}/>
  </div>
);

// Nodo Bob
export const BobNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <img src={bobPng} alt="Bob" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info de Bob'} render={() => data.tooltipContent}/>
  </div>
);

// Nodo Server
export const ServerNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <img src={serverPng} alt="Server" width={40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
  </div>
);