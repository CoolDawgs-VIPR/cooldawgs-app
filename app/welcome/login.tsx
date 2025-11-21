
import { useRouter } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const router = useRouter();

    const signupAnim = useRef(new Animated.Value(1)).current;

    const DATABASE_URL = "http://172.28.144.1:8082";


    const onPressIn = (anim: Animated.Value, route: any) => {
        return async () => {
            Animated.spring(anim, {
                toValue: 0.9,
                tension: 100,
                useNativeDriver: true
            }).start();
            try {                                   //CHANGE THE IP ADDRESS BELOW TO YOUR LAPTOP IP ADDRESS FOR DEVELOPMENT
                const response = await fetch("http://172.20.70.171:8082/api/users/authenticate", { //CHANGE THE IP ADDRESS ON THIS LINE
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ "username": username, "password": password })
                });

                const data = await response.json();
                if (data.token) {
                    await SecureStorage.setItemAsync('authToken', data.token);
                    await SecureStorage.setItemAsync('username', data.username);
                    await SecureStorage.setItemAsync('email', data.email);
                    router.push(route);
                } else {
                    console.log("the login has failed for username " + username);
                    setUsername("");
                    setPassword("");
                }
            } catch (error) {
                console.log("there was an error: " + error);
            } finally {
                Animated.spring(anim, {
                    toValue: 1,
                    tension: 100,
                    useNativeDriver: true
                }).start();
            }
        }
    }

    return (
        <View style={styles.body}>
            <Text>TEMP USE THIS</Text>
            <Text>Username: newuser1</Text>
            <Text>password: qwerty</Text>
            <Text>ALSO IMPORTANT:</Text>
            <Text>go to line 15 of login.tsx and change the ip address in the fetch request to match your laptop local ip address</Text>
            <View style={styles.holder}>
                <Text style={styles.prompt_text}>Log In</Text>
                <View style={styles.fill_width}>
                    <TextInput style={styles.text_input_style} placeholder="Username" placeholderTextColor="black" autoCapitalize="none" onChangeText={setUsername}/>
                    {/* <TouchableOpacity>
                        <Text style={styles.forgot_text_styles}>Forgot Username...</Text>
                    </TouchableOpacity>                     */}
                </View>
                <View style={styles.fill_width}>
                    <TextInput style={styles.text_input_style} placeholder="Password" placeholderTextColor="black" autoCapitalize="none" secureTextEntry={true} onChangeText={setPassword} />
                    {/* <TouchableOpacity>
                        <Text style={styles.forgot_text_styles}>Forgot Password...</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.remaining}>
                    <Pressable onPressIn={onPressIn(signupAnim, `/`)} style={styles.button_pressable_surround}>
                        <Animated.View style={[styles.login_button_style, {transform: [{scale: signupAnim}]}]}>
                            <Text style={styles.button_text}>Login</Text>
                        </Animated.View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#F5F7FA", // Modern light gray background
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    holder: {
        width: "100%",
        maxWidth: 400, // Prevents it from getting too wide on tablets
        backgroundColor: "white", // Card look
        flexDirection: "column",   
        padding: 30,
        borderRadius: 24, // Smooth rounded corners
        // Shadow/Elevation for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    }, 

    // The Header Text
    prompt_text: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 30,
    },

    fill_width: {
        width: "100%",
        marginBottom: 16,
    },

    text_input_style: {
        backgroundColor: "#F3F4F6", 
        borderColor: "transparent",
        borderRadius: 12,
        fontSize: 16,
        width: "100%",
        padding: 16,
        color: "#1F2937",
    },

    forgot_text_styles: {
        textAlign: "right",
        color: "#4F46E5", 
        fontWeight: "600",
        fontSize: 12,
        marginTop: 8,
    },

    remaining: {
        marginTop: 10,
    },

    button_pressable_surround: {
        width: "100%",
        height: 56,
        marginTop: 20,
    },

    login_button_style: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#4F46E5",
        // Button Shadow
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 0,
    },

    button_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
});