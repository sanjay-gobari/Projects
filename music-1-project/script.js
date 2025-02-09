

// {songName:"Alone",songPath:"./song/Alone.mp3"},
// {songName:"rock_dog",songPath:"./song/rock_dog.mp3"},

let music = [

];
let theam_color = [
  { bgColor: "#000000", primaryColor: "#000000", secondaryColor: "#000000", iconColor: "#000000", faviconColor: "#009e00" }
];
let default_theam_color = [
  { bgColor: "#111315", primaryColor: "#ff0000", secondaryColor: "#464646", iconColor: "#ffffff", faviconColor: "#009e00" }
];
let fav_song = [];
// audio.playbackRate = 1.5;
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')
const play_pause = document.querySelector('#play-pause')
const reset = document.querySelector('#reset')
const play_btn = document.querySelector('#play')
const pause_btn = document.querySelector('#pause')
const progressBar = document.querySelector('.progress')
const songCurrentTimeD = document.getElementById('currentTime');
const songTotalTimeD = document.getElementById('totalTime');
const current_volume = document.getElementById('curr-song-volume');
const volumeBar = document.querySelector('.volume-bar');

const volumeIcon = document.querySelector('.volume-icon');
const volumeValue = document.querySelector('.volume-value');
const player_animation = document.querySelector('.player-animation');
const songNameText = document.querySelector('.song-name');
const add_song_button = document.querySelector('.add-icon')
const choose_song_file = document.querySelector('#song-file-Input')
const song_name_box_o = document.querySelector('.song-name-o-box')
const left_section = document.querySelector('.left-section');
const right_section = document.querySelector('.right-section');
const favSongSection = document.querySelector('.fav-song-section');
const fav_section = document.querySelector('.fav-song-section-box');
const srepeat = document.querySelector('#repeat');
const searchSong = document.querySelector('#search-song-input');
const searchSongSection = document.querySelector('.search-song-section');


let repeat_status = false;
let current_song_index = 0;
let favsongindex = 0;

let fav_song_status = false;
let audio;
let playStatus = false;
let songNo = 0;
let firstTimePlayed = false;
let dragging = false;
let defaultVolume = 10;
let currprogress = document.getElementById('currprogress')
let music_list = document.querySelector('.music-list');
let musicItems = document.querySelectorAll('.music-item');
songNotPlaying();
//______________________________________________________________________________________________________________//


//
if (music.length === 0) {
  songNameText.innerText = "add song";
  // console.log('empty')
  addSong();
  audio = new Audio('');
}
else {
  audio = new Audio(music[0].songPath);
  setVolume(defaultVolume);
  addSong();   //adding song list to my ui
  songNameText.innerText = music[0].songName;
}
//
srepeat.addEventListener('click', () => {

  if (repeat_status) {
    repeat_status = false;
    if (srepeat.classList.contains('repeat-active')) {
      srepeat.classList.remove('repeat-active')
    }
  }
  else {
    repeat_status = true;
    if (!(srepeat.classList.contains('repeat-active'))) {
      srepeat.classList.add('repeat-active')
    }
  }

})
//
function remove_song_from_list(song_to_remove) {
  music.forEach((elm, i) => {
    if (elm.songName == song_to_remove) {
      music.splice(i, 1);
      addSong();

      if (i == music.length && i == current_song_index) {
        current_song_index -= 1
        if (!playStatus) {
          selectSongAuto(current_song_index)
          play_pause.click()
        }
        else {
          selectSongAuto(current_song_index)
        }
      }
      else if (i < current_song_index) {
        current_song_index -= 1;
        addActive()
      }
      else if (i == current_song_index) {
        if (!playStatus) {
          selectSongAuto(current_song_index)
          play_pause.click()
        }
        else {
          selectSongAuto(current_song_index)
        }

      }
      else {
        songPlaying();
      }
      return
    }

  })

}
// add song btn
add_song_button.addEventListener('click', () => {
  choose_song_file.click();
});
choose_song_file.addEventListener('change', (e) => {

  // current_song_index=0;
  for (var i = 0; i < e.target.files.length; i++) {
    if (e.target.files[i].type.split('/')[0] == 'audio') {
      add_song_to_list(e.target.files[i].name.split('.')[0])
    }
  }
  addSong();
  musicItems = document.querySelectorAll('.music-item');
  if (playStatus === true) {
    addActive();
  }
})
//adding song to list
function add_song_to_list(new_name) {
  let song_pass = true;
  music.forEach((elm) => {
    if (elm.songName === new_name) {
      console.log('duplicate song');
      song_pass = false;
      return
    }
  })
  if (song_pass) {
    let item = { songName: new_name, songPath: "./song/" + new_name + ".mp3" }
    music.push(item);
  }
}
//______________________________________________________________________________________________________________//
// setting a flag on currprogress , dragging or not
currprogress.addEventListener('mousedown', () => { dragging = true; })
currprogress.addEventListener('mouseup', () => { dragging = false; })

