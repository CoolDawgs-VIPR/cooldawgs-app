import React from "react";
import "./Temperature.css";

export interface TemperatureProps {
  currentC: number | null;
  suggestedLimitC: number | null;
  max24hC: number | null;
}

const cToF = (c: number) => (c * 9) / 5 + 32;
const fmtBoth = (c?: number | null) =>
  typeof c === "number" && Number.isFinite(c)
    ? `${c.toFixed(1)} C° / ${cToF(c).toFixed(1)} F°`
    : "XX C°/F°";

export default class Temperature extends React.PureComponent<TemperatureProps> {
  static defaultProps: Partial<TemperatureProps> = {
    currentC: null,
    suggestedLimitC: null,
    max24hC: null,
  };

  render() {
    const { currentC, suggestedLimitC, max24hC } = this.props;

    return (
      <div className="temps">
        <div className="temps-line">
          <span className="temps-label">Current Temperature: </span>
          {fmtBoth(currentC)}
        </div>
        <div className="temps-line">
          <span className="temps-label">Suggested Limit : </span>
          {fmtBoth(suggestedLimitC)}
        </div>
        <div className="temps-line">
          <span className="temps-label">24H Max: </span>
          {fmtBoth(max24hC)}
        </div>
      </div>
    );
  }
}
