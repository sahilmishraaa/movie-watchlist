const apiKey = "1848dbd";
import { fetchMovies, addToWatchList } from "./utils.js";
// localStorage.clear()
let movieArr = [];
const movieList = document.getElementById("movie-list");
const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?apikey=1848dbd&s=${movieInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      movieArr = data.Search;
      if (!movieArr) {
        movieList.innerHTML = `<p>Unable to find what you are looking for.
            Please try searching again</p>`;
        return;
      }
      movieList.innerHTML = "";
      fetchMovies(movieArr);
      movieArr = [];
    });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-watch"))
    addToWatchList(e.target.dataset.addwatch);
});
