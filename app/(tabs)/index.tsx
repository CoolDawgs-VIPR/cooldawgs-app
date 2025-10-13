import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DogCard from "../component/DogCard";

interface Dog {
  name: string;
  age: Number;
  breed: string;
  picurl: string;
}

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
  }
];

const styles = StyleSheet.create({
  centerscreen: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    height: "auto",
    width: "auto",
    backgroundColor: "#aebfd3", // Consider moving this to a container View
    flex: 1,
  },
});

export default function mainpage() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Dog }) => (
    <DogCard
      name={item.name}
      age={item.age}
      breed={item.breed}
      picurl={item.picurl}
      onpress={() => router.push(`/petprofile/${item.name}`)}
    />
  );

  return (
    <View style={styles.centerscreen}>
      <FlatList
        data={tempDogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2} 
      />
    </View>
  );
}