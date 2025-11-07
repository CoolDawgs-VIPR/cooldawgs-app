import { Link, useRouter } from "expo-router";
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

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE

interface Pet {
  _id: string;
  name: string;
  image: string;
}

export default function HomeScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_BASE}/api/pets`)
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch pets:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.container} />;
  }

  const renderItem = ({ item }: { item: Pet }) => (
    <Link href={`/petprofile/${item.name}`} asChild>
      <TouchableOpacity style={styles.petItem}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        <Text style={styles.petName}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );

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
