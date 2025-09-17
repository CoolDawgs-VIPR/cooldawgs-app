import React from "react";

/** in case we want icons for this one, import line for those:
 * import { Thermometer, Gauge } from "lucide-react";
 * */

export type TempUnit = "C" | "F";

export interface TemperatureProps {
  /** temperature in Celsius */
  currentC: number | null;

  /** limit in Celsius */
  suggestedLimitC: number | null;

  /** 24h max in Celsius */
  max24hC: number | null;
}

export default class Temperature extends React.PureComponent<TemperatureProps> {
  static defaultProps: Partial<TemperatureProps> = {
    currentC: null,
    suggestedLimitC: null,
    max24hC: null,
  };

  render() {
    const { currentC, suggestedLimitC, max24hC } = this.props;
    //build UI here later
    //while no UI, returning null
    return null;
  }
}

/** in case we rather extracting only C */
function cToF(c: number) {
  return (c * 9) / 5 + 32;
}

/** returning both */
function fmtBoth(c: number) {
  if (!isFinite(c)) return "—";
  return `${c.toFixed(1)} °C / ${cToF(c).toFixed(1)} °F`;
}
