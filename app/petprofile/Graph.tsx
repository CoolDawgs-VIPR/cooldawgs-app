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

export default class Graph extends PureComponent<GraphProps> {
  static defaultProps: Partial<GraphProps> = {
    unit: "C", //will be changed to F, if the user chooses
    title: "Average Temperature Breakdown",
  };

  render() {
    // No UI yet but will go here
    return null;
  }
}
