import React, { Component } from 'react';
import './BarChart.css';


class BarChart extends Component {

    render() {
        return(
                          <div className="GraphArea--barChart" style={this.props.height}>{this.props.children}</div>
                  )}

    }

export default BarChart;
