import {Component} from "react";
import React from "react";
import {Line, LineChart, XAxis, YAxis} from "recharts";
import {getRenderableDataForDataSets} from "../../utils/utils";

class MyLineChart extends Component {

    getLineList() {
        return this.props.dataSets.map( (set, index) => (
            <Line name={set.label}
                  key={"LINE" + index}
                  dataKey={index}
                  stroke={set.color}
                  stackId="stack"/>
        ));
    };

    render () {
        return (
            <LineChart data={getRenderableDataForDataSets(this.props.dataSets)} {...this.props.chartParams}>
                <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']}/>
                <YAxis type="number" domain={[0, 'dataMax + 1']}/>
                {this.props.children}
                {this.getLineList()}
            </LineChart>
        );
    }


}

export default MyLineChart;
