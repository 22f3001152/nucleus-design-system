import { NucleusButton, defineCustomElements } from "nucleus-react";
import "./App.scss";

defineCustomElements();

function App() {
  return (
    <div className="App">
      <NucleusButton type="primary">Primary</NucleusButton>
      <NucleusButton type="secondary">Secondary</NucleusButton>
      <NucleusButton type="primary" rounded>
        Primary Rounded
      </NucleusButton>
    </div>
  );
}

export default App;
