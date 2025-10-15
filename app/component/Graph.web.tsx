import { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Graph.css";

export type TempUnit = "C" | "F";

export interface HourlyAvg {
  hour: number; // 0..23
  avgC: number; // use NaN when no data
  avgF: number; // use NaN when no data
}

export interface GraphProps {
  hourly?: HourlyAvg[];
  unit?: TempUnit;
  title?: string;
  yDomainC?: [number, number];
}

const cToF = (c: number) => (c * 9) / 5 + 32;

export default class Graph extends PureComponent<GraphProps> {
  static defaultProps: Partial<GraphProps> = {
    unit: "C",
    title: "Average Temperature Breakdown",
    hourly: [],
  };

  private getDomain(
    unit: TempUnit,
    yDomainC: [number, number] | undefined,
    data: HourlyAvg[] | undefined,
    key: "avgC" | "avgF"
  ): [number, number] {
    if (yDomainC)
      return unit === "C" ? yDomainC : [cToF(yDomainC[0]), cToF(yDomainC[1])];
    const vals = (data ?? [])
      .map((d) => d[key])
      .filter((v) => Number.isFinite(v)) as number[];
    if (!vals.length) return [0, 1];
    const min = Math.min(...vals),
      max = Math.max(...vals);
    const pad = Math.max(0.3, (max - min) * 0.12);
    return [Math.floor(min - pad), Math.ceil(max + pad)];
  }

  render() {
    const { hourly, unit = "C", title, yDomainC } = this.props;
    const hours = hourly ?? [];
    const valueKey: "avgC" | "avgF" = unit === "C" ? "avgC" : "avgF";
    const domain = this.getDomain(unit, yDomainC, hours, valueKey);

    return (
      <div className="graph-panel">
        <div className="graph-card">
          <h3 className="graph-title">{title}</h3>
          <div className="graph-plot">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hours}
                margin={{ top: 10, right: 16, bottom: 20, left: 8 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  interval={0}
                  height={36}
                  tickFormatter={(h) => `${h}`}
                />
                <YAxis
                  width={46}
                  domain={domain}
                  tickFormatter={(v) => `${Number(v).toFixed(0)}`}
                />
                <Tooltip
                  formatter={(val: any) => `${Number(val).toFixed(1)}°${unit}`}
                  labelFormatter={(h: any) => `Hour ${h}:00`}
                />
                <Bar
                  dataKey={valueKey}
                  fill="#86efac"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={22}
                >
                  <LabelList
                    dataKey={valueKey}
                    position="top"
                    formatter={(v: any) =>
                      Number.isFinite(v) ? Number(v).toFixed(1) : ""
                    }
                    className="graph-label"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="graph-xcaption">Time of the day</div>
        </div>
      </div>
    );
  }
}