//______________________________________________________________________________________________________________//
// do something when song is playing
function songPlaying() {
  play_btn.classList.add('hide');      //hiding play button
  pause_btn.classList.remove('hide');  //unhiding pause button
  player_animation.style.opacity = 1;
  addActive();
}
//
function addActive(aindex = current_song_index) {

  musicItems.forEach((item) => {
    let sNameElement = item.querySelector('.s-name');
    let list_song_animation = item.querySelector('.music-item-animation')
    if (sNameElement) {
      let id = sNameElement.getAttribute('id');

      if (id == aindex) {
        item.classList.add("active-song")
        list_song_animation.style.opacity = 1;
      }
    }
  });
}
//
function removeActive() {
  musicItems.forEach((item) => {
    let sNameElement = item.querySelector('.s-name');
    let list_song_animation = item.querySelector('.music-item-animation')
    if (sNameElement && playStatus == true) {
      if (item.classList.contains("active-song")) {
        item.classList.remove("active-song");
        list_song_animation.style.opacity = 0;

      }
    }
    else if (playStatus == false && firstTimePlayed == true) {
      list_song_animation.style.opacity = 0;
    }
  });
}
//______________________________________________________________________________________________________________//
// do something when song is not playing
function songNotPlaying() {
  pause_btn.classList.add('hide');       //hiding pause button
  play_btn.classList.remove('hide');     //unhiding play button
  player_animation.style.opacity = 0;
  removeActive();
}
//______________________________________________________________________________________________________________//
// adding song data to my list in html
function addSong() {
  let fetchedData = '';
  // music_list.innerHTML=fetchedData;
  if (music.length == 0) {
    fetchedData = '<div class="default-music-item"><div>Add Songs</div></div>'; //if no data is present
    music_list.innerHTML = fetchedData;
  }
  else {
    music.forEach((elm, indexno) => {
      fetchedData += `
    <div class="music-item">
      <div class="s-index">${indexno + 1}.</div>
      <div class="s-name" id="${indexno}">${elm.songName}</div>
      <div class="music-item-animation">
        <div class='song-playing-animation'>
          <div class="bar-1"> </div>
          <div class="bar-2"> </div>
          <div class="bar-3"> </div>
        </div>
      </div>
      
      <div class="like-song">
      <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
      </div>
      <div class="music-item-remove">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M200-440v-80h560v80H200Z"/>
      </svg>
      </div>
    </div>`;
    }) //collecting data from array
    music_list.innerHTML = fetchedData; //adding data collected from array to html
    musicItems = document.querySelectorAll('.music-item');
    musicItems.forEach((mitem) => {
      mitem.addEventListener('click', handleMusicItemsClick);
      updatefavClassMainList();
    })
  }

}

//______________________________________________________________________________________________________________//
// checking is music list is clickecd or not
music_list.addEventListener('click', (event) => {
  if (event.target.classList.contains('music-item-remove')) {
    remove_song_from_list(event.target.parentElement.querySelector('.s-name').innerText);
  }
  if (event.target.classList.contains('s-name')) // checking is clicked item contain class
  {
    removeActive();
    playSong(event.target.innerText)  // play clicked song with name    
    if (fav_song_status) {
      favsongindex = 0;
      favsonganimationDactive();
      fav_song_status = false;
    }
  }
  if (event.target.classList.contains('default-music-item')) {
    add_song_button.click();
  }
})
//

