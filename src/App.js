import React, { Component } from "react";
import weatherClient from "./clients/weatherClient";
import ToggleUnit from "./components/toggleUnit.jsx";
import BasicDetails from "./components/basicDetails";
import "./App.css";

class App extends Component {
  state = {
    cityName: "",
    currentDetails: {},
    tempUnit: "metric"
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { cityName, tempUnit } = this.state;
    const { data } = await weatherClient.get(
      `${process.env.REACT_APP_API_URL}?q=${cityName}&units=${tempUnit}`
    );
    this.setState({
      currentDetails: {
        cityName: data.city.name,
        cityCountry: data.city.country,
        timeOfMeasurement: data.list[0].dt_text,
        weather: data.list[0].weather[0].main
      }
    });
    console.log(data);
  };

  handleChange = event => {
    this.setState({ cityName: event.currentTarget.value });
  };

  toggleTempUnit = () => {
    let currentTempUnit = this.state.tempUnit;
    console.log(currentTempUnit);
    let newTempUnit = currentTempUnit === "metric" ? "imperial" : "metric";
    console.log(newTempUnit);
    this.setState({ tempUnit: newTempUnit }, () => {
      console.log(this.state.tempUnit);
    });
  };

  render() {
    const { currentDetails } = this.state;
    return (
      <div className="container">
        <div className="logo">
          Weather
          <span>Searcher</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="cityName">City Name</label>
          <input
            value={this.state.cityName}
            id="cityName"
            type="text"
            onChange={this.handleChange}
          />
          <button> Search </button>
        </form>
        <BasicDetails cityDetails={currentDetails} />
        <button onClick={this.toggleTempUnit}> Toggle temperature unit </button>
        <ToggleUnit currentUnit={this.state.tempUnit} />
      </div>
    );
  }
}

export default App;
