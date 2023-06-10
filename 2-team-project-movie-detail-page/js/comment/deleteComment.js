import commentTemplate from "../template/commentTemplate.js";
// import 모듈을 통해 ../template/commentTemplate.js의 commentTemplate함수를 불러온다.
import { getComment } from "./getComment.js";
// import 모듈을 통해 ./getComment.js의 getComment 함수를 불러왔다.

// delete 로직
// export 모듈을 통해 deleteComment 함수를 외부 파일로 공개. / detail.js 로부터 addEventListener의 e와, movieId를 받아온다.
export default function deleteComment({ e, movieId }) {
  const data = getComment(movieId); // localStorage에 저장되어있는 데이터를 가져와 data라는 변수에 할당.
  // getAttribute로 앞의 e.target 으로 선택한 li태그의 속성중 하나인 "data-number"의 값을 가져와 index 라는 변수에 할당.
  const index = e.target.parentNode.parentNode.getAttribute("data-number");
  // 비밀번호를 입력해주세요 라는 창을 띄워주는 prompt를 변수에 할당.
  const passwordPrompt = prompt("비밀번호를 입력해주세요");
  // 해당 변수에 입력한 속성값이 localStorage의 index의 데이터의 password와 틀린것이 참이면,
  if (passwordPrompt !== data[index].password) {
    return alert("비밀번호가 다릅니다."); // alert을 띄우고,
  }
  // 삭제요청을 다시 한 번 확인하는 로직.
  const result = confirm("정말 삭제하시겠습니까?");
  if (!result) {
    return;
  }
  // 영화 상세페이지에서, 삭제버튼이 눌린 li에 있는 내요을 삭제하는 로직.
  const deletedData = data.toSpliced(index, 1); // 삭제된 배열을 deleteData 변수에 할당.
  const deletedArr = JSON.stringify([...deletedData]); // spread operator로 배열안에 퍼트려준 삭제후데이터를 문자열로 변환해 새로운 변수에 할당.
  localStorage.setItem(`comment${movieId}`, deletedArr); // 키값 : 해당영화의 movieId, 데이터 : 삭제후데이터를 "문자열"로 할당해준 배열
  commentTemplate(deletedData); // localStorage에 변경된 데이터 저장 후, 상세페이지 댓글 div에 변경된 댓글들을 띄워주는 코드.
}
