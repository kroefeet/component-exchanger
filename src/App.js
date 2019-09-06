import React, { Component } from 'react';
import './App.css';

import BarChart from './components/BarChart/BarChart.js'
import Nav from './components/Nav/Nav.js'

class App extends Component {
    state = {
        rates: [
            {
                label: "EUR",
                value: 1,
                percentage: 1,
            },
        ],
        base: "EUR",
        compare: "USD",
        filtered: [
            {
                label:"",
                value: 1,
                percentage: 1,
            }
        ]
    };

    componentDidMount = (ev) => {
        this.onRefresh();
    }

    onRefresh = () => {
        let newBase = document.querySelector('#baseCurrency').value
        let newCompare = document.querySelector('#compareCurrency').value

        let url = 'https://api.exchangeratesapi.io/latest?base=' + newBase
        console.log(url)
        fetch(url)
          .then(response => response.json())
          .then(data => {
              const newRates = [];
              let percentage = 1;
              for (const [key, value] of Object.entries(data.rates)) {
                  percentage = (1/value) * 50;
                  newRates.push({
                      number: value,
                      label: key,
                      percentage: percentage,
                  })
              }


            this.setState({
                rates: newRates,
                base: newBase,
                compare: newCompare
            })
            console.log('this is from onRefresh')
              console.log(newRates)
              console.log(this.state)

            let filtered = this.state.rates.filter(function (el) {
                return (el.label === newCompare)
            })
            console.log(filtered)

            this.setState({
                filtered: filtered
            })


            });

        };

        render() {
          return (
            <div className="App">
              <div className="MainContent">
                    <div className="MainTitle">
                        <h1 className="MainTitle--title">The Exchanger</h1>
                        <p className="MainTitle--baseInfo">Select your base currency:</p>
                        <select className="MainTitle--baseInfo" id="baseCurrency" value={this.state.base} onChange={this.onRefresh}>
                        {this.state.rates.map(function(item) {
                            return(
                                <Nav label={item.label}>{item.label}</Nav>
                            )})}
                        </select>
                        <p className="MainTitle--baseInfo">Select your comparison currency:</p>
                        <select className="MainTitle--baseInfo" id="compareCurrency" value={this.state.compare} onChange={this.onRefresh}>
                        {this.state.rates.map(function(item) {
                            return(
                            <Nav label={item.label}>{item.label}</Nav>
                        )})}
                        </select>
                  </div>
                  <div className="GraphArea">
                    <p>1 {this.state.base} equals </p>
                  {this.state.filtered.map(function(filter) {
                      return(
                                <BarChart height={{height: filter.percentage+ "%"}}>{filter.number} {filter.label}</BarChart>

                        )})}
                  </div>
              </div>

            </div>

          );
        }
      }

export default App;
