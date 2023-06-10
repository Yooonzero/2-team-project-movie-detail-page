import movieMap from "./utils/map.js";
import scroll from "./utils/scroll.js";
import { search } from "./utils/search.js";
import template from "./template/mainTemplate.js";

//start input focus
const searchInputEl = document.getElementById("search-input");
window.addEventListener("load", () => {
  searchInputEl.focus();
});

//좌표값 가져오기
navigator.geolocation.getCurrentPosition((pos) => {
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  //kakao api 실행함수 내 근처 영화관!!
  movieMap({ latitude, longitude });
});

const fetchMovie = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR"
  );
  const data = await res.json();
  let rows = data.results;
  // template.js로 템플릿 제작 순회
  let temp = template(rows);

  // 배열 정리후 데이터바인딩
  let joinTemp = temp.join("");
  const nowPlayEl = document.querySelector("#now-play");
  nowPlayEl.innerHTML = joinTemp;

  // 무한스크롤 기능구현
  // 요소의 가시성관찰
  scroll();

  //누를 때 localStorage에 id값 저장하고 detail.html로 이동
  nowPlayEl.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) return;
    if (event.target.matches(".card")) {
      event.target.id;
      localStorage.setItem("movieId", JSON.stringify(event.target.id));
      window.location.href = "detail.html";
    } else {
      // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
      localStorage.setItem(
        "movieId",
        JSON.stringify(event.target.parentNode.id)
      );
      window.location.href = "detail.html";
    }
  });

  //검색함수
  //검색버튼 선택자
  const searchBtnEl = document.getElementById("search-btn");

  //검색 버튼 클릭이벤트
  searchBtnEl.addEventListener("click", search);

  //검색 엔터키 이벤트
  searchInputEl.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) search();
  });
};

fetchMovie();
