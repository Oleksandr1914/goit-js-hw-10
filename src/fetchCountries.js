export function fetchCountries(event) {
  const inputVal = event.target.value.trim();
  return fetch(
    `https://restcountries.com/v3.1/name/${inputVal}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (inputVal.length < 1) {
      return response.json();
    } else if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
