import './App.css';
import axios from 'axios';
import React from 'react';
import Weather from './components/Weather';
import Movie from './components/Movie';

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
      disPlayMoviesError: false,
      moviesDataArray: [],
      Movies: false,
    }
  }





  getWeatherData = async (cityName) => {
    // event.preventDefault();

    // let cityName = event.target.cityName.value;
//http://localhost:3333/weather?cityName=Amman
    let WeatherURL = `https://city-lap7.herokuapp.com/weather?cityName=${cityName}`;


    try {
      let WeatherData = await axios.get(WeatherURL)
      this.setState({
        weatherArray: WeatherData.data,
        weather: true
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
    let cityName = event.target.cityName.value;
    event.preventDefault();
    this.getWeatherData(cityName)
    this.getMoviesData(cityName)
    // this.getWeatherData(cityName);
    const myKey = "pk.43fed3791d35ddb76aa14f749c6d3080";
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;

    try {
      let Data = await axios.get(URL);
      this.setState({
        lon: Data.data[0].lon,
        lat: Data.data[0].lat,
        display_name: Data.data[0].display_name,
        mapDisplay: true
    
      })
      // this.getWeatherData(Data.data[0].lat, Data.data[0].lon)
    }
    catch {
      this.setState({
        disPlayError: true
        
      })
    }

  }

  getMoviesData = async (cityName) => {
    // event.preventDefault();
    // let cityName = event.target.cityName.value;
    //http://localhost:3333/movies?cityName=angel
    let MovieURL = `https://city-lap7.herokuapp.com/movies?cityName=${cityName}`;
    try {
      let moviesData = await axios.get(MovieURL)
      console.log(moviesData);
      this.setState({
        moviesDataArray: moviesData.data,
        Movies: true
      })
      // this.getCityData(cityName);
      console.log(this.state.moviesDataArray);
    }
    catch {
      this.setState({
        disPlayMoviesError: true

      })
    }
  }


render() {

//  getMoviesData;
//   getWeatherData;

  return (

    <>

      <h1>City Location</h1>
      <form onSubmit={this.getCityData}>
        <input type='text' name='cityName' placeholder='Enter city name' />
        <button type='submit'>Location</button>
      </form>

      {this.state.mapDisplay && (<div>
        <p>City name:{this.state.display_name}</p>
        <p>Latitude:{this.state.lat}</p>
        <p>Longitude:{this.state.lon}</p>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=${1 - 18}`} alt='map' /></div>)}
      {this.state.disPlayError && <p>something Error</p>}

      {this.state.mapDisplay && (< Weather
        weather={this.state.weatherArray.map(item => {
          return (

            <>

              <p>Date: {item.date}</p>
              <p>description: {item.description}</p>

            </>);
        })} />)}

      {this.state.mapDisplay && (<Movie
        movie={this.state.moviesDataArray.map(item => {
          return (
            <>
            <img src = {item.image_url}/>
              <p>Title: {item.title}</p>
              <p>Overview: {item.overview}</p>
              <p>Average_votes: {item.average_votes}</p>
              <p>Total_votes: {item.total_votes}</p>
              <p>Popularity: {item.popularity}</p>
              <p>Released_on: {item.released_on}</p>
            </>);
        })} />)}
    </>)
}
}

export default App;


