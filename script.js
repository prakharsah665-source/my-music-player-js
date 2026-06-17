console.log("SCRIPT LOADED");
document.addEventListener("DOMContentLoaded", () => {

console.log("Welcome to Spotify");

// Variables
let songIndex = 0;

const audioElement = document.getElementById("audioElement");
const masterPlayButton = document.getElementById("masterPlayButton");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const songItems = Array.from(document.getElementsByClassName("songItem"));
const songItemPlayButtons = Array.from(
  document.getElementsByClassName("songItemPlay")
);

console.log("masterPlay:", masterPlay);
console.log("masterPlayButton:", masterPlayButton);
console.log("progressBar:", myProgressBar);
console.log("audioElement:", audioElement);

audioElement.volume = 1;
audioElement.muted = false;

const songs = [
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" },
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" },
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" },
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" },
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" },
  { songName: "Sanju", filePath: "./Sanju1.mp3", coverPath: "sanju.jpg" }
];

songItems.forEach((songItem, index) => {
  const image = songItem.getElementsByTagName("img")[0];
  const songName = songItem.getElementsByTagName("span")[0];

  image.src = songs[index].coverPath;
  songName.innerText = songs[index].songName;
});

const resetSongButtons = () => {
  songItemPlayButtons.forEach((button) => {
    button.classList.remove("fa-circle-pause");
    button.classList.add("fa-circle-play");
  });
};

const updateMasterPlayIcon = (isPlaying) => {
  masterPlay.classList.toggle("fa-circle-play", !isPlaying);
  masterPlay.classList.toggle("fa-circle-pause", isPlaying);
};

const playSong = () => {
  if (audioElement.getAttribute("src") !== songs[songIndex].filePath) {
    audioElement.src = songs[songIndex].filePath;
  }

  console.log("TRYING TO PLAY:", audioElement.src);

  audioElement.play()
    .then(() => {
      updateMasterPlayIcon(true);
      resetSongButtons();
      songItemPlayButtons[songIndex].classList.remove("fa-circle-play");
      songItemPlayButtons[songIndex].classList.add("fa-circle-pause");
      console.log("PLAYING SUCCESS");
    })
    .catch((err) => {
      updateMasterPlayIcon(false);
      resetSongButtons();
      console.log("PLAY ERROR:", err);
    });
};

// Play / Pause
 masterPlayButton.addEventListener("click", () => {

  console.log("BUTTON CLICKED");

  if (audioElement.paused || audioElement.currentTime <= 0) {

    playSong();

  } else {

    audioElement.pause();
    updateMasterPlayIcon(false);
    resetSongButtons();
  }
});

songItemPlayButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const clickedIndex = Number(event.target.id);

    playClickedSong(clickedIndex);
  });
});

songItems.forEach((songItem, index) => {
  songItem.addEventListener("click", () => {
    console.log("SONG ROW CLICKED:", index);
    playClickedSong(index);
  });
});

const playClickedSong = (clickedIndex) => {
  console.log("PLAY CLICKED SONG:", clickedIndex);

  if (songIndex === clickedIndex && !audioElement.paused) {
    audioElement.pause();
    updateMasterPlayIcon(false);
    resetSongButtons();
    return;
  }

  songIndex = clickedIndex;
  audioElement.currentTime = 0;
  playSong();
};

// Progress bar update
audioElement.addEventListener("timeupdate", () => {


  if (!isNaN(audioElement.duration)) {

    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );

    myProgressBar.value = progress || 0;

    myProgressBar.style.background =
      `linear-gradient(to right, #4caf50 ${progress}%, #d3d3d3 ${progress}%)`;
  }
});

// Seek song
myProgressBar.addEventListener("input", () => {
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
  }
});

audioElement.addEventListener("ended", () => {
  updateMasterPlayIcon(false);
  resetSongButtons();
  myProgressBar.value = 0;
});

audioElement.addEventListener("error", () => {
  console.log("AUDIO LOAD ERROR:", audioElement.error);
});

audioElement.addEventListener("loadedmetadata", () => {
  console.log("AUDIO READY. Duration:", audioElement.duration);
});

});
