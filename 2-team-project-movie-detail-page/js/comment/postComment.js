import commentTemplate from "../template/commentTemplate.js";

export default function postComment() {
  const nameInput = document.querySelector("#name");
  const passwordInput = document.querySelector("#password");
  const contentsInput = document.querySelector("#contents");
  // 해당페이지 id값 가져오기
  const movieId = JSON.parse(localStorage.getItem("movieId"));

  // input value 비어있으면 함수종료 후 경고창
  if (
    nameInput.value === "" ||
    passwordInput.value === "" ||
    contentsInput.value === ""
  ) {
    return alert("내용을 입력해주세요.");
  }

  let data;
  // 해당 영화 localStorage 키값
  let commentKey = `comment${movieId}`;
  // console.log(JSON.parse(localStorage.getItem(commentKey)))
  if (JSON.parse(localStorage.getItem(commentKey))) {
    //기존에 data가 있다면 data에 할당
    data = JSON.parse(localStorage.getItem(commentKey));
  } else {
    //기존에 data가 없다면 빈배열 생성
    data = [];
  }

  // data에 넣을 객체 생성
  let commentValue = {
    writer: nameInput.value,
    password: passwordInput.value,
    contents: contentsInput.value,
  };
  // data 삽입
  data.push(commentValue);
  localStorage.setItem(commentKey, JSON.stringify(data));

  // input value 초기화
  nameInput.value = "";
  passwordInput.value = "";
  contentsInput.value = "";

  // 댓글 창 최신화
  commentTemplate(data);
}
