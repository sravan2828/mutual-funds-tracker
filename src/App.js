import React, { Component } from 'react';
import './App.css';
import data from "./static/FundData";
import AddFund from "./components/AddFund";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
class App extends Component {
  state={
    funds: [],
    totalValue: 0
  }
  trackFund = (fund) => {
    const funds = [...this.state.funds, fund];
    this.setState({funds, totalValue: +this.state.totalValue + +fund.curretValue});

  }
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <AddFund data={data} trackFund={this.trackFund}/>
          <Dashboard funds={this.state.funds} totalValue={this.state.totalValue}/>
        </div>
      </div>
    );
  }
}

export default App;
