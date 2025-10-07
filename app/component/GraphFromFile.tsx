import React from "react";
import Graph, { type HourlyAvg } from "../component/Graph";

type TempSample = { t: number; c: number }; // ms timestamp, Celsius

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
    const h = new Date(s.t).getHours(); // local time hour 0..23; use getUTCHours()
    buckets[h].sum += s.c;
    buckets[h].n += 1;
  }
  return buckets.map((b, hour) => {
    if (!b.n) return { hour, avgC: NaN, avgF: NaN }; // NaN makes Recharts skip the bar
    const avgC = b.sum / b.n;
    return { hour, avgC, avgF: cToF(avgC) };
  });
}

type State = { hourly: HourlyAvg[]; loaded: boolean; error?: string };

export default class GraphFromFile extends React.Component<{}, State> {
  state: State = { hourly: [], loaded: false };

  async componentDidMount() {
    try {
      const res = await fetch("/temps_24h.txt", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const samples = parseCsv(text);
      const hourly = computeHourlyAverages(samples);
      this.setState({ hourly, loaded: true });
    } catch (e: any) {
      this.setState({ error: String(e), loaded: true });
    }
  }

  render() {
    const { hourly, loaded, error } = this.state;
    if (!loaded) return <div>Loading data…</div>;
    if (error)
      return <div style={{ color: "crimson" }}>Failed to load: {error}</div>;
    return (
      <Graph hourly={hourly} unit="C" title="Average Temperature Breakdown" />
    );
  }
}
