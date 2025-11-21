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

        console.log(`Fetching pets for ${username} from: http://72.20.37.153:8082/api/pets/`);
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

const renderItem = ({ item }: { item: Pet }) => {
    return (
      <Link href={`/petprofile/${item.ownerUsername}/${item.name}`} asChild>
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          
          <View style={styles.cardTextContainer}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.petName}>{item.name}</Text>
            </View>
            
            <Text style={styles.petBreed}>{item.breed}</Text>
            <Text style={styles.petDetails}>{item.age} years old</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>My Pets</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addform")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", 
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, 
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A202C",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#718096",
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: "row",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  petName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
  },
  petBreed: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
    marginBottom: 2,
  },
  petDetails: {
    fontSize: 12,
    color: "#A0AEC0",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 30,
    width: 64, 
    height: 64,
    borderRadius: 32,
    backgroundColor: "#4F46E5", 
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: "white",
    marginTop: -2,
  },
});