import { fetchCountries } from "./fetchCountries";
import countryTemplate from '../templates/countryTemplate.hbs';

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
    let htmlString = '<ul class="countries__list">';
    for (const country of countries) {
      htmlString += `<li data-alfa3code="${country.alpha3Code}">${country.name} - ${country.nativeName} <img class="countries__flag" src="${country.flag}"></li>`;
    }
    this._render(htmlString + '</ul>');
}

showCountry(country) {
    this.render(countryTemplate(country));
    this.writeCountry(country);
}


