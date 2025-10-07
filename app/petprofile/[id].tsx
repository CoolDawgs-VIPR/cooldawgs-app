import { useState } from "react";
import BluetoothComponent from "../component/BluetoothComponent";
//import Graph from "../component/Graph";
import GraphFromFile from "../component/GraphFromFile";
import Temperature from "../component/Temperature";
import "./petprofile.css";

export default function PetProfileScreen() {
  const [status, setStatus] = useState<Boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<string>("");
  return (
    <div className="pet-container">
      <BluetoothComponent status={status} connectedDevice={connectedDevice} />
      <Temperature />
      <GraphFromFile />
    </div>
  );
}
