import './main.css';
import { Countries } from './js/infoCountries';

const countries = new Countries({
  inputElem: '#search-panel-input',
  countryView: '.countries-view',
});

countries.init();
// map.init(countries.currentLatLng);
// setTimeout(() => {}, 300);
// setInterval(() => {
//   map.update(countries.currentLatLng);
// }, 750);
