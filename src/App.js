import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      latitude:'',
      longitude:'',
      name:'',
      value:false,
      displayError:false
    }
  }
  
  location = async (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION}&q=${cityName}&format=json`;
    try 
    {
      let resResult = await axios.get(URL);
      this.setState({
        latitude:resResult.data[0].lat,
      longitude:resResult.data[0].lon,
        name:resResult.data[0].display_name,
        value:true
      })
    }
    catch 
    {
      this.setState({
        displayError:true
      })
    }

  }
  
  render(){
    return(
      <>
      <h1>City Location</h1>
      <form onSubmit={this.location}>
        <input type='text' name='cityName' placeholder='Enter city name'/>
        <button type='submit'>Location</button>
      </form>

      {/* render the data */}
      <p>City name : {this.state.name}</p>
      <p>latitude : {this.state.latitude}</p>
      <p>longitude : {this.state.longitude}</p>

      {this.state.value && 
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${this.state.latitude},${this.state.longitude}&zoom=[1-18]`} alt='map' />}

      {this.state.displayError && <p>Error</p>}
      

      </>
    )
  }
}

export default App;