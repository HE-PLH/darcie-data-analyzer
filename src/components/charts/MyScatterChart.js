import {Component} from "react";
import React from "react";
import {Cell, LabelList, Scatter, ScatterChart, XAxis, YAxis} from "recharts";
import {getRenderableDataForSet} from "../../utils/utils";



class MyScatterChart extends Component {

    getScatterList() {
        return this.props.dataSets.map( (set, index) => {
            const data = getRenderableDataForSet(set);

            return (
                <Scatter name={set.label}
                         key={"SCATTER" + index}
                         data={data}
                         fill={set.color}>
                    <LabelList className="arrow-pointer-container" dataKey="label" position="top" />
                    {
                        data.map((point, pointIndex) => {
                            return <Cell key={`CELL ${pointIndex}`}
                                         onClick={() => this.props.initLabelChange(point, index, pointIndex)}/>
                        })
                    }
                </Scatter>
            );
        });
    };

    render () {
        return (
            <div>
                <ScatterChart {...this.props.chartParams} >
                    <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']}/>
                    <YAxis type="number" dataKey="y"  domain={[0, 'dataMax + 1']}/>
                    {this.props.children}
                    {this.getScatterList()}
                </ScatterChart>
            </div>
        );
    }


}

export default MyScatterChart;
