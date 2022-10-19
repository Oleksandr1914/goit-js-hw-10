import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const getEl = x => document.querySelector(x);

getEl('#search-box').addEventListener(
  'input',
  debounce(event => {
    if (event.target.value) {
      fetchCountries(event)
        .then(response => addCountries(response))
        .catch(() =>
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
    } else {
      getEl('.country-list').innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

function addCountries(resp) {
  if (resp.length < 2) {
    getEl('.country-list').innerHTML = `
    <li>
    <div class="country-item">
    <img src=${resp[0].flags.svg} alt=${resp[0].name} width=40px height=40px>
    <h1>${resp[0].name.official}</h1>
    </div>
    <div>
    <ul>
    <li><span>capital:</span> ${resp[0].capital.join('')}</li>
    <li><span>population:</span> ${resp[0].population}</li>
    <li><span>languages:</span> ${Object.values(resp[0].languages)}</li>
    </ul>
    </div>
    </li>`;
  } else if (resp.length <= 10) {
    const arrCountries = resp
      .map(
        countri =>
          `<li class="country-item">
          <img src=${countri.flags.svg} alt=${countri.name} width=40px height=40px>
          <h1>${countri.name.official}</h1>
          </li>`
      )
      .join('');
    getEl('.country-list').innerHTML = arrCountries;
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
