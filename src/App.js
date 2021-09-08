import './App.css';
import axios from 'axios';
import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      display_name: '',
      displayError: false,
      weather: false,
      disPlayWeatherError: false,
      weatherArray: [],
      mapDisplay: false,
    }
  }

  getWeatherData = async (lat,lon) => {
    let WeatherURL = `https://city-lap7.herokuapp.com/weather?lat=${lat}&lon=${lon}`;


  try {
      let WeatherData = await axios.get(WeatherURL)
        this.setState({
          weatherArray: WeatherData.data,
          weather:true
        })
        console.log(this.state.weatherArray);
    }
    catch {
      this.setState({
        disPlayWeatherError: true
      })
    }
  }

  getCityData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    // this.getWeatherData(cityName);
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION}&q=${cityName}&format=json`;

    try {
      let Data = await axios.get(URL);
      this.setState({
        lon: Data.data[0].lon,
        lat: Data.data[0].lat,
        display_name: Data.data[0].display_name,
        mapDisplay: true

      })
      this.getWeatherData(Data.data[0].lat,Data.data[0].lon)
    }
    catch {
      this.setState({
        disPlayError: true
      })
    }
  }


  render() {



    return (

        <>

        <h1>City Location</h1>
        <form onSubmit={this.getCityData}>
          <input type='text' name='cityName' placeholder='Enter city name' />
          <button type='submit'>Location</button>
        </form>
        <p>City name:{this.state.display_name}</p>
        <p>Latitude:{this.state.lat}</p>
        <p>Longitude:{this.state.lon}</p>
         {this.state.mapDisplay &&
         <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${this.state.lat},${this.state.lon}&zoom=${1-18}`} alt='map' />}
        {this.state.disPlayError && <p>something Error</p>}
        {this.state.weather && this.state.weatherArray.map(item =>{
          return(
          <>
           <p>Date: {item.date}</p>
           <p>description: {item.description}</p>
          </>

)
})}
    {this.state.disPlayWeatherError&&<p >something Error</p>}    
      </>
    );
  }
}

export default App;



