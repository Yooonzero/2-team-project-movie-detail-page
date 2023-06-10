export const detailTemplate = async (movieId) => {
  //상세페이지 영화정보 data fetch
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR`
  );
  const data = await res.json();

  // 상세페이지 제작
  const detailTemplate = `
      <h2 class="title" >${data.title}</h2>
      <div>
          <img class="poster" src="https://image.tmdb.org/t/p/w500${
            data.poster_path
          }"/>
          <div>
            <div class="genres">${data.genres
              .map((genre) => `<span>${genre.name}</span>`)
              .join("")}
            </div>
            <p class="overview">줄거리 : ${data.overview}</p>
            <p class="rate">평점 : ${data.vote_average}</p>
            <p class="runtime">상영시간 : ${data.runtime}분</p> 
          </div>
      </div>
    `;
  const movieCardEl = document.querySelector("#movie-card");

  // 상세페이지 삽입
  movieCardEl.innerHTML = detailTemplate;
};
