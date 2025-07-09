import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Tooltip } from 'react-tooltip';
import alicePng from '../assets/images/alice.png';
import bobPng from '../assets/images/bob.png';
import serverPng from '../assets/images/server.png';
import ECDHPng from '../assets/images/ECDH.png';
import HKDFPng from '../assets/images/HKDF.png';
import X3DHPng from '../assets/images/X3DH.png';



// Nodo alice
export const AliceNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Right} />
    <img src={alicePng} alt="Alice" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Right} />
  </div>
);

// Nodo Bob
export const BobNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Left} />
    <img src={bobPng} alt="Bob" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info de Bob'} render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Left} />
  </div>
);

// Nodo Server
export const ServerNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Bottom} />
    <img src={serverPng} alt="Server" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Bottom} />
  </div>
);

// Nodo ECDH
export const ECDHNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Top} />
    <img src={ECDHPng} alt="ECDH" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Top} />
  </div>
);


// Nodo HKDF
export const HKDFNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Bottom} />
    <img src={HKDFPng} alt="HKDF" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Bottom} />
  </div>
);

// Nodo X3DH
export const X3DHNode: React.FC<NodeProps> = ({ data, id }) => (
  <div style={{ textAlign: "center" }}>
    <Handle type="target" position={data.target || Position.Bottom} />
    <img src={X3DHPng} alt="X3DH" width={data.width || 40} id={`tooltip-anchor-${id}`} style={{ cursor: 'pointer' }}/>
    <div>{data.label}</div>
    <Tooltip anchorSelect={`#tooltip-anchor-${id}`} place="top" content={data.tooltip || 'Info del servidor'} render={() => data.tooltipContent}/>
    <Handle type="source" position={data.source || Position.Bottom} />
  </div>
);