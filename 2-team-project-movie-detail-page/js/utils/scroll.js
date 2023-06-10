import template from "../template/mainTemplate.js";
//무한스크롤
export default function scroll() {
  let LastLi = document.querySelector("#now-play li:last-child");
  let pageCount = 1;
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        pageCount++;
        const ioFetch = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=1609961e6087bc908a47717d3912b94c&page=${pageCount}&language=ko-KR`
          );
          const data = await res.json();

          let rows = data.results;

          // template.js로 템플릿 제작 순회
          let temp = template(rows);

          // 배열 정리후 데이터바인딩
          let joinTemp = temp.join("");
          const nowPlayEl = document.querySelector("#now-play");
          nowPlayEl.insertAdjacentHTML("beforeend", joinTemp);

          // 기존에 사용한 마지막 li 관찰 종료
          io.unobserve(LastLi);

          // 템플릿 추가후 바뀐 마지막 li 재할당
          LastLi = document.querySelector("#now-play li:last-child");
          console.log(LastLi);

          // 새로운 마지막 li에 가시성관찰
          io.observe(LastLi);
        };
        // 무한스크롤 패칭
        ioFetch();
      }
    });
  });
  io.observe(LastLi);
}
