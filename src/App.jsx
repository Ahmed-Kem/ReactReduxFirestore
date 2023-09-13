import "./App.css";
import { useCounterStore } from "./assets/utils/store/counter.store";

function App() {
  const count = useCounterStore((state) => state.count);

  return (
    <div>
      <h1>First Zustand test</h1>
      <span>{count}</span> <br />
      <button onClick={useCounterStore((state) => state.inc)}>Increase</button>
      <button onClick={useCounterStore((state) => state.dec)}>Decrease</button>
      <button onClick={useCounterStore((state) => state.reset)}>Reset</button>
    </div>
  );
}

export default App;
