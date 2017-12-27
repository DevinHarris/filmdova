"use strict";function removeFromDOM(e){if(e.firstChild)for(;e.firstChild;)e.removeChild(e.firstChild)}function insertResults(e){var t=querySel(".actors-result-wrap");removeFromDOM(t),e.forEach(function(e){var r=document.createElement("a"),o=document.createElement("img");e.profile_path&&(o.src=""+(posterBaseURL+e.profile_path)),o.classList.add("actor-poster"),r.classList.add("actor-result"),r.setAttribute("href","#"),r.setAttribute("data-actor-id",e.id),r.appendChild(o),t.appendChild(r)})}function getActorInfo(e){var t=new XMLHttpRequest,r=querySel(".actor-name"),o=(querySel(".actor-meta"),querySel(".actor-bio"));t.onload=function(){if(200===t.status){var e=JSON.parse(t.response);r.textContent=e.name+" - "+e.birthday+" - "+e.place_of_birth,o.textContent=""+e.biography,console.log(e)}else console.log("There was an error "+t.status)},t.open("GET","https://api.themoviedb.org/3/person/"+e+"?api_key=71c13c22fd835d4e19e38ff24d5ab4fc&language=en-US"),t.send()}var querySel=function(e){return document.querySelector(e)},btn=querySel(".btn"),search=querySel(".search-form"),searchEl=querySel(".search"),appWrap=querySel(".app-wrap"),welcomeMsg=querySel(".welcome-msg"),posterBaseURL="https://image.tmdb.org/t/p/original/";search.addEventListener("submit",function(e){e.preventDefault();querySel(".actor-poster"),querySel(".known-for");var t=document.querySelectorAll(".actor-result"),r=searchEl.value;querySel(".results-info").textContent="Results for "+r,console.log(r),searchEl.value="";var o=new XMLHttpRequest;o.onload=function(){if(200===o.status){var e=JSON.parse(o.response);appWrap.style.display="block",welcomeMsg.style.display="none",insertResults(e.results),console.log(t);document.querySelectorAll(".actor-result").forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),getActorInfo(e.getAttribute("data-actor-id"))})}),console.log(e.results)}},o.onerror=function(e){console.log("There was an error: "+o.error)},o.open("GET","https://api.themoviedb.org/3/search/person?api_key=71c13c22fd835d4e19e38ff24d5ab4fc&language=en-US&query="+r),o.send()});