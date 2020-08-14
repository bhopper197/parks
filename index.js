'use strict';

const apiKey = "U4WyQHIcDWwOuwKfhtP85529uGrLE0DKFEc9Ly9U"; 
const searchURL = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(api_key => `${encodeURIComponent(api_key)}=${encodeURIComponent(params[api_key])}`)
  return queryItems.join('&');
};

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3> 
      <p>${responseJson.data[i].description}</p>
      <a href=">${responseJson.data[i].url}">Website</a>
      </li>
      <br>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getStateParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getStateParks(searchTerm, maxResults);
  });
};

$(watchForm);