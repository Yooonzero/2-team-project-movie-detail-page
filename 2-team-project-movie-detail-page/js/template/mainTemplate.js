export default function template(rows) {
  return rows.map((row) =>
    //포스터가 있으면 poster url 없다면 Noimg url
    row.backdrop_path
      ? `<li class="card" id=${row.id}>
                    <img src="https://image.tmdb.org/t/p/w500${
                      row.backdrop_path
                    }" />
                    <h3>${row.title}</h3>
                    <p><strong>줄거리</strong> : ${
                      //줄거리가 없다면 없습니다. 있으면 100글자 넘는지 확인 후 slice
                      !row.overview
                        ? "등록된 줄거리가 없습니다..."
                        : row.overview.length > 50
                        ? row.overview.slice(0, 50) + "..."
                        : row.overview
                    }
                    </p>
                    <p><strong>평점</strong> : ${row.vote_average} 
                    <p><strong>개봉일</strong> : ${
                      row.release_date
                        ? row.release_date
                        : "개봉예정일이 아직 등록되지 않았습니다." // 아직 제작중이라 개봉일이 없는 경우
                    }
                    </p>
                </li>`
      : `<li class="card" id=${row.id}>
                    <img src="/img/noImg.png" />
                    <h3>${row.title}</h3>
                    <p><strong>줄거리</strong> : ${
                      !row.overview
                        ? "등록된 줄거리가 없습니다..."
                        : row.overview.length > 50
                        ? row.overview.slice(0, 50) + "..."
                        : row.overview
                    }
                    </p>
                    <p><strong>평점</strong> : ${row.vote_average}
                    <p><strong>개봉일</strong> : ${
                      row.release_date
                        ? row.release_date
                        : "개봉예정일이 아직 등록되지 않았습니다."
                    }
                    </p>
                </li>`
  );
}
