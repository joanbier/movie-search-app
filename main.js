const apiUrl = 'http://www.omdbapi.com/?';
const apiKey = 'apikey=42a0095b';


const fetchMovie = (e) => {
    e.preventDefault();

    const plot = document.querySelector('#plot').checked;
    const plotUrl = plot ? '&plot=full' : "";
    const movieTitle = document.querySelector('[name = "title"]').value;

    fetch(`${apiUrl}t=${movieTitle}&${apiKey}${plotUrl}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('This is not status 200');
            } else {
                return response.json()
            }
        })
        .then(data => movieResult(data))
        .catch(err => {
            console.log("Something went wrong :(", err);
            alert(err);
        });

    const clearInput = document.querySelector(".search-input").value = '';

}

const showInfo = (data) => {

    const resultSection = document.querySelector('.movie-result');
    const img = document.createElement('img');
    img.setAttribute('src', data.Poster);
    img.classList.add("poster-img");


    if (data.Error === "Movie not found!") {
        resultSection.innerHTML = "<h2 class='not-found'>Wrong title or movie not found :(</h2>"
        return
    }

    resultSection.innerHTML = `<div class="results-info"> 
    <h2 class = "movie-title">${data.Title}</h2>
    <p>&#11088; <b>IMDB Rate:</b> ${data.imdbRating}</p>
    <p class="plot" >&#128195; <b>Description:</b> ${data.Plot}</p>
    <p>&#127917; <b>Cast:</b> ${data.Actors}</p>
    <p>&#128227; <b>Director:</b> ${data.Director}</p>
    <p>&#127758; <b>Country:</b> ${data.Country}</p>
    <p>&#128467; <b>Year:</b> ${data.Year} </p> 
    <p>&#9201; <b>Runtime:</b> ${data.Runtime}</p> 
    <p>&#128176; <b>Boxoffice:</b> ${data.BoxOffice}</p>
    <p>&#127942; <b>Awards:</b> ${data.Awards}</p> 
    </div>`;
    const movieTitleH2 = document.querySelector(".movie-title");
    resultSection.appendChild(img);
    resultSection.insertBefore(img, resultSection.childNodes[0]);
    resultSection.insertBefore(movieTitleH2, resultSection.childNodes[0]);

}

const movieResult = (data) => {

    showInfo(data)
}

document.querySelector('.search').addEventListener('submit', fetchMovie);




function init() {
    fetch(`http://www.omdbapi.com/?t=Blade+Runner+2049&${apiKey}`)
        .then(resp => resp.json())
        .then(data => showInfo(data))
        .catch(err => console.log(err));
}

window.addEventListener('DOMContentLoaded', init);
