import scroll from "./scroll.js";
import { search } from "./search.js";
import template from "./template.js";

//start input focus
const searchInputEl = document.getElementById("search-input");
window.addEventListener("load", () => {
  searchInputEl.focus();
});
let rows;
const fetchMovie = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR"
  );
  const data = await res.json();
  rows = data.results;
  console.log(rows);
  // template.js로 템플릿 제작 순회
  let temp = template(rows);

  // 배열 정리후 데이터바인딩
  let joinTemp = temp.join("");
  const nowPlayEl = document.querySelector("#now-play");
  nowPlayEl.innerHTML = joinTemp;

  // 무한스크롤 기능구현
  // 요소의 가시성관찰
  scroll();

  nowPlayEl.addEventListener("click", function (event) {
    console.log(event.target);
    console.log(event.currentTarget);
    if (event.target === event.currentTarget) return;

    if (event.target.matches(".card")) {
      alert(`영화 id: ${event.target.id}`);
      event.target.id;
      localStorage.setItem("movieId", JSON.stringify(event.target.id));
      window.location.href = "detail.html";
    } else {
      // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
      alert(`영화 id: ${event.target.parentNode.id}`);
      localStorage.setItem(
        "movieId",
        JSON.stringify(event.target.parentNode.id)
      );
      window.location.href = "detail.html";
    }

    //누를 때 local에 저장하고 detail.html로 이동
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

  // 로컬스토리지에 data 넣기
};
fetchMovie();
