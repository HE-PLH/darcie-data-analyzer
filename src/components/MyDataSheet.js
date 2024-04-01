import {Component} from "react";
import React from "react";
import ReactDataSheet from 'react-datasheet';
import Input from "@material-ui/core/Input/Input";
import {MdAddCircleOutline} from "react-icons/md";
import Typography from "@material-ui/core/Typography/Typography";
import {isPointValid} from "../utils/utils";

const nonDataRows = 3;

const sheetData = [
  [5, 2, 3], // Corresponds to Excel row 1, cells A1:C1
  [4, 1, 6], // Row 2, cells A2:C2
  // Add more rows as needed
];

// Function to convert Excel column letter to array index
function colLetterToIndex(col) {
  let column = 0, length = col.length;
  for (let i = 0; i < length; i++) {
    column += (col.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column - 1;
}

// Function to parse cell range, e.g., A1:B2
function parseRange(range) {
    console.log(range)
  const match = range.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
  if (!match) return null;

  const startCol = colLetterToIndex(match[1]);
  const startRow = parseInt(match[2], 10) - 1;
  const endCol = colLetterToIndex(match[3]);
  const endRow = parseInt(match[4], 10) - 1;

  return { startRow, endRow, startCol, endCol };
}


// Function to convert data to 2D array
function dataTo2DArray(data) {
    let xValues = new Set();
    let dt = [];

    // Extract unique x values
    data.forEach(set => {
        set.data.forEach(point => {
            xValues.add(+point.x); // Convert string to number and add to the set
        });
    });

    let sortedXValues = Array.from(xValues).sort((a, b) => a - b);

    // Initialize dt with empty arrays
    for (let i = 0; i < sortedXValues.length; i++) {
        dt.push([]);
    }

    // Populate dt with y values
    sortedXValues.forEach((xVal, index) => {
        data.forEach(set => {
            let found = set.data.find(point => +point.x === xVal);
            if (found) {
                dt[index].push(+found.y); // Convert string to number and add to dt
            } else {
                dt[index].push(null); // Placeholder for missing values, adjust as needed
            }
        });
    });

    return dt;
}




// Main function to parse formula
function parseExcelFormula(data, formula) {
  const sumRegex = /^SUM\(([^)]+)\)$/;
  const avgRegex = /^AVERAGE\(([^)]+)\)$/;

  console.log(dataTo2DArray(data))

  let match;

  // Handle SUM formula
  if ((match = formula.match(sumRegex))) {
    const range = parseRange(match[1]);
    if (!range) return NaN;
    let sum = 0;

    for(let i= 0;i<data.length;i++) {
        let set = data[i];

      // for (let point of set.data) {
      //   if (point.x >= range.startRow && point.x <= range.endRow &&
      //       point.y >= range.startCol && point.y <= range.endCol) {
      //     sum += parseInt(point.valid ? point.y : 0, 10);
      //   }
      // }
    }
      console.log(sum)
    return sum;
  }

  // Handle AVERAGE formula
  if ((match = formula.match(avgRegex))) {
    const range = parseRange(match[1]);
    if (!range) return NaN;
    let sum = 0;
    let count = 0;
    for (let set of data) {
      for (let point of set.data) {
        if (point.x >= range.startRow && point.x <= range.endRow &&
            point.y >= range.startCol && point.y <= range.endCol) {
          sum += parseInt(point.valid ? point.y : 0, 10);
          count++;
        }
      }
    }
    return sum / count;
  }

  return NaN;
}


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
                    let val = (value.slice(1));
                    const formula = "SUM(A1:B2)";
                    console.log(this.props.dataSets)
                    const result = parseExcelFormula(this.props.dataSets, formula);
                    console.log(result);

                    value=eval(val)

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
