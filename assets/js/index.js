'use strict';

const main = document.querySelector('.main');
const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav-item');
const play = document.querySelector('.play');

const audio = new Audio();
let isPlay = false;

function preloadImages() {
  for (let el of navItems) {
    let bird = el.dataset.bird;
    console.log(bird);
    const img = new Image();
    img.src = `../assets/img/${bird}.jpg`;
  }
}
preloadImages();

function playAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
    play.style.background = 'url(../assets/svg/play.svg)';
  } else {
    let curBird = nav.querySelector('.active')
      ? nav.querySelector('.active').dataset.bird
      : 'forest';
    audio.src = `../assets/audio/${curBird}.mp3`;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    play.style.background = 'url(../assets/svg/pause.svg)';
  }
}

function changeActive(set, el, className) {
  set.forEach((el) => el.classList.remove(className));
  el.classList.add(className);
}
function changeBackground(bird) {
  console.log('bg change');
  main.style.background = `url(../assets/img/${bird}.jpg)`;
}

function changeBird(event) {
  if (event.target.classList.contains('nav-item')) {
    audio.pause();
    isPlay = false;
    play.style.background = 'url(../assets/svg/play.svg)';
    const curBird = event.target.dataset.bird;
    changeActive(navItems, event.target, 'active');
    changeBackground(curBird);
    playAudio();
  }
}
nav.addEventListener('click', changeBird);
play.addEventListener('click', playAudio);
