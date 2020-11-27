const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUi = ({ cityDets, weather }) => {
  //details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  //update the night/day icon img
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  // remove d-none class if present
  card.classList.contains('d-none') && card.classList.remove('d-none');

};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = form.city.value.trim();
  form.reset();

  forecast.updateCity(city)
    .then(data => updateUi(data))
    .catch(error => console.log(error));

    //set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(err => console.log(err));
}
