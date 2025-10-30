
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function usersettings() {
    const router = useRouter();

    const [username, setUsername] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
        console.log("runnign");
        const fetchuserdata = async () => {
            try {
                const usernameresult = await SecureStore.getItemAsync("username");
                const emailresult = await SecureStore.getItemAsync("email");
                const tokenresult = await SecureStore.getItemAsync("authToken");
                if (!usernameresult || !emailresult || !tokenresult) {
                    router.replace("/welcome");
                } else {
                    setUsername(usernameresult);
                    setEmail(emailresult);
                    setToken(tokenresult);
                }
            } catch (error) {
                console.log("there was an error getting the token: " + error);
            }
        };
        fetchuserdata();
    });

    const logout = async (e: any) => {
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("email");
        await SecureStore.deleteItemAsync("authToken");
        router.replace("/welcome");
    }
        

    return (
        <View style={styles.body}>
            <ScrollView>
                <View style={styles.holder}>
                    <View style={styles.info_holder}>
                        <View>
                            <Text style={styles.label_text}>Username:</Text>
                            <Text style={styles.info_text}>{username}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.link_text}>change...</Text>
                        </TouchableOpacity>                        
                    </View>
                    <View style={styles.info_holder}>
                        <View>
                            <Text style={styles.label_text}>Email:</Text>
                            <Text style={styles.info_text}>{email}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.link_text}>change...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.remaining}>
                        <TouchableOpacity onPress={logout}>
                            <Text style={styles.link_text}>Switch Accounts..</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: "#aebfd3",
        height: "100%",
        width: "100%"
    },

    remaining: {
        width: "100%",
        height: "100%",
        //backgroundColor: "green", //remove
        alignItems: "center",
        padding: "4%"
    },

    info_holder: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 2,
        padding: "1%"
    },

    label_text: {
        textAlign: "left"
    },

    link_text: {
        textDecorationLine: "underline",
        color: "#2c2c2cff"
    },

    info_text: {
        textAlign: "left",
        fontSize: 30,
    },

    holder: {
        width: "100%",
        padding: "2%",
        //backgroundColor: "green" //remove 
    }
});