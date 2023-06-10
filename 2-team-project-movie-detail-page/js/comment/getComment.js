// 영화 id값을 입력값으로 받고 리뷰 데이터(객체의 배열)를 받아온다.
export const getComment = function (movieId) {
  const reviewData = JSON.parse(localStorage.getItem(`comment${movieId}`)); // JSON 문자열을 JavaScript 객체로 변환
  return reviewData;
};