//______________________________________________________________________________________________________________//
// play song with song name
function playSong(song) {
  if (firstTimePlayed === false) {      //checking if song is played first time
    firstTimePlayed = true;           // setting flag , song  played first time 
  }
  // checking song is present in my list or not
  let songelm = music.filter((elm, index) => {
    if (elm.songName === song) { songNo = index; current_song_index = index; return elm; }
  })
  //checking it is empty or not
  if (songelm.length > 0) {
    songNameText.innerText = song;
    if (audio !== undefined) { audio.pause(); }     // pause audio if it is already playing 
    audio = new Audio(songelm[0].songPath);  // setting new song

    audio.play();                             //start playing song
    playStatus = true;                        //setting song playing status true
    setCurrTime();                       //setting time of song
    songPlaying();                            //do something while song is playing

  } else {
    console.log("Song not found"); // Output if no matching song is found
  }
}
//______________________________________________________________________________________________________________//
// select song auto when play,next,previous button is clicked
function selectSongAuto(songno) {
  removeActive();

  if (fav_song_status) {
    if (fav_song.length != 0) {
      playSong(fav_song[songno].favSongName);
      favsonganimationActive();
    }
    else {
      play_pause.click()
      audio = new Audio(music[0].songPath);
      fav_song_status = false;
    }

  }
  else {
    if (music.length != 0) {
      playSong(music[songno].songName);
    }
  }
}
//______________________________________________________________________________________________________________//
// change song when previous button is clicked
previous.addEventListener('click', () => {
  if (fav_song_status) {



    if (favsongindex > 0) {   //checking if song number is not greater than my song list
      favsongindex -= 1;
      selectSongAuto(favsongindex);       // play the selected  song
    }
    else {
      favsongindex = 0;                     // setting song to first if song number is greater than total number of song
      selectSongAuto(favsongindex);       // play the first song  
    }

  }

  else {


    //checking if current song no is greater than 0
    if (songNo > 0) {
      songNo -= 1;              //setting song number current -1
      selectSongAuto(songNo);  //select song number current -1
    }
    else {
      songNo = 0;                 //if song number is 0 or less than 0 then set it to 0
      // firstTimePlayed=true;           // setting flag , song  played first time 
      selectSongAuto(songNo);   // play the first song
    }
  }
})
//______________________________________________________________________________________________________________//
// change song when next button is clicked
next.addEventListener('click', () => {
  if (fav_song_status) {

    if (favsongindex >= 0 && favsongindex <= fav_song.length - 1) {
      favsongindex += 1;

      if (favsongindex <= fav_song.length - 1) {   //checking if song number is not greater than my song list
        selectSongAuto(favsongindex);       // play the selected  song
      }
      else {
        favsongindex = 0;                     // setting song to first if song number is greater than total number of song
        selectSongAuto(favsongindex);       // play the first song  
      }
    }
  }


  else {

    if (songNo >= 0 && songNo <= music.length - 1) {

      if (firstTimePlayed === false) {      //checking if song is played first time
        selectSongAuto(songNo);         // play the first song  
      }
      else {
        songNo = songNo + 1;               //increment song number
        if (songNo <= music.length - 1) {   //checking if song number is not greater than my song list
          selectSongAuto(songNo);       // play the selected  song
        }
        else {
          songNo = 0;                     // setting song to first if song number is greater than total number of song
          selectSongAuto(songNo);       // play the first song  
        }
      }
    }
  }
})
//______________________________________________________________________________________________________________//
// reset player for current song
reset.addEventListener('click', () => {

  audio.pause();               //pause audio
  audio.currentTime = 0;       //reseet current time
  setProgress(0);   //reset current progress
  playStatus = false;          //song play flag to false
  songNotPlaying();            //song not playing
})
//______________________________________________________________________________________________________________//
// click on play pause button
play_pause.addEventListener('click', () => {
  if (playStatus === false) {        // checking song playing status

    if (firstTimePlayed === false) {   // if song is played first time
      selectSongAuto(songNo);      // play first song

    }
    else {                          // if song is not played first time 
      playStatus = true;           // song play flag to true
      audio.play();                  // play song
      songPlaying();                 // song is playing
      if (fav_song_status) {
        favsonganimationActive()
      }

    }
  }
  else {
    playStatus = false;            // song play flag to false
    audio.pause();                 // pause song
    songNotPlaying();              // song is not playing
    if (fav_song_status) {
      favsonganimationDactive()
    }
  }
})


