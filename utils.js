const movieList = document.getElementById("movie-list");
let movieData = [];


export function fetchMovies(arr, isWatchlist = false) {
    movieData = [];

    arr.forEach((movie) => {
        fetch(`https://www.omdbapi.com/?apikey=1848dbd&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((data) => {

                movieData.push({
                    imdb: movie.imdbID,
                    title: data.Title,
                    rating: data.imdbRating,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    plot: data.Plot,
                    poster:
                        data.Poster !== "N/A"
                            ? data.Poster
                            : "https://via.placeholder.com/300x450?text=No+Poster",
                });

                displayMovies(movieData, isWatchlist);
            });
    });
}

export function displayMovies(arr, isWatchlist = false) {
    movieList.innerHTML = arr.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">
                <div class="title-row">
                    <h2>${movie.title}</h2>
                    <span>⭐ ${movie.rating}</span>
                </div>

                <div class="details">
                    <span>${movie.runtime}</span>
                    <span>${movie.genre}</span>
                    ${
                        isWatchlist
                        ? `<span class="remove-movie" style="cursor: pointer;" data-id="${movie.imdb}">
                            ❌ Remove
                           </span>`
                        : `<span class="add-to-watch" data-addwatch="${movie.imdb}">
                            ➕ Watchlist
                           </span>`
                    }
                </div>

                <p>${movie.plot}</p>
            </div>
        </div>
    `).join('');
}


export function addToWatchList(targetId) {
    const watchListMovies = JSON.parse(localStorage.getItem("movies")) || [];

    const exists = watchListMovies.some((movie) => movie.imdbID === targetId);

    if (!exists) {
      watchListMovies.push({ imdbID: targetId });

      localStorage.setItem("movies", JSON.stringify(watchListMovies));
    }
  }

export function rendertoWatchList() {
    const watchListMovies =
        JSON.parse(localStorage.getItem("movies")) || [];

    const emptyWatchList =
        document.getElementById("empty-watchlist");

    movieData = [];

    if (watchListMovies.length > 0) {
        movieList.style.display = "flex";
        fetchMovies(watchListMovies, true);
    } else if (emptyWatchList) {

        movieList.style.display = "none";
        emptyWatchList.style.display = "flex";
    }
}