import { useState } from "react";
import BluetoothComponent from "../component/BluetoothComponent";
import Graph from "../component/Graph";
import Temperature from "../component/Temperature";

export default function PetProfileScreen() {
  const [status, setStatus] = useState<Boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<string>("");
  return (
    <div>
      <BluetoothComponent status={status} connectedDevice={connectedDevice} />
      <Temperature status={status} connectedDevice={connectedDevice} />
      <Graph status={status} connectedDevice={connectedDevice} />
    </div>
  );
}
