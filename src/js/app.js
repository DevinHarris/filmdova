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
    appWrap = querySel('.app-wrap'),
    welcomeMsg = querySel('.welcome-msg'),
    posterBaseURL = 'https://image.tmdb.org/t/p/original/';

// send Person search request - function

// get Person ID from request - put ID result in variable

// then take to actor page


function clearFromDOM(el) {

  if (el.firstChild) {
     while(el.firstChild) {
        el.removeChild(el.firstChild);
      }
  }
}

function insertResults(resultObj) {

  const resultContainer = querySel('.actors-result-wrap');

  clearFromDOM(resultContainer);

  if (resultObj.length === 0) resultContainer.textContent = 'Sorry, nothing found.';

  resultObj.forEach((result) => {
     let resultEl = document.createElement('a'),
      resultImg = document.createElement('img');
      
      // checking if a profile image exist, if not it's ignored
      if (result.profile_path) resultImg.src = `${posterBaseURL + result.profile_path}`;
      resultImg.classList.add('actor-poster');
      resultEl.classList.add('actor-result');
      resultEl.setAttribute('href', "#");
      resultEl.setAttribute('data-actor-id', result.id);

      resultEl.appendChild(resultImg);
      resultContainer.appendChild(resultEl);
  });
}

function getActorInfo(actorId) {
  const xhr = new XMLHttpRequest(),
      actorNameEl = querySel('.actor-name'),
      actorMetaEl = querySel('.actor-meta'),
      actorBioEl = querySel('.actor-bio');



  xhr.onload = function() {
    if (xhr.status === 200) {
      const actorInfo = JSON.parse(xhr.response);


      //clearFromDOM(querySel('.actor-info'));
      
      actorNameEl.textContent = `${actorInfo.name} - ${actorInfo.birthday} - ${actorInfo.place_of_birth}`;
      actorBioEl.textContent = `${actorInfo.biography}`;


      console.log(actorInfo);

    } else {
      console.log(`There was an error ${xhr.status}`);
    }
  }

  xhr.open('GET', `https://api.themoviedb.org/3/person/${actorId}?api_key=71c13c22fd835d4e19e38ff24d5ab4fc&language=en-US`);
  xhr.send();
}

function getActorCredits(actorId) {
  const xhr = new XMLHttpRequest(),
        creditsEl = querySel('.credits-wrap'),
        creditMetaEl = querySel('.credit-meta');

  xhr.onload = function() {
    if (xhr.status === 200) {
      const creditRes = JSON.parse(xhr.response);

      clearFromDOM(creditsEl);

      creditMetaEl.textContent = `Has been in ${creditRes.cast.length} movies and / or TV shows.`;

      creditRes.cast.forEach((credit) => {
            let creditEl = document.createElement('a'),
                creditImg = document.createElement('img');
          
          // checking if a profile image exist, if not it's ignored
          if (credit.poster_path) creditImg.src = `https://image.tmdb.org/t/p/w185/${credit.poster_path}`;
          creditImg.classList.add('credit-poster');
          creditEl.setAttribute('href', "#");
          creditEl.setAttribute('data-credit-id', credit.id);

          creditEl.appendChild(creditImg);
          creditsEl.appendChild(creditEl);
        });

      console.log(JSON.parse(xhr.response));
      

    } else {
      console.log(`There was an error ${xhr.status}`);
    }
  }

  xhr.open('GET', `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=71c13c22fd835d4e19e38ff24d5ab4fc&language=en-US`)

  xhr.send();
}


search.addEventListener('submit', function (e) {
  e.preventDefault();

  // dom nodes

   const actorPosterEl = querySel('.actor-poster'),
          knownFor = querySel('.known-for'),
          actorResults = document.querySelectorAll('.actor-result');

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

      appWrap.style.display = 'block';
      welcomeMsg.style.display = 'none';

      insertResults(TMDB_Results.results);

      console.log(actorResults);

       const fullResultEl = document.querySelectorAll('.actor-result');

      fullResultEl.forEach((result) => {
        result.addEventListener('click', (e) => {
          e.preventDefault();
          getActorInfo(result.getAttribute('data-actor-id'));
          getActorCredits(result.getAttribute('data-actor-id'));
        })
      })


      /*actorResults.forEach((result) => {
        result.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('clicked');
        })
      }); */



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