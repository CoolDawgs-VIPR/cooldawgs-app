import React from "react";
import { useEffect, useState } from "react";
import "./BluetoothComponent.css";

export default function BluetoothComponent(prop: {
  status: Boolean;
  connectedDevice: string;
}) {
  const [status, setStatus] = useState<Boolean>(prop.status);
  const [connectedDevice, setConnectedDevice] = useState<string>(
    prop.connectedDevice
  );
  const [displayChoices, setDisplayChoices] = useState(false);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  useEffect(() => {
    setConnectedDevice(connectedDevice);
  }, [connectedDevice]);

  return (
    <div>
      <div className="container">
        {status || connectedDevice !== "" ? (
          <p>{connectedDevice} </p>
        ) : (
          <p>No device saved</p>
        )}

        {status ? (
          <div className="buttons-container">
            <button
              id="forget-device-button"
              onClick={() => {
                setStatus(false);
                setConnectedDevice("");
              }}
            >
              Forget
            </button>
            <button
              id="disconnect-button"
              onClick={() => {
                setStatus(false);
              }}
            >
              Disconnect
            </button>
          </div>
        ) : connectedDevice === "" ? (
          displayChoices ? null : (
            <button
              id="find-device-button"
              onClick={() => {
                setDisplayChoices(true);
              }}
            >
              Find Device
            </button>
          )
        ) : (
          <div className="buttons-container">
            <button
              id="forget-device-button"
              onClick={() => {
                setStatus(false);
                setConnectedDevice("");
              }}
            >
              Forget
            </button>
            <button
              id="connect-button"
              onClick={() => {
                setStatus(true);
              }}
            >
              Connect
            </button>
          </div>
        )}

        {displayChoices ? (
          <div className="choices-container">
            <button
              className="choice-button"
              onClick={() => {
                setStatus(true);
                setConnectedDevice("Device 1");
                setDisplayChoices(false);
              }}
            >
              Device 1
            </button>
            <button
              className="choice-button"
              onClick={() => {
                setStatus(true);
                setConnectedDevice("Device 2");
                setDisplayChoices(false);
              }}
            >
              Device 2
            </button>
            <button
              id="cancel-button"
              onClick={() => {
                setDisplayChoices(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
