
class Forecast {
  constructor() {
    this.key = 'k80mEG7GD69tC70H6NGZ1NGww6GbACaO';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    return {
      cityDets: cityDets,
      weather: weather
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURI + query);
    if(response.status !== 200) {
      throw new Error('cannot fetch the data, check the endpoint address :-)');
    }
    const data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query);
    if(response.status !== 200) {
      throw new Error('cannot fetch the data, check the endpoint address :-)');
    }
    const data = await response.json();
    return data[0];
  }
}




