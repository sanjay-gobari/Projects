
const main = document.querySelector('#my-project');
const data = [
  {
    title: "Calculator UI",
    img: "./img/calculator.png",
    imgalt: "Calculator img",
    link: "./Calculator/",
  },
  {
    title: "Stopwatch",
    img: "./img/stopwatch.png",
    imgalt: "Stopwatch",
    link: "./Stop_Watch/",
  },
  {
    title: "TIC TAC TOE",
    img: "./img/TicTacToe.png",
    imgalt: "project",
    link: "./TIC TAC TOE/",
  },
  {
    title: "Urban Elegance",
    img: "./img/urban_elegance.png",
    imgalt: "Urban Elegance",
    link: "./UrbanElegance/",
  },
  {
    title: "Music Player",
    img: "./img/music_player.png",
    imgalt: "Music Player",
    link: "./music-1-project/",
  },
  {
    title: "ToDo App",
    img: "./img/todo_app.png",
    imgalt: "ToDo App",
    link: "./todo using localstorage/",
  },
]

createElm()

function createElm() {
  let cards = data.map(elm => `
      <div class="project-card">
      <a href="${elm.link}"  class="view-project">
            <div class="project-image">
              <img src="${elm.img}" alt="${elm.imgalt}">
            </div>
      </a>
            <div class="project-info">
              <h3>${elm.title}</h3>
            </div>
          </div>
  `).join("");
  main.innerHTML = cards;
}