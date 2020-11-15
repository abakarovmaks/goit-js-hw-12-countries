import countriesTemplate from '../templates/countriesTemplate.hbs';
import countryTemplate from '../templates/countryTemplate.hbs';
import getRefs from './get-refs';

export default { renderMarkup, clearMarkup };

const refs = getRefs();

function renderMarkup(data) {
  if (data.length === 1) {
    renderCountryCardMarkup(data);
    return;
  }

  if (data.length > 1 && data.length <= 10) {
    renderCountryListMarkup(data);
    return;
  }

  if (data.length > 10) {
    clearMarkup();
    errorHandler.errorTooMany();
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