//______________________________________________________________________________________________________________//

// Update the current time display every second

function setCurrTime() {

  // do when metad data of song is loaded
  audio.addEventListener('loadedmetadata', function () {
    setVolume(defaultVolume)
    songTotalTimeD.innerText = formatTime(audio.duration); //update total time of song
    // do when timeupdate happen
    audio.addEventListener('timeupdate', () => {
      if (!isNaN(audio.duration)) {
        CTimeUpdate();
      }
    })
    // clicked on progress bar
    currprogress.addEventListener('click', () => {
      audio.currentTime = (audio.duration * currprogress.value) / 100; // set current time on base of click position on progress bar
    })

    progressBar.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        audio.currentTime = (audio.duration * (parseFloat(currprogress.value) + 1)) / 100; //increase song 1% from current time
      }
      else {
        audio.currentTime = (audio.duration * (parseFloat(currprogress.value) - 1)) / 100;//decrease song 1% from current time
      }

    })
    progressBar.addEventListener('mouseover', (event) => {
      if (!(progressBar.classList.contains('tool-tip-c'))) {
        progressBar.classList.add('tool-tip-c')
      }
    })


    progressBar.addEventListener('mousemove', (event) => {
      let locper = ((event.clientX - progressBar.offsetLeft) * 100) / progressBar.offsetWidth;
      progressBar.style.setProperty("--pointer-loc", locper + '%')
      let tooltime = formatTime((audio.duration * locper) / 100)
      progressBar.setAttribute("datatool", tooltime)

    })


      *
      /////over flow for song name 
      setTimeout(() => {
        if (song_name_box_o.scrollWidth > song_name_box_o.clientWidth) {

          let o_width = ((song_name_box_o.clientWidth - song_name_box_o.scrollWidth) / song_name_box_o.clientWidth) * 100;

          document.documentElement.style.setProperty('--overflow-x-width', (o_width - 10) + '%');
          songNameText.classList.add('detect-h-scroll');
        }
        else {
          songNameText.classList.remove('detect-h-scroll');
        }
      }, 100);
  });
}

//
function CTimeUpdate() {
  let Tprogress = (audio.currentTime / audio.duration) * 100; // time in % 0-100

  if (!dragging) { // if dragging is in progress do not update current progress bar
    setProgress(Tprogress)// if dragging is not in progress update current progress bar
  }
  // else{
  //   setProgress(currprogress.value);
  // }
  songCurrentTimeD.innerText = formatTime(audio.currentTime); // update current time og playing song
  if (Tprogress == 100 && playStatus == true) { // check if progress = 100%
    if (repeat_status && fav_song_status == false) {
      songNo -= 1;
    }
    if (fav_song_status && repeat_status) {
      favsongindex -= 1;
    }
    next.click();     // change song
  }
}
//______________________________________________________________________________________________________________//

// format time 
function formatTime(time) {
  const minutes = Math.floor(time / 60); //convert to minute from ms
  const seconds = Math.floor(time % 60); //convert to second remaining minute
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime; //return formated time as 00:00
}

