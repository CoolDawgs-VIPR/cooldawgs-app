
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
        flex: 1,
        backgroundColor: "#F5F7FA",
        justifyContent: "center",
        alignItems: "center",
    },

    entry_holder: {
        flexDirection: "column-reverse",
        height: "80%",
        width: "85%", 
        justifyContent: "center", 
    },

    logo_and_remaining: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    cooldawgs_logo: {
        fontSize: 50,
        fontWeight: "900", 
        color: "#4F46E5",
        letterSpacing: -1,
    },

    button_pressable_surround: {
        width: "100%",
        height: 60, 
        marginTop: 16,
    },

    button_text: {
        fontSize: 18, 
        fontWeight: "bold",
        color: "white", 
        letterSpacing: 0.5,
    },

    login_button_style: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#4F46E5",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    signup_button_style: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#1F2937", 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});