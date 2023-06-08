import deleteComment from "./deleteComment.js";
import { detailTemplate } from "./detailTemplate.js";
import update from "./update.js";

//메인페이지에서 받아온 id값 불러오기
const movieId = JSON.parse(localStorage.getItem("movieId"));
console.log(movieId);

setTimeout(function () {
  // 바로 localStorage에서 받아오는 것이 비동기가 안되어 있기 때문에 안나오는 경우가 가끔있어서 setTimeout을 사용
  detailTemplate(movieId);
}, 100);

//input 값들 불러오기
const nameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password");
const contentsInput = document.querySelector("#contents");
const commentBtn = document.querySelector("#comment-btn");

const getReviewData = function () {
  const reviewData = JSON.parse(localStorage.getItem(`comment${movieId}`));
  return reviewData;
};
let data = getReviewData();

const getReview = function () {
  const data = getReviewData();
  if (!data) return;
  const comment = document.querySelector("#comment");
  comment.innerHTML = data
    .map((review, index) => {
      let { writer, contents } = review;
      if (!writer) writer = "이름이 없습니다.";
      if (!contents) contents = "내용이 없습니다.";
      return `<li class="review" data-number="${index}">
                <p class="comment-contents">${contents}</p>
                <p class="comment-writer">작성자: ${writer}</p>
                <div>
                  <button class="update">수정하기</button>
                  <button class="delete">삭제하기</button>
                <div>
              </li>`;
    })
    .reverse()
    .join("");
};

getReview();

const commentEl = document.querySelector("#comment");
commentEl.addEventListener("click", function (e) {
  console.log(e.target.classList.contains("update"));
  if (e.target.classList.contains("update")) {
    //update 로직
    update({ e, data, movieId });
  } else if (e.target.classList.contains("delete")) {
    //delete 로직
    deleteComment({ e, data, movieId });
  }
});

commentBtn.addEventListener("click", function () {
  if (
    nameInput.value === "" ||
    passwordInput.value === "" ||
    contentsInput.value === ""
  ) {
    return alert("내용을 입력해주세요.");
  }
  // console.log(`이름: ${nameInput.value}`);
  // console.log(`비밀번호: ${passwordInput.value}`);
  // console.log(`컨텐츠: ${contentsInput.value}`);
  let commentArr;
  let commentKey = `comment${movieId}`;
  // console.log(JSON.parse(localStorage.getItem(commentKey)))
  if (JSON.parse(localStorage.getItem(commentKey))) {
    commentArr = JSON.parse(localStorage.getItem(commentKey));
  } else {
    commentArr = [];
  }

  let commentValue = {
    writer: nameInput.value,
    password: passwordInput.value,
    contents: contentsInput.value,
  };
  commentArr.push(commentValue);
  localStorage.setItem(commentKey, JSON.stringify(commentArr));

  nameInput.value = "";
  passwordInput.value = "";
  contentsInput.value = "";
  alert("댓글이 성공적으로 작성되었습니다.");
});