//
function setProgress(sProgress) {

  // currprogress.style.background = `linear-gradient(to right, #ff0000 0%, #ff0000 ${sProgress}%, #c0c0c0 ${sProgress}%, #c0c0c0 100%)`;


  currprogress.value = sProgress

}
//
current_volume.addEventListener('click', () => {
  defaultVolume = current_volume.value;
  setVolume(defaultVolume)
})
current_volume.addEventListener('mousedown', () => {
  dragging = true;
})
current_volume.addEventListener('mousemove', () => {
  if (dragging) {
    setVolume(current_volume.value);
  }
})
current_volume.addEventListener('mouseup', () => {
  dragging = false;
  // setVolume(current_volume.value);
})
volumeBar.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    if (defaultVolume >= 100) {
      defaultVolume = 100;
      setVolume(defaultVolume);
    }
    else {

      defaultVolume += 1;
      setVolume(defaultVolume);
    }
  }
  else {
    if (defaultVolume <= 0) {
      defaultVolume = 0;
      setVolume(defaultVolume);
    }
    else {
      defaultVolume -= 1;
      setVolume(defaultVolume);
    }
  }
});

function setVolume(value) {
  value = parseInt(value);
  if (!dragging) {
    audio.volume = value * 0.01;
    current_volume.value = value;
    defaultVolume = value;
  }
  volumeValue.innerText = `${value.toString().padStart(2, '0')}`
}


////////////////////////////for setting function////////////////////////////
left_section.addEventListener('click', (event) => {
  if (event.target.classList.contains("player-setting")) {
    document.querySelector('.settings-section').style.display = "block";
    document.querySelector('#reset-btn').click();
  }
  else if (event.target.innerText == "Liked Songs") {

    fav_section.style.display = 'block';
    showFavSong()
  }

})

right_section.addEventListener('click', (event) => {

  if (event.target.classList.contains("setting-close-icon")) {
    document.querySelector('.settings-section').style.display = "none";
  }
  else if (event.target.classList.contains("fav-close-icon")) {
    fav_song_status = false;
    fav_section.style.display = 'none';
  }
  else if (event.target.classList.contains("fav-song-active")) {
    let songtormv = event.target.parentElement.querySelector('.fav-song-name').innerText;
    fav_song.forEach((felm, i) => {
      if (songtormv == felm.favSongName) {
        fav_song.splice(i, 1);
        removefavClass(songtormv);
        setcorrectindexfav(i);
        showFavSong();

      }
    })
  }
  else if (event.target.classList.contains("fav-song-name")) {
    fav_song_status = true;
    let songtoplay = event.target.parentElement.parentElement.querySelector('.fav-s-index').innerText.split('.')[0];
    songtoplay = parseInt(songtoplay) - 1;
    favsongindex = songtoplay;
    selectSongAuto(songtoplay);


  }
  else if (event.target.classList.contains("search-song-item")) {
    let searchedSong = event.target.querySelector('.search-song-name').innerText;
    removeActive();
    playSong(searchedSong);
  }

})
////////////////////////////setting theam color /////////////////////////////////////

const theam_bg_color = document.querySelector('#bg-color-t');
const theam_primary_color = document.querySelector('#primary-color-t');
const theam_secondary_color = document.querySelector('#secondary-color-t');
const theam_icon_color = document.querySelector('#icon-color-t');
const theam_fav_icon_color = document.querySelector('#fav-color-t');

const ok_btn = document.querySelector('#ok-btn');
const save_btn = document.querySelector('#save-btn');
const reset_btn = document.querySelector('#reset-btn')
const theam_color_btn = document.querySelector('.theam-control-btn')
const root_elm = document.documentElement;

theam_bg_color.addEventListener('change', (e) => {

  theam_color[0].bgColor = e.target.value;
})
theam_primary_color.addEventListener('change', (e) => {

  theam_color[0].primaryColor = e.target.value;
})
theam_secondary_color.addEventListener('change', (e) => {

  theam_color[0].secondaryColor = e.target.value;
})
theam_icon_color.addEventListener('change', (e) => {

  theam_color[0].iconColor = e.target.value;
})
theam_fav_icon_color.addEventListener('change', (e) => {

  theam_color[0].faviconColor = e.target.value;
})

