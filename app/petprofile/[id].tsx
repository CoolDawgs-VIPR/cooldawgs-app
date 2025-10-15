import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Device } from "react-native-ble-plx";

import BluetoothComponent from "../component/BluetoothComponent";
import Temperature from "../component/Temperature";
import Graph, { type HourlyAvg } from "../component/Graph";

const tempDogs = [
  {
    name: "Lucy",
    age: 19,
    breed: "Golden Retriever",
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.gahlv6lF5ELuYYj5edAMTgHaHs%3Fpid%3DApi&f=1&ipt=172ce4dfa9a80b055e6641e1c7806edb1a814061443fbdcb9f53defddbbf9565&ipo=images",
  },
  {
    name: "Buddy",
    age: 3,
    breed: "Beagle",
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.O8bcPBdHUp48kEJlFXo-1QHaEH%3Fpid%3DApi&f=1&ipt=98631468654f798ecf825d37e5f9e47010747c1dd1329e107ca0a5bc81944f10&ipo=images",
  },
  {
    name: "Puddles",
    age: 5,
    breed: "Poodle",
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.my4ogX_ziTUGUPhaVkkKswHaHa%3Fpid%3DApi&f=1&ipt=de724bab036c71b7476abd30e73f111f2e8840eb04d7b433311281f26c707446&ipo=images",
  },
  {
    name: "Jack",
    age: 6,
    breed: "Bulldog",
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.cgyBn3uKkMYyTLhwzRFnlgHaJY%3Fpid%3DApi&f=1&ipt=6e46c26aecf7a9dc862707ae15e7f668a7ff1ff6b7d3e02d17b8b2471df34a87&ipo=images",
  },
];

export default function PetProfileScreen() {
  const { id } = useLocalSearchParams();
  const pet = tempDogs.filter((pet) => pet.name === id)[0];

  const [status, setStatus] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pet.name}'s Profile</Text>
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
