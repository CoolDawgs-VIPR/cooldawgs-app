import {
    Image,
    Pressable,
    Text as RNText,
    StyleSheet,
    View,
} from "react-native";

interface DogCardProps {
  name: string;
  age: Number;
  breed: string;
  picurl: string;
  onpress: () => void;
}

const DogCard = ({ name, age, breed, picurl, onpress }: DogCardProps) => {
  return (
    <View style={styles.dogcard}>
      <Pressable style={styles.cardinner} onPress={onpress}>
        <View style={styles.pressableinner}>
          <View style={styles.header}>
            <RNText style={styles.title}>{name}</RNText>
            <RNText style={styles.subtitle}>{breed}</RNText>
            {/* <RNText style={styles.subtitle}>Age: {age}</RNText> */}
          </View>
          <Image style={styles.imagestyle} source={{ uri: picurl }} />
        </View>
      </Pressable>
    </View>
  );
};

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
    padding: 10,
    borderRadius: 10,
    borderBlockColor: "#000",
    borderWidth: 2,
  },

  header: { alignItems: "center", marginBottom: 4 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", color: "#111" },
  subtitle: { fontWeight: "700", textAlign: "center", color: "#222" },
  imagestyle: { width: "100%", flex: 1, borderRadius: 10 },
  pressableinner: { width: "100%", height: "100%" },
});

export default DogCard;