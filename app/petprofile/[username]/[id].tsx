import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Device } from "react-native-ble-plx";

import BluetoothComponent from "../../component/BluetoothComponent";
import Graph from "../../component/Graph";
import Temperature from "../../component/Temperature";


export default function PetProfileScreen() {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    try {
      const response = await fetch("http://172.20.37.153:8082/api/pets/").then((res) => res.json())
      .then((data) => {
        console.log("Fetched pets:", data)
        setDogs(data);
      })
      console.log(dogs)
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const { username, id: petname } = useLocalSearchParams();
  console.log(dogs)
  const pet = dogs.find((pet) => pet.ownerUsername === username && pet.name === petname);

  const [status, setStatus] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pet?.name}'s Profile</Text>
      <BluetoothComponent
        status={status}
        connectedDevice={connectedDevice}
        onStatusChange={setStatus}
        onDeviceChange={setConnectedDevice}
      />
      <Temperature
        currentC={Math.random() * 30 + 70}
        suggestedLimitC={Math.random() * 5 + 75}
        max24hC={Math.random() * 10 + 80}
      />
      <Graph
        title="Hourly Average Temperature"
        unit="F"
        hourly={Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          avgC: Math.random() * 10 + 20,
          avgF: Math.random() * 18 + 90,
        }))}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aebfd3",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
