import API from './fetchCountries';
import errorNotFound from './error';
import getRefs from './get-refs';
import markup from './markup';

const refs = getRefs();
const debounce = require('lodash.debounce');

refs.searchInput.addEventListener('input', debounce(onInput, 500));

function onInput(elem) {
  const searchQuery = elem.target.value;

  if (!searchQuery) {
    markup.clearMarkup();
    return;
  }

  API.fetchCountries(searchQuery)
    .then(markup.renderMarkup)
    .catch(data => {
      errorNotFound();
    });
}
