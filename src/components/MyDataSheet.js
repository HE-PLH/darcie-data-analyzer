import {Component} from "react";
import React from "react";
import ReactDataSheet from 'react-datasheet';
import Input from "@material-ui/core/Input/Input";
import {MdAddCircleOutline} from "react-icons/md";
import Typography from "@material-ui/core/Typography/Typography";
import {isPointValid} from "../utils/utils";

const nonDataRows = 3;

class MyAddEmptyDataButton extends Component {
    render() {
        return (
        <Typography align="center" variant="display1" onClick={()=>this.props.onClick()}>
            <MdAddCircleOutline />
        </Typography>
    )};
}

class MyDataSheet extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }


    handleKeyPress (event) {
        console.log(event.key)
        if (event.key === "Enter") {
            event.preventDefault();
            console.log('ENTER')
        }
    };

    onCellsChanged(changes) {
        changes.forEach(({cell, row, col, value}) => {
            if (row === 0) {
                this.props.setLabelByIndex(value, col);
            } else if (row === 1) {
                console.log('CAN"T EDIT XY ROW');
            } else {

                console.log("changes happened")
                const setIndex = Math.floor(col / 2);
                const dataIndex = row - 3;
                const newData = this.props.dataSets[setIndex].data[dataIndex];

                // if value starts with a equal sign, it is a formula
                if (value.startsWith("=")) {
                    console.log("FORMULA")
                    console.log(eval(value.slice(1)))
                    // set the label to the result of the formula
                    value = eval(value.slice(1));

                    console.log(setIndex)
                    console.log(dataIndex)
                }

                if (col % 2) {
                    newData.y = value;
                } else {
                    newData.x = value;
                }

                newData.valid = isPointValid(newData);

                this.props.addNewDataByDataSetIndex(newData, setIndex, dataIndex);
            }
        });
    }

    generateGrid() {

        const colPointLength =  this.props.dataSets.length;
        const rowPointLength = colPointLength > 0 ? this.props.dataSets[0].data.length : 0;

        //LABEL ROW
        let grid = [
            this.props.dataSets.map( set => (
                {
                    value: set.label,
                    className: "cell-label",
                    colSpan: 2
                })),
        ];

        if( rowPointLength === 0 ) {
            grid = [[]];
        }

        //COLOR ROW
        grid.push(
            this.props.dataSets.map( set => (
                {
                    component: (<Input type="color"
                                       value={set.color}
                                       fullWidth={true}
                                       onChange={ event=>this.props.setColorByIndex(event.target.value, set.index)}/>),
                    forceComponent: true,
                    readOnly: true,
                    colSpan: 2
                })
            )
        );






        //XY ROW
        grid.push([].concat(...this.props.dataSets.map( () => (
            [
                {value: 'x', readOnly: true},
                {value: 'y', readOnly: true}
            ]
        ))));


        //DATA
        for( let row = 0 ; row < rowPointLength ; row++ ){
            let pointRow = [];

            for( let col = 0 ; col < colPointLength ; col++ ){
                const point = this.props.dataSets[col].data[row];
                pointRow.push(
                        {value: `${point.x}`, className: point.valid ? "" : "cell-invalid"},
                        {value: `${point.y}`, className: point.valid ? "" : "cell-invalid"}
                        );
            }

            grid.push(pointRow);
        }

        //ADD COLUMN BUTTON COLUMN
        grid[0].push({
            className: "cell-add-button",
            component: (<MyAddEmptyDataButton onClick={()=>this.props.addNewEmptyDataSet()}/>),
            forceComponent: true,
            readOnly: true,
            rowSpan: rowPointLength + nonDataRows
        });

        //ADD ROW BUTTON ROW
        grid.push([{
            className: "cell-add-button",
            component: (<MyAddEmptyDataButton onClick={()=>this.props.addNewEmptyDataToEverySet()} />),
            forceComponent: true,
            readOnly: true,
            colSpan: 2 * colPointLength
        }]);
        //add row with letter labels like A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let letterRow = [];
        for (let i = 0; i < rowPointLength; i++) {
            letterRow.push({value: letters[i], readOnly: true});
        }
        grid.push(letterRow);

        return grid;
    }

    render() {
        return (
            <ReactDataSheet
                data={this.generateGrid()}
                valueRenderer={(cell) => cell.value}
                onCellsChanged={changes => this.onCellsChanged(changes)}
                onKeyDown={this.handleKeyPress}
            />
        );
    };
}

export default MyDataSheet;
