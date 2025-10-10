import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  Text as RNText,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  dogcard: {
    textAlign: "center",
    width: "50%",
    maxWidth: 300,
    aspectRatio: 1,
    padding: 8,
  },

  cardinner: {
    backgroundColor: "#aed6cf",
    width: "100%",
    height: "100%",
    padding: 1,
    borderRadius: 10,
  },

  header: { alignItems: "center", marginBottom: 4 },
  title: { fontWeight: "700", textAlign: "center", color: "#111" },
  subtitle: { fontWeight: "700", textAlign: "center", color: "#222" },
  imagestyle: { width: "100%", flex: 1, borderRadius: 10 },
  pressableinner: { width: "100%", height: "100%" },
});

interface DogCardProps {
  name: string;
  age: number;
  picurl: string;
  onpress: () => void;
}

const DogCard = ({ name, age, picurl, onpress }: DogCardProps) => {
  const router = useRouter();
  return (
    <View style={styles.dogcard}>
      <Pressable style={styles.cardinner} onPress={onpress}>
        <View style={styles.pressableinner}>
          <View style={styles.header}>
            <RNText style={styles.title}>{name}</RNText>
            <RNText style={styles.subtitle}>{age}</RNText>
          </View>
          <Image style={styles.imagestyle} source={{ uri: picurl }} />
        </View>
      </Pressable>
    </View>
  );
};

export default DogCard;
