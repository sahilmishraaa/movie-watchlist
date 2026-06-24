import { rendertoWatchList } from "./utils.js";

rendertoWatchList();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-movie")) {

        let movies =
            JSON.parse(localStorage.getItem("movies")) || [];

        movies = movies.filter(
            movie => movie.imdbID !== e.target.dataset.id
        );

        localStorage.setItem("movies", JSON.stringify(movies));

        rendertoWatchList();
    }
});