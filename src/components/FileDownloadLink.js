import React, {Component} from "react";
import {cellSeparator, rowSeparator} from "../constants/CsvSeparators";
import Button from "@material-ui/core/Button";

class FileDownloadLink extends Component {

    encodeCSV() {

        let data = [];
        let line = [];
        this.props.dataSets.forEach(() => {
            line.push('x');
            line.push('y')
        });

        line.join(cellSeparator);
        data.push(line);
        data.push(rowSeparator);

        let counter = 0;
        let all_rows = {};

        this.props.dataSets.forEach((dataset) => {

            let row = [];
            counter = 0;
            dataset.data.forEach((cell) => {
                if (all_rows[counter] === undefined) {
                    all_rows[counter] = [];
                }
                all_rows[counter].push(cell.x);
                all_rows[counter].push(cell.y);

                counter++;
            });


        });
        for (let key in all_rows) {
            data.push(all_rows[key].join(cellSeparator));
            data.push(rowSeparator);
        }

        let properties = {type: 'text/plain'};
        let file;
        try {
            file = new File(data, "csv_download.csv", properties);
        } catch (e) {
            file = new Blob(data, properties);
        }
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <a href={this.encodeCSV()} download="csv_file.csv"><Button variant="contained" color="default">Export Data</Button></a>
        );
    }
}

export default FileDownloadLink;
