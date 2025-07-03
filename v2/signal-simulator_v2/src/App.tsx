import React from 'react';
import FlowSimulator from './components/FlowSimulator';
import SignalStepByStep from './components/SignalStepByStep';

function App() {
  return (
    <div>
      <h1>Signal Protocol Simulator</h1>
      <FlowSimulator />
      <SignalStepByStep />
    </div>
  );
}

export default App;