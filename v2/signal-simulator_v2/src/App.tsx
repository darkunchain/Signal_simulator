import React from 'react';
//import FlowSimulator from './components/FlowSimulator';
import SignalStepByStep from './components/SignalStepByStep';
import SignalInteractive from './components/SignalInteractive';


function App() {
  return (
    <div>
      <h1>Signal Protocol Simulator</h1>
      <SignalInteractive />
      <SignalStepByStep />
    </div>
  );
}

export default App;