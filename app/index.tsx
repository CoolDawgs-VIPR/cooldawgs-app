import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = process.env.EXPO_PUBLIC_API_BASE;

interface Pet {
  _id: string;
  name: string;
  image: string;
  ownerUsername: string;
  ownerEmail: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  neutered: boolean;
  indoor: boolean;
}

export default function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        var username = await SecureStore.getItemAsync("username");
        if (!username) {
          username = "newuser1";
        }

        console.log(`Fetching pets for ${username} from: ${API_BASE}/api/pets/`);
        const response = await fetch(`http://172.20.37.153:8082/api/pets/`);
        const allPets: Pet[] = await response.json();

        const userPets = allPets.filter((pet) => pet.ownerUsername === username);
        console.log("Fetched user pets:", userPets);
        setPets(userPets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.container} />;
  }

  const renderItem = ({ item }: { item: Pet }) => {console.log(`/petprofile/${item.ownerUsername}/${item.name}`);
  return (
    <Link href={`/petprofile/${item.ownerUsername}/${item.name}`} asChild>
      <TouchableOpacity style={styles.petItem}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        <Text style={styles.petName}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );}

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addform")}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aebfd3",
  },
  list: {
    padding: 10,
  },
  petItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#4682B4",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
});
