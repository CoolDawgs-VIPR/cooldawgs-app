import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DogCard from "../component/DogCard";

const styles = StyleSheet.create({
  centerscreen: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    height: "auto",
    width: "auto",
    backgroundColor: "#aebfd3",
  },
});

interface Dogs {
  name: string;
  age: Number;
  picurl: string;
}

const tempDogs: Dogs[] = [
  {
    name: "bob",
    age: 19,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.gahlv6lF5ELuYYj5edAMTgHaHs%3Fpid%3DApi&f=1&ipt=172ce4dfa9a80b055e6641e1c7806edb1a814061443fbdcb9f53defddbbf9565&ipo=images",
  },
  {
    name: "Doggo",
    age: 3,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.O8bcPBdHUp48kEJlFXo-1QHaEH%3Fpid%3DApi&f=1&ipt=98631468654f798ecf825d37e5f9e47010747c1dd1329e107ca0a5bc81944f10&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.my4ogX_ziTUGUPhaVkkKswHaHa%3Fpid%3DApi&f=1&ipt=de724bab036c71b7476abd30e73f111f2e8840eb04d7b433311281f26c707446&ipo=images",
  },
  {
    name: "smalldog",
    age: 6,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.cgyBn3uKkMYyTLhwzRFnlgHaJY%3Fpid%3DApi&f=1&ipt=6e46c26aecf7a9dc862707ae15e7f668a7ff1ff6b7d3e02d17b8b2471df34a87&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.S68LriMUbRKvIBtUmCgKdQHaH3%3Fpid%3DApi&f=1&ipt=89333a1344022361ca75ba7baae0ece3880efe49595b7b01ae5e762380fe157d&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.-t-pEwbqA7Od8U6likQu4gHaE5%3Fpid%3DApi&f=1&ipt=9066ddb46d745ab5426b09621d0a94065526631c575140682ec1305f5710447f&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIF.vT19TTvPYKxvNCHLJ0SyLQ%3Fpid%3DApi&f=1&ipt=83c08edb9a614984afd8715bd0259c8d4573f410b3685bff36956420680ca6cc&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.lg0fJfyo54ZgL2kaN6QIfAHaHR%3Fpid%3DApi&f=1&ipt=98b09dfb2fcfcc8bf408ce263a2658890949f2020f9c9fa45c30feb2f2e1050f&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.h-ZnxkMHVe5mYE66tsmwWQHaHz%3Fpid%3DApi&f=1&ipt=f849450cb9c7e2b367aac4f0f3f590c5e1131b0171367aaef1d64c9cd5e5ae18&ipo=images",
  },
  {
    name: "big dog",
    age: 5,
    picurl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.uIojNy2NdBpk-g8AlLC6IwHaE8%3Fpid%3DApi&f=1&ipt=93830472e442b7a33ca68c833900c5aeeef233e7c596611622a4d70512e78d51&ipo=images",
  },
];

export default function mainpage() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.centerscreen}>
      {tempDogs.map((x, index) => {
        return (
          <DogCard
            name={x.name}
            age={x.age}
            picurl={x.picurl}
            key={index}
            onpress={() => router.push(`/petprofile/${x.name}`)}
          />
        );
      })}
    </ScrollView>
  );
}