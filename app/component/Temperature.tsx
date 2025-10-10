import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface TemperatureProps {
  currentC: number;
  suggestedLimitC: number;
  max24hC: number;
}

const cToF = (c: number) => (c * 9) / 5 + 32;

const fmtBoth = (c?: number) =>
  typeof c === "number" && Number.isFinite(c)
    ? `${c.toFixed(1)}°C / ${cToF(c).toFixed(1)}°F`
    : "-- °C/°F";

const Temperature: React.FC<TemperatureProps> = ({
  currentC = null,
  suggestedLimitC = null,
  max24hC = null,
}) => {
  return (
    <View style={styles.tempsContainer}>
      <Text style={styles.tempsLine}>
        <Text style={styles.tempsLabel}>Current Temperature: </Text>
        {fmtBoth(currentC)}
      </Text>
      <Text style={styles.tempsLine}>
        <Text style={styles.tempsLabel}>Suggested Limit: </Text>
        {fmtBoth(suggestedLimitC)}
      </Text>
      <Text style={styles.tempsLine}>
        <Text style={styles.tempsLabel}>24H Max: </Text>
        {fmtBoth(max24hC)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tempsContainer: {
    backgroundColor: '#aebfd3',
    width: '80%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    margin: 10,
  },
  tempsLine: {
    fontSize: 20,
    marginVertical: 8,
  },
  tempsLabel: {
    fontWeight: '800',
  },
});

export default Temperature;