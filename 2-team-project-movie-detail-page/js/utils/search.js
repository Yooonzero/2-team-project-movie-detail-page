//검색함수

import template from "../template/mainTemplate.js";

export const search = async function () {
  // input value가져오기
  const searchInputEl = document.querySelector("#search-input");
  let searchValue = searchInputEl.value;
  if (searchValue === "") return alert("검색어를 작성해주세요");

  // ver.1 처음 받아온 데이터 필터형식
  // const copyRows = [...rows];
  // let filteredRows =  copyRows.filter(row => row.title.includes(searchValue))

  // ver.2 새로 api 요청해서 검색에 대한 많은 데이터 가져오기
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=1609961e6087bc908a47717d3912b94c&language=ko-KR&page=1&query=${searchValue}`
  );
  const searchDate = await res.json();
  let searchRows = searchDate.results;

  //template.js로 템플릿 제작 순회
  let temp = template(searchRows);

  //배열 정리후 데이터바인딩
  let joinTemp = temp.join("");
  const nowPlayEl = document.querySelector("#now-play");
  nowPlayEl.innerHTML = joinTemp;
};
