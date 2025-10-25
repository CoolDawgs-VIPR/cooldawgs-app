
import { router } from "expo-router";
import * as SecureStorage from 'expo-secure-store';
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function signup() {

    const signupAnim = useRef(new Animated.Value(1)).current;

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost/login", {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ "username": username, "password": password })
            });

            const data = await response.json();
            if (data.token) {
                await SecureStorage.setItemAsync('authToken', data.token);
            } else {
                console.log("the login has failed for username " + username);
            }
        } catch (error) {
            console.log("there was an error: " + error);
        }
    }

    const onPressIn = (anim: Animated.Value, route: any) => {
        return () => {
            Animated.spring(anim, {
                toValue: 0.9,
                tension: 100,
                useNativeDriver: true
            }).start();
            router.push(route);
        }
    }

    const onPressOut = (anim: Animated.Value) => {
        return () => {
            Animated.spring(anim, {
                toValue: 1,
                tension: 100,
                useNativeDriver: true
            }).start();
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.holder}>
                <Text style={styles.prompt_text}>🐕‍🦺Enter your credentials</Text>
                <View style={styles.fill_width}>
                    <TextInput style={styles.text_input_style} placeholder="Username" placeholderTextColor="black" autoCapitalize="none" value={username} onChangeText={setUsername}/>
                    <Text style={styles.forgot_text_styles}>Forgot Username...</Text>
                </View>
                <View style={styles.fill_width}>
                    <TextInput style={styles.text_input_style} placeholder="Password" placeholderTextColor="black" autoCapitalize="none" secureTextEntry={true} value={password} onChangeText={setPassword} />
                    <Text style={styles.forgot_text_styles}>Forgot Password...</Text>
                </View>
                <View style={styles.remaining}>
                    <Pressable onPressIn={onPressIn(signupAnim, `/`)} onPressOut={onPressOut(signupAnim)} style={styles.button_pressable_surround}>
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
        backgroundColor: "#447a99",
        width: "100%",
        height: "100%",
        //justifyContent: "center",
        alignItems: "center",
    },

    holder: {
        width: "100%",
        height: "50%",
        //backgroundColor: "lightgray",
        flexDirection: "column",  
        padding: "4%",
        borderRadius: 10,
        marginBottom: "50%"
    }, 

    text_input_style: {
        backgroundColor: "white",
        borderWidth: 2,
        fontSize: 18,
        width: "100%",
        marginTop: "10%",
        color: "black"
    },

    prompt_text: {
        fontSize: 30,
        textAlign: "center",
    },

    fill_width: {
        width: "100%"
    },

    forgot_text_styles: {
        textDecorationLine: "underline",
        textAlign: "right"
    },

    remaining: {
        flex: 1,
        flexDirection: "column-reverse",
        //backgroundColor: "green" //remove this
    },

    button_pressable_surround: {
        width: "100%",
        height: "50%",
        marginTop: "4%"
    },

    login_button_style: {
        width: "100%",
        height: 80,
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "#008b5dff",
    },

    button_text: {
        fontSize: 30
    }


})