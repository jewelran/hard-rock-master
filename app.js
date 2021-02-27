document.getElementById("lyricBtn").addEventListener("click", function () {
  const lyricFild = document.getElementById("searchInput").value;
  fetch(`https://api.lyrics.ovh/suggest/${lyricFild}`)
    .then((res) => res.json())
    .then((data) => setLyrics(data.data));
});

const setLyrics = (songs) => {
  console.log(songs);
  const songDiv = document.getElementById("display_song");
  songDiv.innerHTML = "";
  songs.map((song) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
             </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick= "getLyric('${song.artist.name}' , '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
        `;
    songDiv.appendChild(div);
  });
};

const getLyric= (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayLyric(data.lyrics))
}
const displayLyric = lyrics =>{
   const lyricContainer = document.getElementById('lyric-container');
   lyricContainer.innerText = lyrics
}
