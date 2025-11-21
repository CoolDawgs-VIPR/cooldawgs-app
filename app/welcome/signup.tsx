
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function signup() {

    const router = useRouter();
    const signupAnim = useRef(new Animated.Value(1)).current;

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

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <KeyboardAvoidingView style={styles.body} behavior="height" >
            <Text>THIS PAGE DOESNT WORK YET GO TO LOGIN</Text>
            <ScrollView>
                <View style={styles.holder}>
                    <Text style={styles.prompt_text}>🐕 Create an Account</Text>
                    <View style={styles.fill_width}>
                        <Text>Username: </Text>                    
                        <TextInput style={styles.text_input_style} placeholder="username" placeholderTextColor="black" autoCapitalize="none" onChangeText={setUsername}/>
                    </View>
                    <View style={styles.fill_width}>
                        <Text>Password: </Text>
                        <TextInput style={styles.text_input_style} placeholder="password" placeholderTextColor="black" autoCapitalize="none" secureTextEntry={true} onChangeText={setPassword} />
                    </View>
                    <View style={styles.fill_width}>
                        <Text>Confirm Password: </Text>
                        <TextInput style={styles.text_input_style} placeholder="enter password again" placeholderTextColor="black" autoCapitalize="none" secureTextEntry={true} onChangeText={setPassword2} />
                    </View>
                    <View style={styles.fill_width}>
                        <Text>Email (optional):</Text>
                        <TextInput style={styles.text_input_style} placeholder="email address" placeholderTextColor="black" autoCapitalize="none" onChangeText={setEmail}/>
                    </View>
                    <View style={styles.remaining}>
                        <Pressable onPressIn={onPressIn(signupAnim, `/`)} onPressOut={onPressOut(signupAnim)} style={styles.button_pressable_surround}>
                            <Animated.View style={[styles.login_button_style, {transform: [{scale: signupAnim}]}]}>
                                <Text style={styles.button_text}>Signup</Text>
                            </Animated.View>
                        </Pressable>
                    </View>
                </View>                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#F5F7FA", 
    },

    holder: {
        backgroundColor: "white",
        marginHorizontal: 20,
        marginTop: 40, 
        marginBottom: 40,
        padding: 24,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },

    prompt_text: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1E293B",
        textAlign: "center",
        marginBottom: 30,
        letterSpacing: -0.5,
    },

    fill_width: {
        width: "100%",
        marginBottom: 16,
    },

    text_input_style: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        fontSize: 16,
        width: "100%",
        paddingVertical: 14,
        paddingHorizontal: 16,
        color: "#1E293B",
        marginTop: 8, 
        borderWidth: 0,
    },

    remaining: {
        marginTop: 20,
        flexDirection: "column-reverse",
    },

    button_pressable_surround: {
        width: "100%",
        height: 56,
        marginTop: 10,
    },

    login_button_style: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#4F46E5",
        borderWidth: 0,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    button_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 0.5,
    },

    forgot_text_styles: {
        textDecorationLine: "underline",
        textAlign: "right",
        color: "#64748B",
        marginTop: 8,
    },
});