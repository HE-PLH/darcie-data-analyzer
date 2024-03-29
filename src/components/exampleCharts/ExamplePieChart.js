import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {EXAMPLE_BAR_DATA} from "../../constants/DataConstants";
import {Pie, PieChart} from "recharts";

class ExamplePieChart extends React.Component {
    render() {
        return (
            <Paper className="example-chart-paper">
                <PieChart width={100}
                          height={100}
                          onClick={() => this.props.onClick()}>
                    <Pie data={EXAMPLE_BAR_DATA} nameKey="x" dataKey="y" fill="black"/>
                </PieChart>
            </Paper>
        );
    }
}

export default ExamplePieChart;
