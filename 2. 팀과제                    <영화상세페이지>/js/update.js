export default function update({ e, data, movieId }) {
  const index = e.target.parentNode.parentNode.getAttribute("data-number");
  const passwordPrompt = prompt("비밀번호를 입력해주세요");
  if (passwordPrompt !== data[index].password) {
    return alert("비밀번호가 다릅니다.");
  }
  const li = e.target.parentNode.parentNode;
  li.innerHTML = `
        <input class="update-writer${index}" type="text" />
        <textarea class="update-contents${index}"  placeholder="리뷰내용을 입력하세요."></textarea>
        <button class="update-submit-btn${index}">수정제출하기</button>
      `;
  const updateSubmitBtn = document.querySelector(`.update-submit-btn${index}`);
  const updateWriter = document.querySelector(`.update-writer${index}`);
  const updateContents = document.querySelector(`.update-contents${index}`);
  updateWriter.value = data[index].writer;
  updateContents.value = data[index].contents;
  updateWriter.focus();
  updateSubmitBtn.addEventListener("click", function () {
    console.log(updateWriter.value);
    console.log(updateContents.value);
    console.log(data);
    data[index] = {
      ...data[index],
      writer: updateWriter.value,
      contents: updateContents.value,
    };
    localStorage.setItem(`comment${movieId}`, JSON.stringify(data));
    window.location.reload();
  });
}
