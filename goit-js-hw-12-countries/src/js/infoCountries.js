import fetchCountries from './fetchCountries';
import countryTemplate from '../templates/countryTemplate.hbs';
import countriesTemplate from '../templates/countriesTemplate.hbs';

import { debounce } from 'lodash';

export class Countries {
  constructor({ inputElem, countryView }) {
    this.refs = {
      input: document.querySelector(inputElem),
      view: document.querySelector(countryView),
    };
  }

  init() {
    this.refs.input.focus();
    this.requestHandler = this.requestHandler.bind(this);
    this.recievedHandler = this.recievedHandler.bind(this);

    this.debounceHandler = debounce(this.requestHandler, 500);
    this.refs.input.addEventListener('input', this.debounceHandler);
    this.refs.input.addEventListener('focus', this.debounceHandler);
  }
  requestHandler(elem) {
    if (elem.target.value === '') {
      return;
    }

    fetchCountries(elem.target.value)
      .then(this.recievedHandler)
      .catch(error => console.log(error));
  }

  recievedHandler(data) {
    if (data.status === 404) {
      this.notifyHandler(`${data.status} - ${data.message}`);
      return;
    }

    if (data.hasOwnProperty('name')) {
      this.showCountry(data);
      return;
    }

    if (data.length > 10) {
      this.notifyHandler(`Too many countries found: ${data.length}`);
      return;
    }

    if (data.length === 1) {
      this.showCountry(data[0]);
      return;
    }

    this.listOfCountries(data);
  }

  notifyHandler(
    text = 'Something is not OK',
    type = 'error',
    title = '',
    delay = 2000,
  ) {
    if (document.body.clientWidth < 400) {
      PNotify.defaults.width = '280px';
    } else if (document.body.clientWidth < 800) {
      PNotify.defaults.width = '320px';
    }
    PNotify[type]({
      title: type === 'error' ? 'Error :-(' : title,
      text,
      delay,
    });
  }

  listOfCountries(countries) {
    this.render(countriesTemplate(countries));
  }

  showCountry(country) {
    this.render(countryTemplate(country));
    this.currentCountry(country);
  }

  currentCountry(country) {
    this.currentCapital = country.capital;
    // this.currentLatLng = { lat: country.latlng[0], lng: country.latlng[1] };
  }

  render(stringHtml, delay = 250) {
    this.viewHide();
    setTimeout(() => {
      this.refs.view.innerHTML = stringHtml;
      this.viewShow();
    }, delay);
  }

  viewShow() {
    this.refs.view.classList.add('countries-view-show');
  }

  viewHide() {
    this.refs.view.classList.remove('countries-view-show');
  }

  get currentCapital() {
    return this.currentCapital;
  }

  set currentCapital(value) {
    this.currentCapital = value;
  }

  // get currentLatLng() {
  //   return this.currentLatLng;
  // }
  // set currentLatLng(value) {
  //   this.currentLatLng = { lat: value.lat, lng: value.lng };
  // }
}
