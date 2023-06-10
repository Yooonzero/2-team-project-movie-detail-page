const commentTemplate = function (data) {
  // 로컬스토리지의 데이터를 받아서 페이지에 붙인다.
  if (!data) return;
  const comment = document.querySelector("#comment");
  comment.innerHTML = data
    .map((review, index) => {
      // review는 리뷰객체, index는 data에서의 인덱스
      let { writer, contents } = review; // 구조분해할당 : 리뷰의 writer, contents 속성의 값을 변수에 할당
      if (!writer) writer = "이름이 없습니다.";
      if (!contents) contents = "내용이 없습니다."; // validation check
      return `<li class="review" data-number="${index}">
                  <p class="comment-contents">${contents}</p>
                  <p class="comment-writer">작성자: ${writer}</p>
                  <div>
                    <button class="update">수정</button>       
                    <button class="delete">삭제</button>      
                  <div>
                </li>`; // 수정 삭제 버튼에 class 속성을 넣는다.
    })
    .reverse() // 최근의 리뷰 순으로 리뷰를 정렬시키기 위해 배열순서를 뒤집는다.
    .join(""); // html 템플릿들을 문자열로 합친다.
};
export default commentTemplate;
