const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");

let allMusic = [
    {
        name: "Aaj Din Chadheya",
        artist: "Rahat Fateh Ali Khan",
        img: "images/aaj din chadheya.jpg",
        src: "songs/aaj din chadheya.mp3"
    },
    {
        name: "Apa Fer Milangey",
        artist: "Savi Kahlon",
        img: "images/apa fir milangey.jpg",
        src: "songs/apa fer milange.mp3"
    },
    {
        name: "Kinna Sona",
        artist: "Mithoon",
        img: "images/kinna sona.jpg",
        src: "songs/kinna sona.mp3"
    },
    {
        name: "Maana Ke Hum Yaar Nahin",
        artist: "Parineeti Chopra",
        img: "images/maana ke hum yaar nahi.jpg",
        src: "songs/maana ke hum yaar nahi.mp3"
    },
    {
        name: "Keejo Kesari Ke Laal",
        artist: "Lakhbir Singh Lakha",
        img: "images/keejo kesari ke laal.jpg",
        src: "songs/keejo kesari ke laal.mp3"
    }
];

let musicIndex = Math.floor(Math.random() * allMusic.length);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(index) {
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = allMusic[index].img;
    mainAudio.src = allMusic[index].src;
}

function playMusic() {
    wrapper.classList.add("paused");
    musicImg.classList.add('img-area');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    musicImg.classList.remove('img-area');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = allMusic.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    if (musicIndex >= allMusic.length) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    isMusicPaused ? playMusic() : pauseMusic();
    isMusicPaused = !isMusicPaused;
});

prevBtn.addEventListener("click", prevMusic);

nextBtn.addEventListener("click", nextMusic);

mainAudio.addEventListener("timeupdate", () => {
    const currentTime = mainAudio.currentTime;
    const duration = mainAudio.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = progressWidth + "%";

    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
        totalSec = "0" + totalSec;
    }
    musicDuration.innerText = totalMin + ":" + totalSec;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = "0" + currentSec;
    }
    musicCurrentTime.innerText = currentMin + ":" + currentSec;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickOffsetX / progressWidth) * songDuration;
    playMusic();
});

mainAudio.addEventListener("loadeddata", () => {
    let totalMin = Math.floor(mainAudio.duration / 60);
    let totalSec = Math.floor(mainAudio.duration % 60);
    if (totalSec < 10) {
        totalSec = "0" + totalSec;
    }
    musicDuration.innerText = totalMin + ":" + totalSec;
});
