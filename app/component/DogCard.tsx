import {
  Animated,
  Image,
  Pressable,
  Text as RNText,
  StyleSheet,
  View
} from "react-native";

import React, { useRef } from "react";

interface DogCardProps {
  name: string;
  age: Number;
  breed: string;
  picurl: string;
  onpress: () => void;
}

const DogCard = ({ name, age, breed, picurl, onpress }: DogCardProps) => {

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      tension: 100,
      useNativeDriver: true
    }).start();
    onpress();
  }

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      useNativeDriver: true
    }).start();
  }

  return (
    <Pressable style={styles.dogcard} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.fill, {transform: [{scale: scaleAnim}]}]}>
        <View style={styles.cardinner}>
          <View style={styles.pressableinner}>
            <View style={styles.header}>
              <RNText style={styles.title}>{name}</RNText>
              <RNText style={styles.subtitle}>{breed}</RNText>
              {/* <RNText style={styles.subtitle}>Age: {age}</RNText> */}
            </View>
            <Image style={styles.imagestyle} source={{ uri: picurl }} />
          </View>
        </View>
      </Animated.View>  
    </Pressable>
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
  fill: { width: "100%", height: "100%" }
});

export default DogCard;