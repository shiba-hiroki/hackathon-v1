import { useState } from "react";
import "@/App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [count, setCount] = useState(0);
  const id = "fdgsdfgraegfa";
  const status = "stop";

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Input type="time"></Input>
      </div>
      <QRCodeCanvas value={`id=${id};status=${status}`} />
    </>
  );
}

export default App;
