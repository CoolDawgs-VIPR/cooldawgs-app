import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Text, PermissionsAndroid, Platform } from "react-native";

import { BleManager, Device } from "react-native-ble-plx";

const bleManager = new BleManager();

type BluetoothComponentProps = {
  status: boolean;
  connectedDevice: Device | null;
  onStatusChange: (status: boolean) => void;
  onDeviceChange: (device: Device | null) => void;
};

export default function BluetoothComponent(props: BluetoothComponentProps) {
  const { status, connectedDevice, onStatusChange, onDeviceChange } = props;

  const [displayChoices, setDisplayChoices] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);


  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return (
        granted['android.permission.BLUETOOTH_SCAN'] === 'granted' &&
        granted['android.permission.BLUETOOTH_CONNECT'] === 'granted' &&
        granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
      );
    }
    return true;
  };

  const startScan = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) {
      console.log("Permissions not granted");
      return;
    }

    setDiscoveredDevices([]);
    setDisplayChoices(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        bleManager.stopDeviceScan();
        return;
      }

      if (device && device.name) {
        setDiscoveredDevices((prev) => {
          if (!prev.some((d) => d.id === device.id)) {
            return [...prev, device];
          }
          return prev;
        });
      }
    });
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setDisplayChoices(false);
  };

  const connectToDevice = async (device: Device) => {
    stopScan();
    try {
      const connected = await device.connect();
      onDeviceChange(connected);
      onStatusChange(true);
    } catch (error) {
      console.error(`Failed to connect to ${device.name}`, error);
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await connectedDevice.cancelConnection();
        onDeviceChange(null);
        onStatusChange(false);
      } catch (error) {
        console.error("Failed to disconnect", error);
      }
    }
  };

  const forgetDevice = () => {
    disconnectDevice();
  };
  
  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, []);

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <TouchableOpacity style={styles.choiceButton} onPress={() => connectToDevice(item)}>
      <Text style={styles.choiceButtonText}>{item.name || "Unknown Device"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {status && connectedDevice ? `Connected to: ${connectedDevice.name}` : "No device connected"}
      </Text>

      {status ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.forgetButton]} onPress={forgetDevice}>
            <Text style={styles.buttonText}>Forget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.disconnectButton]} onPress={disconnectDevice}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, styles.findDeviceButton]} onPress={startScan}>
          <Text style={styles.findDeviceButtonText}>Find Device</Text>
        </TouchableOpacity>
      )}

      {displayChoices && (
        <View style={styles.choicesContainer}>
          {discoveredDevices.length === 0 ? (
            <Text style={styles.scanningText}>Scanning for devices...</Text>
          ) : (
            <FlatList
              data={discoveredDevices}
              renderItem={renderDeviceItem}
              keyExtractor={(item) => item.id}
            />
          )}
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={stopScan}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#aed6cf',
    width: '90%',
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Arial',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgetButton: {
    backgroundColor: '#000000',
  },
  disconnectButton: {
    backgroundColor: '#ff0000',
  },
  findDeviceButton: {
    width: '80%',
    backgroundColor: '#a2dbff',
  },
  findDeviceButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  choicesContainer: {
    marginTop: 20,
    width: '100%',
    height: 200, // Give it a fixed height for the list to render
  },
  scanningText: {
    textAlign: 'center',
  },
  choiceButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#a2dbff',
    marginBottom: 10,
    alignItems: 'center',
  },
  choiceButtonText: {
    color: 'black',
  },
  cancelButton: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#000000',
  },
});