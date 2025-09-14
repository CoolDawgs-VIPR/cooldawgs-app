import { useState } from "react";
import BluetoothComponent from "../component/BluetoothComponent";

export default function PetProfileScreen() {
    const [status, setStatus] = useState<Boolean>(false);
    const [connectedDevice, setConnectedDevice] = useState<string>("");
    return (
        <div>
            <BluetoothComponent status={status} connectedDevice={connectedDevice} />
        </div>
    );

}