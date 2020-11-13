import './styles.css';
import './js/infoCountries';

const countries = new Countries({
  inputElem: '#search-panel__input',
  countriesView: '.countries-view',
});

countries.init();
map.init(countries.currentLatLng);
setTimeout(() => {}, 300);
setInterval(() => {
  map.update(countries.currentLatLng);
}, 750);
