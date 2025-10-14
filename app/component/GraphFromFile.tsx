import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Graph, { type HourlyAvg } from "./Graph";

const TEMPS_ASSET = Asset.fromModule(require("../assets/temps_24h.json"));

type TempSample = { t: number; c: number };

const cToF = (c: number) => (c * 9) / 5 + 32;

function parseCsv(text: string): TempSample[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];
  const headers = lines[0].split(",");
  const msIdx = headers.indexOf("timestamp_ms");
  const cIdx = headers.indexOf("temp_c");
  const out: TempSample[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(",");
    const t = Number(cells[msIdx]);
    const c = Number(cells[cIdx]);
    if (Number.isFinite(t) && Number.isFinite(c)) out.push({ t, c });
  }
  return out;
}

function computeHourlyAverages(samples: TempSample[]): HourlyAvg[] {
  const buckets = Array.from({ length: 24 }, () => ({ sum: 0, n: 0 }));
  for (const s of samples) {
    const h = new Date(s.t).getHours();
    buckets[h].sum += s.c;
    buckets[h].n += 1;
  }
  return buckets.map((b, hour) => {
    if (!b.n) return { hour, avgC: NaN, avgF: NaN };
    const avgC = b.sum / b.n;
    return { hour, avgC, avgF: cToF(avgC) };
  });
}

type State = { hourly: HourlyAvg[]; loaded: boolean; error?: string };

export default class GraphFromFile extends React.Component<{}, State> {
  state: State = { hourly: [], loaded: false };

  async componentDidMount() {
    try {
      await TEMPS_ASSET.downloadAsync(); // no-op if already local
      const uri = TEMPS_ASSET.localUri ?? TEMPS_ASSET.uri;
      if (!uri) throw new Error("Asset URI not available");

      const text = await FileSystem.readAsStringAsync(uri, {
        encoding: "utf8",
      });

      const samples = JSON.parse(text).map((e: any) => ({
        t: e.timestamp_ms,
        c: e.temp_c,
      }));
      const hourly = computeHourlyAverages(samples);
      this.setState({ hourly, loaded: true });
    } catch (e: any) {
      this.setState({ error: String(e?.message ?? e), loaded: true });
    }
  }

  render() {
    const { hourly, loaded, error } = this.state;
    if (!loaded)
      return (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Loading…</Text>
        </View>
      );
    if (error)
      return (
        <View style={styles.center}>
          <Text style={styles.err}>Failed to load: {error}</Text>
        </View>
      );
    //change the y doamin here later on.
    return (
      <View style={{ flex: 1 }}>
        <Graph
          hourly={hourly}
          unit="C"
          title="Average Temperature Breakdown"
          yDomainC={[25, 38]}
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
