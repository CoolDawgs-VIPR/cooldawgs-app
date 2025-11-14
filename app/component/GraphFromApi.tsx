import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Graph, { type HourlyAvg } from "./Graph";

// returned by /api/temps/avg24h
type AvgRow = { hourISO: string; avgTemp: number; count: number };

type Props = {
  ownerUsername?: string;
  petName?: string;
  /** web only — native ignores this */
  yDomainC?: [number, number];
  /** auto-refresh interval (ms) */
  refreshMs?: number;
  /** set true if backend groups by UTC hours */
  hoursAreUTC?: boolean;
};

type State = { hourly: HourlyAvg[]; loading: boolean; error?: string };

// Device-aware base URL
const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ??
  (typeof window !== "undefined"
    ? "http://localhost:8082"
    : "http://10.0.2.2:8082");

export default class GraphFromFile extends React.Component<Props, State> {
  state: State = { hourly: [], loading: true };
  private timer?: ReturnType<typeof setInterval>;

  componentDidMount() {
    this.load();
    const every = this.props.refreshMs ?? 60_000;
    this.timer = setInterval(this.load, every);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  private rowsToHourly = (rows: AvgRow[]): HourlyAvg[] => {
    const byHour = new Map<number, number>();
    for (const r of rows) {
      const d = new Date(r.hourISO);
      const hour = this.props.hoursAreUTC ? d.getUTCHours() : d.getHours();
      byHour.set(hour, r.avgTemp);
    }
    return Array.from({ length: 24 }, (_, hour) => {
      const c = byHour.get(hour);
      if (c == null || !Number.isFinite(c))
        return { hour, avgC: NaN, avgF: NaN };
      return { hour, avgC: c, avgF: (c * 9) / 5 + 32 };
    });
  };

  private load = async () => {
    try {
      const owner = this.props.ownerUsername ?? "";
      const pet = this.props.petName ?? "";

      const qs = new URLSearchParams();
      if (owner) qs.set("ownerUsername", owner);
      if (pet) qs.set("petName", pet);

      const url = `${API_BASE}/api/temps/avg24h${
        qs.toString() ? `?${qs}` : ""
      }`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const rows: AvgRow[] = await res.json();
      const hourly = this.rowsToHourly(rows);

      this.setState({ hourly, loading: false, error: undefined });
    } catch (e: any) {
      this.setState({ error: String(e?.message ?? e), loading: false });
    }
  };

  render() {
    const { hourly, loading, error } = this.state;
    const { yDomainC } = this.props;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Loading temperatures…</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.err}>Failed to load: {error}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Graph
          hourly={hourly}
          unit="C"
          title="Average Temperature Breakdown"
          yDomainC={yDomainC}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  err: { color: "crimson", textAlign: "center" },
});
