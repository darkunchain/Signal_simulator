import { useState } from 'react';
import FlowSimulator from './components/FlowSimulator';
import './styles.css';

export default function App() {
  const [running, setRunning] = useState(false);

  return (
    <div className="container">
      <h1>Signal Protocol Visual Simulator</h1>
      <button onClick={() => setRunning(true)}>Iniciar</button>
      {running && <FlowSimulator />}
    </div>
  );
}