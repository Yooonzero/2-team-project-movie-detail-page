const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTE5ZDcyMGQ4YTM5Mzg2Njk3MjU5ZTcxNjNlZjhiYyIsInN1YiI6IjY0NzA4N2I5NzcwNzAwMDBkZjEzZGQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qsdY4rXn-7jYUf8PwRXStzlDcISDYLBTZbW2bJ_j07w',
    },
}; // TMDB에서 복사해온 코드.

// [영화 포스터를 클릭했을 때, 해당 영화의 id값을 가져오는 alert 창을 띄워주는 함수.]
function showAlert(id) {
    alert(`영화 id : ${id}`);
} /*[forEach문의 temp_html에서 들어오는 데이터(=a) 의 id 값이 showAlert 함수의 매개변수에 들어가고,
    그 값을 함수 실행시 id라는 변수로 받아, alert(`영화 id : ${id}`) 라는 로직을 실행합니다.]*/

/* 검색버튼을 클릭하면, input에 들어있는 값에 해당하는 결과를 보여주는 함수.
    forEach로 영화 데이터를 하나하나 받아오면서 input값의 문자열과 같은 영화를 ture or false로 구별합니다.*/
function findMovie() {
    fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=5e19d720d8a39386697259e7163ef8bclanguage=ko-KR&page=1',
        options
    )
        .then((response) => response.json())
        .then((data) => {
            let rows = data.results; // 들어온 data 의 results 값을 rows에 할당했고,

            // searchInput이라는 id를 가진 요소의 value값(=검색창에 입력한 문자열)을 foundMovie에 할당했고,
            let foundMovie = document.getElementById('searchInput').value;

            const arr = []; // 반복문으로 생성한 temp_html을 하나하나 담아내기 위해 배열을 생성했습니다.

            rows.forEach((a) => {
                const str = a.title; // 비교할 영화의 제목을 str 에 할당하고,
                let temp_html = `<li onclick="showAlert(${a.id})" class="movieCard" id="m-card"">
                                <img class="moviePoster_path" src="https://image.tmdb.org/t/p/w500${a.poster_path}" alt="이미지없음." />
                                <div calss="poster">
                                    <h2 class="movieTitle">${a.title}</h2>
                                    <p class="movieOverview">${a.overview}</p>
                                    <p class="movieVoteAverage">${a.vote_average}</p>
                                </div>
                            </li>`;
                result = str.toLowerCase().includes(foundMovie) ? str : '해당하는 영화가 없습니다.';
                // includes를 써서 str이 ()의 내용을 포함한다면 str 값을 출력한다.
                // toLowerCase 를 사용하면, input 에 입력한 글자를 대소문자 관계없이 전부 소문자로 출력을 해줍니다.
                if (result === str) {
                    arr.push(temp_html); // 문자열에 해당하는 영화가 있다는 소리니까, 만들어놓은 arr배열에 push
                }
            });
            // 생성된 문자열의 길이가 0(= 데이터가 없다)면 alert을 띄우고 창을 새로고침 해주어라.
            if (arr.length === 0) {
                alert('해당하는 영화가 없습니다.');
                window.location.relord();
            }
            document.querySelector('#m-box').innerHTML = arr.join('');
            // 함수의 로직이 끝나면, m-box라는 요소에 문자열로 이루어진 arr의 값을 문자열로 배열시켜서 생성한다.
        });
}

fetch(
    'https://api.themoviedb.org/3/movie/top_rated?api_key=5e19d720d8a39386697259e7163ef8bclanguage=ko-KR&page=1',
    options
)
    .then((response) => response.json())
    .then((data) => {
        let rows = data.results;
        const arr = []; // forEach를 돌고 나온 데이터의 값을 받아줄 배열을 하나 만들어주고,
        rows.forEach((a) => {
            let temp_html = `<li onclick="showAlert(${a.id})" class="movieCard" id="m-card"">
                                <img class="moviePoster_path" src="https://image.tmdb.org/t/p/w500${a.poster_path}" alt="이미지없음." />
                                <div calss="poster">
                                    <h2 class="movieTitle">${a.title}</h2>
                                    <p class="movieOverview">${a.overview}</p>
                                    <p class="movieVoteAverage">${a.vote_average}</p>
                                </div>
                            </li>`;

            // console.log(temp_html);  // 내가 원하는 데이터만 출력이 되는지 확인하는 콘솔
            /*document.querySelector('#m-box').innerHTML = temp_html; // 오류* id가 m-box인 요소에 temp_html을 넣는것까지는 성공했으나,
              forEach 문 안에 있다보니, 1부터 20까지의 영화중에 마지막 20 번째 영화만 브라우저에 출력됨. */
            arr.push(temp_html); // 배열에 1번째,2번째 ... 20번째 돌고나온 temp_html의 값을 넣어주고
        });
        document.querySelector('#m-box').innerHTML = arr.join('');
        // forEach의 로직이 끝나면, m-box라는 요소에 문자열로 이루어진 arr의 값을 문자열로 배열시켜서 생성한다.
    })
    .catch((err) => console.error(err));
