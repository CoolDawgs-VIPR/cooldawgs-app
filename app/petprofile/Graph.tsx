import { PureComponent } from "react";

export type TempUnit = "C" | "F";

export interface HourlyAvg {
  hour: number; // 0 to 23 or can be changed to 0-12 twice
  avgC: number; // will be 0 if no data was collected
  avgF: number; // optional precomputed F, calculated in Temperature.tsx
}

export interface GraphProps {
  hourly: HourlyAvg[]; // length 24 expected
  unit?: TempUnit; // "C" or "F"
  title?: string; // for UI when we do it
  yDomainC?: [number, number]; // for UI when we do it
}

const cToF = (c: number) => (c * 9) / 5 + 32;

export default class Graph extends PureComponent<GraphProps> {
  static defaultProps: Partial<GraphProps> = {
    unit: "C", //will be changed to F, if the user chooses
    title: "Average Temperature Breakdown",
  };

  private getDomain(
    unit: TempUnit,
    yDomainC: [number, number] | undefined,
    data: HourlyAvg[],
    key: "avgC" | "avgF"
  ): [number, number] {
    if (yDomainC) {
      return unit === "C" ? yDomainC : [cToF(yDomainC[0]), cToF(yDomainC[1])];
    }
    const vals = data
      .map((d) => d[key])
      .filter((v) => Number.isFinite(v)) as number[];
    if (!vals.length) return [0, 1];
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(0.3, (max - min) * 0.12);
    return [Math.floor(min - pad), Math.ceil(max + pad)];
  }

  render() {
    const { hourly, unit = "C", title, yDomainC } = this.props;
    const valueKey: "avgC" | "avgF" = unit === "C" ? "avgC" : "avgF";
    const domain = this.getDomain(unit, yDomainC, hourly, valueKey);

    // No UI yet but will go here
    return null;
  }
}
