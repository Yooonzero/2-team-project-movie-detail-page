import commentTemplate from "../template/commentTemplate.js";
import { getComment } from "./getComment.js";

export default function update({ e, movieId }) {
  // data 가져오기
  const data = getComment(movieId);

  // li에 심어놓은 데이터값 가져오기
  const index = e.target.parentNode.parentNode.getAttribute("data-number");

  // 비밀번호 검사
  const passwordPrompt = prompt("비밀번호를 입력해주세요");
  if (passwordPrompt !== data[index].password) {
    return alert("비밀번호가 다릅니다.");
  }

  // event 객체를 사용해 li할당
  const li = e.target.parentNode.parentNode;

  // 댓글창을 수정창으로 변경하기
  li.innerHTML = `
        <label>작성자</label>
        <input class="update-writer${index}" type="text" />
        <label>내용</label>
        <textarea class="update-contents${index}"  placeholder="리뷰내용을 입력하세요."></textarea>
        <button class="update-submit-btn${index}">수정하기</button>
      `;

  // 수정 input & button 선택자
  const updateSubmitBtn = document.querySelector(`.update-submit-btn${index}`);
  const updateWriter = document.querySelector(`.update-writer${index}`);
  const updateContents = document.querySelector(`.update-contents${index}`);

  // 수정 input value값 가져오기
  updateWriter.value = data[index].writer;
  updateContents.value = data[index].contents;
  updateWriter.focus();

  // 수정완료 button click event
  updateSubmitBtn.addEventListener("click", function () {
    // 수정할 data 객체 만들기
    data[index] = {
      ...data[index],
      writer: updateWriter.value,
      contents: updateContents.value,
    };
    // 수정
    localStorage.setItem(`comment${movieId}`, JSON.stringify(data));

    // 댓글창 최신화
    commentTemplate(data);
  });
}
