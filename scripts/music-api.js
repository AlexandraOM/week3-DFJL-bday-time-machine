const myMusicKey = config.MY_MUSIC_KEY;
const musicSection = document.querySelector(".music");
let topTracks = []; // declare topTracks array with global scope

// declare btn variable only once in this script, which must run first!
const submitBtn = document.querySelector(".submit-date");

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let xhr = new XMLHttpRequest();
  let year = document.querySelector(".input-date").value;
  let url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?f_track_release_group_first_release_date_min=${year}0101&f_track_release_group_first_release_date_max=${year}1231&s_track_rating=desc&apikey=${myMusicKey}`;

  xhr.onload = function() {
    if (xhr.status === 200) {
      let songs = JSON.parse(xhr.responseText).message.body.track_list;
      let topTracks = [];
      songs.forEach((x, i) => {
        if (i < 3) {
          let track = {
            id: x.track.track_id,
            title: x.track.track_name,
            album: x.track.album_name,
            artist: x.track.artist_name
          };
          topTracks.push(track);
        }
      });
      musicSection.innerHTML = ""; // clear music section
      injectTracks(topTracks); // populate tracks section
    } else {
      console.log("Error in fetching music. Status code is: ", xhr.status);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
});

const injectTracks = musicArray => {
  let musicHeading = document.createElement("h2");
  musicHeading.classList.add("music__heading");
  musicHeading.textContent = "Top Tracks";
  musicSection.appendChild(musicHeading);

  musicArray.forEach((x, i) => {
    let musicOutput = document.createElement("div");
    musicOutput.classList.add(`music__${i}`);

    musicOutput.appendChild(makeMusicNode("h3", x, "title"));
    musicOutput.appendChild(makeMusicNode("p", x, "album"));
    musicOutput.appendChild(makeMusicNode("p", x, "artist"));

    musicSection.appendChild(musicOutput);
  });
};

const makeMusicNode = function(el, object, key) {
  let node = document.createElement(el);
  node.classList.add(`music__${key}`);
  node.textContent = object[key];
  return node;
};
