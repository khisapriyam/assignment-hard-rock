// Blocking display results
const searchResult = document.querySelector(".search-result");
searchResult.style.display = "none";

const singleLyrics = document.getElementById("single-lyrics");
singleLyrics.style.display = "none";

const searchValue = document.querySelector(".form-control");
const searchButton = document.querySelector(".search-btn");

const lyrics = document.getElementById("lyrics");
const songName = document.getElementById("Song");
const album = document.getElementById("Album");

//adding eventlistener on search button
searchButton.addEventListener("click", function () {
  console.log(searchValue.value);
  searchResult.style.display = "block";
  //fetching links for various search
  fetch(`https://api.lyrics.ovh/suggest/${searchValue.value}`) 
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 10; i++) {
        let x = document.querySelectorAll(".lyrics-name");
        let y = document.querySelectorAll(".lead span");
        let z = document.querySelectorAll(".duration span");

        console.log(data.data[i].title, data.data[i].artist.name);
        x[i].innerHTML = data.data[i].title;
        y[i].innerHTML = data.data[i].artist.name;
        z[i].innerHTML = data.data[i].duration;
  //for Lyrics
        const lyricsButton = document.querySelectorAll(".lyrics-button");
        lyricsButton[i].addEventListener("click", function () {
          console.log("clicked");
          fetch(
            `https://api.lyrics.ovh/v1/${data.data[i].artist.name}/${data.data[i].title}`
          )
            .then((response) => response.json())
            .then((dataLyrics) => {
              singleLyrics.style.display = "block";
              console.log(dataLyrics);
              songName.innerHTML = data.data[i].title;
              album.innerHTML = data.data[i].artist.name;
              lyrics.innerHTML = dataLyrics.lyrics;
            });
        });
      }
    });
});
