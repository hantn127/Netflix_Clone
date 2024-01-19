const path = window.location.search;
const params = new URLSearchParams(path);
const movieID = params.get('id');

const fetchMovieDetail = async () => {
    let movie;
    const movieBackground = document.getElementById("movie-background");
    const movieTitle = document.getElementById("movie-title");
    const movieOverview = document.getElementById("movie-overview");
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=a10ee5569194b352bcca20840b7f8a32`
    );

    movie = response.data;
    movieBackground.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    movieTitle.textContent = movie.original_title;
    movieOverview.textContent = movie.overview;
};

const fetchMovieTrailer = async () => {
    const modal = document.getElementById("modal");
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=a10ee5569194b352bcca20840b7f8a32`
    );

    const trailers = response.data.results;
    const officialTrailer = trailers.filter((trailer) => trailer.name === 'Official Trailer')[0];
    modal.innerHTML += `
    <iframe id="iframe"
    src="https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1&mute=0&loop=1&playlist=${officialTrailer.key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
    </iframe>
    `
    console.log(response.data.results);
};

const showModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = 'block';
    fetchMovieTrailer();
};

const hideModal = () => {
    const modal = document.getElementById("modal");
    const iframe = document.getElementById("iframe");
    iframe.remove();
    modal.style.display = 'none';
};

fetchMovieDetail();
