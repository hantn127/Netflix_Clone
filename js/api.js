const fetchMovies = async () => {
  // promise
  // await: đợi tới khi cái promise trả về kết quả
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?api_key=a10ee5569194b352bcca20840b7f8a32&with_networks=213"
  );
  const movies = response.data.results;

  // movies -> items
  const items = movies.map((movie) => {
    return `
      <div class="item">
        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="" />
      </div>`;
  });

  const singleCarousel = document.getElementById("single-carousel");
  singleCarousel.innerHTML = items.join("");

};

// const convertToItem = (movie) => {
//     //ES6
//     //Template String
//     return `
//         <div class="item">
//             <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="">
//         </div>`;
// };

// function tạo ra 1 movie-row
const fetchMoviesRow = async (api, title, isPoster) => {
  const response = await axios.get(api);
  const movies = response.data.results;
  console.log(movies);

  const body = document.getElementById("body");
  body.innerHTML += `    
  <div class="movie-row">
    <div class="movie-row__title">
      <h3>${title}</h3>
    </div>
  
    <div class="movie-row__items">
      <div class="responsive-carousel">
      
      ${movies.map(movie => {
          return `
          <a class="item" href="./movie.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/original/${isPoster ? movie.poster_path : movie.backdrop_path}" alt="" />
          </a>`;       
      })}

      </div>
    </div>
  </div>`;

};

const fetch = async () => {
  await fetchMovies();
  await fetchMoviesRow(
    "https://api.themoviedb.org/3/trending/all/week?api_key=a10ee5569194b352bcca20840b7f8a32&language=en-US",
    "Trending Now",
    true
  );

  await fetchMoviesRow(
    "https://api.themoviedb.org/3/discover/movie?api_key=a10ee5569194b352bcca20840b7f8a32&with_genres=35",
    "Comedy"
  );

  await fetchMoviesRow(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a10ee5569194b352bcca20840b7f8a32&language=en-US",
    "Top Rated"
  );

  // tất cả api đã xong

  initCarousel();
};

fetch();