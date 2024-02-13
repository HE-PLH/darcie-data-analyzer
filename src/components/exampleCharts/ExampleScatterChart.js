import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {EXAMPLE_POINT_DATA} from "../../constants/DataConstants";
import {Scatter, ScatterChart, YAxis} from "recharts";

class ExampleScatterChart extends React.Component {
    render() {
        return (
            <Paper className="example-chart-paper">
                <ScatterChart width={100}
                          height={100}
                          onClick={() => this.props.onClick()}>
                    <YAxis dataKey="y" hide={true}/>
                    <Scatter xAxidId="x" data={EXAMPLE_POINT_DATA} fill="black"/>
                </ScatterChart>
            </Paper>
        );
    }
}

export default ExampleScatterChart;
