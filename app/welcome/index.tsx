
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {

    const router = useRouter();

    const loginAnim = useRef(new Animated.Value(1)).current;
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


    return (
        <View style={styles.body}>
            <View style={styles.entry_holder}>
                <Pressable onPressIn={onPressIn(loginAnim, '/welcome/login')} onPressOut={onPressOut(loginAnim)} style={styles.button_pressable_surround}>
                    <Animated.View style={[styles.login_button_style, {transform: [{scale: loginAnim}]}]}>
                        <Text style={styles.button_text}>Login</Text>
                    </Animated.View>
                </Pressable>
                <Pressable onPressIn={onPressIn(signupAnim, '/welcome/signup')} onPressOut={onPressOut(signupAnim)} style={styles.button_pressable_surround}>
                    <Animated.View style={[styles.signup_button_style, {transform: [{scale: signupAnim}]}]}>
                        <Text style={styles.button_text}>Signup</Text>
                    </Animated.View>
                </Pressable>
                <View style={styles.logo_and_remaining}>
                    <Text style={styles.cooldawgs_logo}>CoolDawgs</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#aebfd3",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    entry_holder: {
        flexDirection: "column-reverse",
        //backgroundColor: "green", //remove
        height: "80%",
        width: "90%",
    },

    logo_and_remaining: {
        flex: 1,
        //backgroundColor: "orange", //REMOVE
        justifyContent: "flex-start",
        alignItems: "center",
    },

    button_pressable_surround: {
        width: "100%",
        height: "10%",
        marginTop: "4%"
    },

    button_text: {
        fontSize: 30
    },

    login_button_style: {
        width: "100%",
        height: "100%",
        borderColor: "black",
        //borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "#008b5dff",
    },

    signup_button_style: {
        width: "100%",
        height: "100%",
        borderColor: "black",
        //borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "#831740ff",
    },

    cooldawgs_logo: {
        fontSize: 60,
    }

    
});