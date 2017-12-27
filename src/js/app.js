'use strict';

//import { _Fusion } from './libs/_fusion.js';
// get id on first AJAX call then set global actor ID varible and using then() callback for second call
// cache AJAX Response look for ID
// inject ID into result DOM via "data-id" attribute
// compare cached ID with "data-id" on click
// somehow use "params" to make it easier to navigate app
// helper / wrapper 

const querySel = (elName) => {
  return document.querySelector(elName);
}

let btn = querySel('.btn'),
    search = querySel('.search-form'),
    searchEl = querySel('.search'),
    actorPosterEl = querySel('.actor-poster'),
    actorNameEl = querySel('.actor-name'),
    actorMetaEl = querySel('.actor-meta'),
    actorBioEl = querySel('.actor-bio'),
    knownFor = querySel('.known-for'),
    actorId = '',
    actorResults = document.querySelectorAll('.actor-result'),
    posterBaseURL = 'https://image.tmdb.org/t/p/original/';

// send Person search request - function

// get Person ID from request - put ID result in variable

// then take to actor page


function removeFromDOM(el) {

  if (el.firstChild) {
     while(el.firstChild) {
        el.removeChild(el.firstChild);
      }
  }
}

function insertResults(resultObj) {

  const resultContainer = querySel('.actors-result-wrap');

  removeFromDOM(resultContainer);

  resultObj.forEach((result) => {
     let resultEl = document.createElement('a'),
      resultImg = document.createElement('img');

      resultImg.src = `${posterBaseURL + result.profile_path}`;
      resultImg.classList.add('actor-poster');
      resultEl.classList.add('actor-result');
      resultEl.setAttribute('href', "#");
      resultEl.setAttribute('data-id', result.id);

      resultEl.appendChild(resultImg);
      resultContainer.appendChild(resultEl);
  });
}



search.addEventListener('submit', function (e) {
  e.preventDefault();

  let searchVal = searchEl.value,
      resultLabel = querySel('.results-info');

  resultLabel.textContent = `Results for ${searchVal}`;
  console.log(searchVal);
  searchEl.value = '';


  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const TMDB_Results = JSON.parse(xhr.response),
            TMDB_Results_Cache = TMDB_Results;
      

      insertResults(TMDB_Results.results);

      console.log(actorResults);


      actorResults.forEach((result) => {
        result.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('clicked');
        })
      });



     /*     posterBaseURL = 'https://image.tmdb.org/t/p/original/';
      actorNameEl.textContent = TMDB_Results.results[0].name;
      actorPosterEl.src = `${posterBaseURL + TMDB_Results.results[0].profile_path}`;

      TMDB_Results.results[0].known_for.map((credit) => {
        // remove previous imgs from dom

        let imgEl = document.createElement('img');
           
        
        imgEl.src =  `${posterBaseURL + credit.poster_path}`;

        imgEl.classList.add('poster');
        knownFor.appendChild(imgEl);
      }) */
      console.log(TMDB_Results.results);

    }
  };

  xhr.onerror = function (err) {
    console.log('There was an error: ' + xhr.error);
  };

  xhr.open('GET', 'https://api.themoviedb.org/3/search/person?api_key=71c13c22fd835d4e19e38ff24d5ab4fc&language=en-US&query=' + searchVal);

  xhr.send();
});