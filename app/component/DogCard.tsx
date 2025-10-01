
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    dogcard: {
        width: "50%",
        maxWidth: 300,
        aspectRatio: 1,
        padding: 10,
    },

    cardinner: {
        backgroundColor: "lightgreen",
        width: "100%",
        height: "100%",
        padding: 3,
        borderRadius: 10
    },

    imagestyle: {
        width: "100%",
        flex: 1,
        borderRadius: 10
    },

    pressableinner: {
        width: "100%",
        height: "100%"
    }
})

interface DogCardProps {
    name: string,
    age: Number,
    picurl: string,
    onpress: () => void
}

const DogCard = ({name, age, picurl, onpress}: DogCardProps) => {
    const router = useRouter();
    return (
        <View style={styles.dogcard}>
            <Pressable style={styles.cardinner} onPress={onpress}>
                <View style={styles.pressableinner}>
                    <Text>{name}</Text>
                    <Text>{age.toString()}</Text>
                    <Image style={styles.imagestyle} source={{ uri: picurl }}/>
                </View>
            </Pressable>
        </View>
    );
}

export default DogCard;