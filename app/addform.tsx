import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = process.env.EXPO_PUBLIC_API_BASE;

export default function AddPetForm() {
  const [name, setName] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [indoor, setIndoor] = useState(false);
  const [bluetooth, setBluetooth] = useState(""); // Added bluetooth state
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Client-side validation
    if (!name.trim()) {
      Alert.alert("Validation Error", "Pet Name is required.");
      return;
    }
    if (!age.trim() || isNaN(parseInt(age, 10))) {
      Alert.alert("Validation Error", "Age is required and must be a number.");
      return;
    }
    if (!gender.trim()) {
      Alert.alert("Validation Error", "Gender is required.");
      return;
    }
    if (!weight.trim()) {
      Alert.alert("Validation Error", "Weight is required.");
      return;
    }
    if (!image.trim()) {
      Alert.alert("Validation Error", "Image URL is required.");
      return;
    }

    try {
      const newPet = {
        name,
        ownerUsername,
        ownerEmail,
        breed,
        age: parseInt(age, 10),
        gender,
        weight,
        neutered,
        indoor,
        bluetooth,
        image,
      };

      const url = `${API_BASE}/api/pets`;
      console.log("Submitting Pet Data to:", url, newPet);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPet),
      });
      
      if (response.ok) {
        Alert.alert("Success", "Pet added successfully!");
        
        // Reset form fields
        setName("");
        setOwnerUsername("");
        setOwnerEmail("");
        setBreed("");
        setAge("");
        setGender("");
        setWeight("");
        setNeutered(false);
        setIndoor(false);
        setBluetooth("");
        setImage("");
        
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to add pet. Please check all fields.");
      }
    } catch (error) {
      const url = `${API_BASE}/api/pets`;
      console.error(`Error submitting to ${url}:`, error);
      Alert.alert(
        "Network Error",
        `Failed to connect to the server at ${url}. Please check your network and server status.\n\nDetails: ${error}`
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Add a New Pet</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pet Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical Info</Text>
        <TextInput
          style={styles.input}
          placeholder="Age (years)"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (lbs)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Gender:</Text>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "Male" && styles.genderSelected,
            ]}
            onPress={() => setGender("Male")}
          >
            <Text
              style={[
                styles.genderOptionText,
                gender === "Male" && styles.genderSelectedText,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "Female" && styles.genderSelected,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text
              style={[
                styles.genderOptionText,
                gender === "Female" && styles.genderSelectedText,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Info</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setNeutered(!neutered)}
          >
            {neutered && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Neutered</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIndoor(!indoor)}
          >
            {indoor && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Indoor Pet</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Pet</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F4F8",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E2A3B",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334E68",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DCE4F0",
    color: "#1E2A3B",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DCE4F0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#BCCCDC",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 16,
    height: 16,
    backgroundColor: "#4682B4",
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#334E68",
  },
  button: {
    backgroundColor: "#4682B4",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#4682B4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  genderContainer: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DCE4F0",
  },
  genderLabel: {
    fontSize: 16,
    color: "#334E68",
    paddingLeft: 10,
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: "#4682B4",
    shadowColor: "#4682B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  genderOptionText: {
    color: "#334E68",
    fontSize: 16,
    fontWeight: "600",
  },
  genderSelectedText: {
    color: "white",
  },
});