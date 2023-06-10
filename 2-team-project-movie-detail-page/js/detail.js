import deleteComment from "./comment/deleteComment.js";
import { detailTemplate } from "./template/detailTemplate.js";

import update from "./comment/updateComment.js";
import commentTemplate from "./template/commentTemplate.js";
import { getComment } from "./comment/getComment.js";
import postComment from "./comment/postComment.js";

//메인페이지에서 받아온 id값 불러오기
const movieId = JSON.parse(localStorage.getItem("movieId"));

setTimeout(function () {
  // 바로 localStorage에서 받아오는 것이 비동기가 안되어 있기 때문에 안나오는 경우가 가끔있어서 setTimeout을 사용
  detailTemplate(movieId);
}, 100);

// data값 가져오기
const data = getComment(movieId);

// 초기 댓글가져오기
commentTemplate(data);

const commentEl = document.querySelector("#comment");
commentEl.addEventListener("click", function (e) {
  console.log(e.target.classList.contains("update"));
  if (e.target.classList.contains("update")) {
    //update 로직 updateCommnet.js
    update({ e, movieId });
  } else if (e.target.classList.contains("delete")) {
    //delete 로직 deleteCommnet.js
    deleteComment({ e, movieId });
  }
});

// 댓글 POST 클릭이벤트 postCommnet.js
const commentBtn = document.querySelector("#comment-btn");
commentBtn.addEventListener("click", postComment);
