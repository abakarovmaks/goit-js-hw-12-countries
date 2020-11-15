import { error } from '@pnotify/core';
export default { errorTooMany, errorNotFound };

function errorTooMany() {
  error({
    title: 'What country did you mean?',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}

function errorNotFound() {
  error({
    title: 'Oops!',
    text: 'This is not a real country. Please try again with another query!',
    delay: 1000,
  });
}
