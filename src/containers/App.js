import React from 'react';
import { connect } from 'react-redux'; // Import connect from react-redux
import Layout from '../components/Layout';
import {
    VERTICAL_BAR_CHART,
    LINE_CHART,
    SCATTER_CHART,
    PIE_CHART,
    AREA_CHART,
    HORIZONTAL_BAR_CHART
} from '../constants/ChartType';
import { setChartType } from '../actions/ChartActions';

// mapStateToProps and mapDispatchToProps functions
const mapStateToProps = (state, ownProps) => ({
    currentChartType: state.chart.present.type
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setLineChart: () => dispatch(setChartType(LINE_CHART)),
    setHorizontalBarChart: () => dispatch(setChartType(HORIZONTAL_BAR_CHART)),
    setVerticalBarChart: () => dispatch(setChartType(VERTICAL_BAR_CHART)),
    setAreaChart: () => dispatch(setChartType(AREA_CHART)),
    setScatterChart: () => dispatch(setChartType(SCATTER_CHART)),
    setPieChart: () => dispatch(setChartType(PIE_CHART))
});

// Connect Layout component with Redux store
const ConnectedLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export default ConnectedLayout;