theam_color_btn.addEventListener('click', (event) => {
  if (event.target.id == "ok-btn") {

    root_elm.style.setProperty('--theam-bg-color', theam_color[0].bgColor);
    root_elm.style.setProperty('--theam-p-color', theam_color[0].primaryColor);
    root_elm.style.setProperty('--theam-s-color', theam_color[0].secondaryColor);
    root_elm.style.setProperty('--theam-icon-fill-color-1', theam_color[0].iconColor);
    root_elm.style.setProperty('--theam-fav-fill-color-1', theam_color[0].faviconColor);
  }
  if (event.target.id == "reset-btn") {

    root_elm.style.setProperty('--theam-bg-color', default_theam_color[0].bgColor);
    root_elm.style.setProperty('--theam-p-color', default_theam_color[0].primaryColor);
    root_elm.style.setProperty('--theam-s-color', default_theam_color[0].secondaryColor);
    root_elm.style.setProperty('--theam-icon-fill-color-1', default_theam_color[0].iconColor);
    root_elm.style.setProperty('--theam-fav-fill-color-1', default_theam_color[0].faviconColor);

    theam_bg_color.value = default_theam_color[0].bgColor
    theam_primary_color.value = default_theam_color[0].primaryColor
    theam_secondary_color.value = default_theam_color[0].secondaryColor
    theam_icon_color.value = default_theam_color[0].iconColor
    theam_fav_icon_color.value = default_theam_color[0].faviconColor

    theam_color[0].bgColor = default_theam_color[0].bgColor
    theam_color[0].primaryColor = default_theam_color[0].primaryColor
    theam_color[0].secondaryColor = default_theam_color[0].secondaryColor
    theam_color[0].iconColor = default_theam_color[0].iconColor
    theam_color[0].faviconColor = default_theam_color[0].faviconColor



  }
})
//////////////////////////////////liked song///////////////////////////////////////////////
function removefavClass(rmvsongname) {

  musicItems.forEach((elme, ind) => {

    if (rmvsongname == elme.querySelector(".s-name").innerText) {

      if (elme.querySelector('.like-song').classList.contains("my-fav")) {
        elme.querySelector('.like-song').classList.remove("my-fav");

      }

    }
  })
}
// 
function updatefavClassMainList() {
  if (fav_song) {
    fav_song.forEach((elm1) => {
      musicItems.forEach((elm2) => {

        if (elm1.favSongName == elm2.querySelector(".s-name").innerText) {

          if (!(elm2.querySelector(".like-song").classList.contains("my-fav"))) {
            elm2.querySelector(".like-song").classList.add("my-fav")
          }

        }
      })
    })

  }
}
//
function setcorrectindexfav(rmvi) {

  if (rmvi >= favsongindex && favsongindex == fav_song.length) {

    if (playStatus && fav_song_status) {
      previous.click();
    }
    else {
      favsongindex -= 1;
      if (favsongindex <= 0) { favsongindex = 0; }
    }
  }
  else if (rmvi < favsongindex) {
    favsongindex -= 1;
  }
  else if (rmvi == favsongindex) {
    favsongindex -= 1;
    next.click();
  }
}
//
function handleMusicItemsClick(e) {

  if (e.target.classList.contains("like-song")) {
    if (e.target.classList.contains("my-fav")) {

      fav_song.forEach((elm, ind) => {
        if (elm.favSongName == e.target.parentElement.querySelector('.s-name').innerText) {

          if (fav_song_status && ind == favsongindex) {
            if (fav_song) {
              next.click();
            }
            else {
              play_pause.click()
              audio = new Audio(music[0].songPath);
              fav_song_status = false;
            }
          }
          fav_song.splice(ind, 1);
          setcorrectindexfav(ind);
          removefavClass(elm.favSongName)
          showFavSong();
        }
      })
    }

    else {
      let datafav = { favSongName: e.target.parentElement.querySelector('.s-name').innerText, sIndex: e.target.parentElement.querySelector('.s-name').id }
      let checkFavSong = true;
      fav_song.forEach((elm) => {
        if (elm.favSongName == e.target.parentElement.querySelector('.s-name').innerText) {
          checkFavSong = false;
          console.log("dublicate entry fav")
        }
        else {
          console.log("good to go")
        }

      })
      if (checkFavSong) {
        e.target.classList.add("my-fav")
        fav_song.push(datafav)
      }
      if (fav_song != null) {
        updatefavClassMainList();
        showFavSong();
      }
    }

  }
}



