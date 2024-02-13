import React from "react";
import {Line, LineChart} from "recharts";
import {EXAMPLE_POINT_DATA} from "../../constants/DataConstants";
import Paper from "@material-ui/core/Paper/Paper";

class ExampleLineChart extends React.Component {

    render() {
        return (
            <Paper className="example-chart-paper">
                <LineChart width={100}
                           height={100}
                           data={EXAMPLE_POINT_DATA}
                           onClick={() => this.props.onClick()}>
                    <Line name="x" dataKey="y" stroke="black" fill="black"/>
                </LineChart>
            </Paper>
        );
    }
}

export default ExampleLineChart;
