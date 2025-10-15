import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export type TempUnit = "C" | "F";
export interface HourlyAvg {
  hour: number;
  avgC: number;
  avgF: number;
}
export interface GraphProps {
  hourly?: HourlyAvg[];
  unit?: TempUnit;
  title?: string;
  yDomainC?: [number, number]; // not required
}

const cToF = (c: number) => (c * 9) / 5 + 32;

export default class Graph extends PureComponent<GraphProps> {
  static defaultProps: Partial<GraphProps> = {
    unit: "C",
    title: "Average Temperature Breakdown",
    hourly: [],
  };

  //change here later to set the right range(to be on both the phone and the web)
  render() {
    const { hourly = [], unit = "C", title } = this.props;

    // Map HourlyAvg to Gifted-Charts data format
    const data = hourly.map((h) => {
      const raw = unit === "C" ? h.avgC : h.avgF;
      const valid = Number.isFinite(raw);
      const val = valid ? Number(raw) : 0;
      return {
        value: val,
        label: String(h.hour),
        frontColor: valid ? "#86efac" : "transparent",
        topLabelComponent: valid
          ? () => <Text style={styles.topLabel}>{}</Text>
          : undefined,
      };
    });

    const maxCardWidth = Math.min(680, Dimensions.get("window").width - 32);

    return (
      <View style={styles.panel}>
        <View style={[styles.card, { width: maxCardWidth }]}>
          <Text style={styles.title}>{title}</Text>

          <View style={{ height: 285, justifyContent: "center" }}>
            <BarChart
              data={data}
              barWidth={12}
              spacing={6}
              initialSpacing={10}
              roundedTop
              noOfSections={5}
              rulesColor="rgba(0,0,0,0.08)"
              xAxisThickness={1}
              yAxisThickness={1}
              yAxisTextStyle={{ fontSize: 10 }}
              xAxisLabelTextStyle={{ fontSize: 10, color: "#374151" }}
              // Optional: to stabilize scale (°C / °F)
              // maxValue={unit === "C" ? 40 : 104}
            />
          </View>

          <Text style={styles.caption}>Time of the day</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#aebfd3",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  caption: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  topLabel: { fontSize: 10, textAlign: "center", marginBottom: 2 },
});