/////////////////////////////////////////////////////////////////////////////////

///////////////////////////when click on like song show like song list///////////////////////////


function showFavSong() {

  let data = '';
  fav_song.forEach((favSelm, i) => {

    data += ` 
   <div class="fav-song-item">
   <div class="fav-s-index">${i + 1}.</div>
   <div class='hide-overflow'>
  <div class="fav-song-name">${favSelm.favSongName}</div>
  </div>
  <div class="fav-song-animation">
    <div class="song-playing-animation">
      <div class="bar-1"> </div>
      <div class="bar-2"> </div>
      <div class="bar-3"> </div>
    </div>
  </div>
  <div class="like-song fav-song-active">
    <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
  </svg>
    </div>
</div>`

  })
  favSongSection.innerHTML = data;
  if (playStatus) {
    if (fav_song_status) {
      favsonganimationDactive();
      favsonganimationActive();
    }
  }
  overflowinfavlist();

  if (fav_song.length == 0) {
    favSongSection.innerHTML = `<div class="no-fav-song">no song</div>`;
  }
}

///////////////////////////////////////   add data to liked section/////////
// fav_song



//////////////////////fav song animation active and de active

function favsonganimationActive() {
  favsonganimationDactive()
  const fav_song_item = document.querySelectorAll('.fav-song-item')

  fav_song_item.forEach((elm) => {
    let songtoplayi = elm.querySelector('.fav-s-index').innerText.split('.')[0];
    songtoplayi = parseInt(songtoplayi) - 1;
    if (playStatus) {
      if (favsongindex == songtoplayi) {
        elm.querySelector('.fav-song-animation').classList.add('fav-song-playing');
      }
    }
  })
  if (playStatus) {
  }


}
function favsonganimationDactive() {
  const fav_song_item = document.querySelectorAll('.fav-song-item')
  fav_song_item.forEach((elm) => {
    if (elm.querySelector('.fav-song-animation').classList.contains('fav-song-playing')) {
      elm.querySelector('.fav-song-animation').classList.remove('fav-song-playing');
    }
  })
}

////////////////////////////////////////
function overflowinfavlist() {

  let favdata = document.querySelectorAll('.fav-song-item')
  favdata.forEach((elm) => {
    let w = elm.querySelector('.fav-song-name')

    if (w.scrollWidth > w.clientWidth) {
      let o_width = ((w.clientWidth - w.scrollWidth) / w.clientWidth) * 100;


      document.documentElement.style.setProperty('--overflow-x-width-fav', (o_width - 10) + '%');
      w.classList.add('detect-fav-h-scroll')
    }
    else {

    }
  })

}

//////////////////////////////////////////  handle search song ////////////////////////

searchSong.addEventListener('input', () => {

  // searchSongSection

  if (music.length != 0 && searchSong.value != '') {

    console.log(searchSong.value);
    let lowercaseQuery = searchSong.value.toLowerCase();
    const searchResults = music.filter(song => {
      const lowercaseSongName = song.songName.toLowerCase();
      return lowercaseSongName.includes(lowercaseQuery);
    });
    let data = ''
    searchResults.forEach((item, i) => {
      console.log('searched song:', item.songName)
      data += ` 
  <div class="search-song-item">
    <div class="search-s-index">${i + 1}.</div>
    <div class='hide-overflow'>
      <div class="search-song-name">${item.songName}</div>
    </div>
  </div>`

    })

    searchSongSection.innerHTML = data;

  }
  else {
    searchSongSection.innerHTML = '';
  }
})









///////////////////////////////////////////////////////////////////

let op = 0;
document.querySelector('.onoffimg').addEventListener('click', () => {
  if (op == 0) {
    document.querySelector('.my-p').style.opacity = 0.2
    op = 1;
  }
  else {
    document.querySelector('.my-p').style.opacity = 0
    op = 0
  }
})