import countriesTemplate from '../templates/countriesTemplate.hbs';
import countryTemplate from '../templates/countryTemplate.hbs';
import getRefs from './get-refs';
import { notification } from './notify';

export default { renderMarkup, clearMarkup };

const refs = getRefs();

function renderMarkup(data) {
  const { length } = data;
  if (length < 2) {
    renderCountryCardMarkup(data);
    return;
  }

  if (length >= 2 && length <= 10) {
    renderCountryListMarkup(data);
    return;
  }

  if (length > 10) {
    notification(
      'error',
      'Too mahy matches found. Please enter a more specific query!',
    );
    return;
  }
}

function renderCountryListMarkup(data) {
  const markup = countriesTemplate(data);
  refs.cardContainer.innerHTML = markup;
}

function renderCountryCardMarkup(data) {
  const markup = countryTemplate(data);
  refs.cardContainer.innerHTML = markup;
}

function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}
