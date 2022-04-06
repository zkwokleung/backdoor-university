import React from "react";
import {useState} from "react"
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  Legend,
  YAxis,
  ResponsiveContainer,
  Surface,
  Symbols,
  Label
} from "recharts";
import _ from "lodash";
import { arr } from "./FilterOption";


class Teststats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: [],
      chartColors: {
        others: "#40ee86",
        IVE: "#67d6c0",
        SPACE: "#127197",
        HKCC: "#e96d8d"
      },
      chartData: [],
    };
  }

  handleClick = dataKey => {
    if (_.includes(this.state.disabled, dataKey)) {
      this.setState({
        disabled: this.state.disabled.filter(obj => obj !== dataKey)
      });
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  };

  renderCusomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color } = entry;
          const active = _.includes(this.state.disabled, dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </span>
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    const chartData = require("./ChartData.json");
  }

  handleClick1 = (e) => {
    if(e=="1"){
      this.state.chartData = require("./ChartData.json");
      this.setState({chartData : require("./ChartData.json")})
    }

    if(e=="2"){
      this.state.chartData = require("./ChartData2.json");
      this.setState({chartData : require("./ChartData2.json")})
    }
    if(e=="3"){
      this.state.chartData = require("./ChartData3.json");
      this.setState({chartData : require("./ChartData3.json")})
    }
    console.log(e);
  };


  componentDidMount() {
    const chartData = require("./ChartData.json");
    this.setState({ chartData: chartData });
  }
  
  render() {
    return (
      <div>
        <h1>Distribution diagram for admission GPA of non-JUPAS Programmes</h1>

        <StyledEngineProvider injectFirst>
          <Demo />
        </StyledEngineProvider>
        <ResponsiveContainer height={450} width="90%">
          <BarChart layout="vertical" data={this.state.chartData}>
            {_.toPairs(this.state.chartColors)
              .filter(pair => !_.includes(this.state.disabled, pair[0]))
              .map(pair => (
                <Bar
                  stackId="a"
                  key={pair[0]}
                  dataKey={pair[0]}
                  fill={pair[1]}
                />
              ))}
            <YAxis
              allowDuplicatedCategory = {false}
              domain={[3, 4]}
              dataKey="GPA"
              interval="preserveStartEnd"
              padding={{ top: 20, bottom: 20 }}
              tickCount={11}
              name="GPA" label={{ value: 'GPA', angle: -90, position: 'insideLeft' }}
            />
            <XAxis type="number">
              <Label value="Offered Student Number" offset={0} position="insideBottom" />
            </XAxis>
            <Legend
              verticalAlign="bottom"
              height={36}
              align="left"
              payload={_.toPairs(this.state.chartColors).map(pair => ({
                dataKey: pair[0],
                color: pair[1]
              }))}
              content={this.renderCusomizedLegend}
            />
            
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
          <button onClick = {() => this.handleClick1(arr)} >Filter</button>
        <br/>
      </div>
    );
  }
}

export default Teststats;
