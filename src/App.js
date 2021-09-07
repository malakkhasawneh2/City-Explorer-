import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      display_name: '',
      displayError: false,
      weatherFlag: false,
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
        })
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
    this.getWeatherData(cityName);
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION}&q=${cityName}&format=json`;

    try {
      let Data = await axios.get(URL);
      this.setState({
        lon: Data.data[0].lon,
        lat: Data.data[0].lat,
        display_name: Data.data[0].display_name,
        mapDisplay: true

      })
      this.getWeatherData(this.state.lat,this.state.lon)
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
        <form onSubmit={this.location}>
          <input type='text' name='cityName' placeholder='Enter city name' />
          <button type='submit'>Location</button>
        </form>
        <p>City name:{this.state.display_name}</p>
        <p>Latitude:{this.state.lat}</p>
        <p>Longitude:{this.state.lon}</p>
         {this.state.value &&
         <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${this.state.latitude},${this.state.longitude}&zoom=[1-18]`} alt='map' />}
        {this.state.disPlayError && <p>something Error</p>}
        {this.state.weatherFlag && this.state.weatherArray.map(item =>{
          return(
          <>
           <p>Date: {item.date}</p>
           <p>description: {item.description}</p>
          </>

)
})}
        
      </>
    );
  }
}

export default App;



//   location = async (event) => {
//           event.preventDefault();
//         const cityName = event.target.cityName.value;
//         const URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION}&q=${cityName}&format=json`;
//         const urlHerocu = `https://city-lap7.herokuapp.com/weather?city=${cityName}`
//         try {

//           let resResult = await axios.get(URL);
//         const jasonData = await axios.get(urlHerocu);
//         console.log(jasonData.data);
//         this.setState({
//           dates1: jasonData.data[0].date,
//         dates2: jasonData.data[1].date,
//         dates3: jasonData.data[2].date,
//         description1: jasonData.data[0].description,
//         description2: jasonData.data[1].description,
//         description3: jasonData.data[2].description,

//         latitude: resResult.data[0].lat,
//         longitude: resResult.data[0].lon,
//         name: resResult.data[0].display_name,
//         value: true
//       })
//     }
//         catch
//         {
//           this.setState({
//             displayError: true

//           })
//         }
//         console.log(this.state.description);

//   }

//         render() {
//     return (
//         <>
//           <h1>City Location</h1>
//           <form onSubmit={this.location}>
//             <input type='text' name='cityName' placeholder='Enter city name' />
//             <button type='submit'>Location</button>
//           </form>

//           {/* render the data */}
//           <p>City name : {this.state.name}</p>
//           <p>latitude : {this.state.latitude}</p>
//           <p>longitude : {this.state.longitude}</p>

//           {this.state.value &&
//             <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${this.state.latitude},${this.state.longitude}&zoom=[1-18]`} alt='map' />}
//           <p>{this.state.dates1}</p>
//           <p>{this.state.dates2}</p>
//           <p>{this.state.dates3}</p>

//           <p>{this.state.description1}</p>
//           <p>{this.state.description2}</p>
//           <p>{this.state.description3}</p>

//           {this.state.displayError && <p>Error</p>}


//         </>
//         )
//   }
// }

//         export default App;