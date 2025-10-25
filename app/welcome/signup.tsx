
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
            <ScrollView contentContainerStyle={styles.holder}>
                <View style={styles.fill}>
                    <Text style={styles.prompt_text}>Fill out the fields below:</Text>
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
        backgroundColor: "#447a99",
        flex: 1,
    },

    holder: {
        padding: "2%"
    }, 

    text_input_style: {
        backgroundColor: "white",
        borderWidth: 2,
        fontSize: 18,
        width: "100%",
        marginBottom: "6%",
        color: "black"
    },

    fill_width: {
        width: "100%"
    },

    fill: {
        width: "100%",
        height: "80%",
        flexDirection: "column",  
        padding: "4%",
        borderRadius: 10,
        marginBottom: "50%"
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
        height: 80,
        marginTop: "4%"
    },

    login_button_style: {
        width: "100%",
        height: "100%",
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "#8b0035ff",
    },

    button_text: {
        fontSize: 30
    },

    prompt_text: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10
    },


})