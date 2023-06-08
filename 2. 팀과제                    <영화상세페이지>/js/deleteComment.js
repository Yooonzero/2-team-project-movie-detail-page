export default function deleteComment({ e, data, movieId }) {
  const index = e.target.parentNode.parentNode.getAttribute("data-number");
  const deletedData = data.toSpliced(index, 1);
  const deletedArr = JSON.stringify([...deletedData]);
  localStorage.setItem(`comment${movieId}`, deletedArr);
  window.location.reload();
}
