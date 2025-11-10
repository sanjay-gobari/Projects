
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
    link: "./Stop Watch/",
  },
  {
    title: "TIC TAC TOE",
    img: "./img/TicTacToe.png",
    imgalt: "Tic Tac Toe",
    link: "./TIC TAC TOE/",
  },
  {
    title: "Urban Elegance",
    img: "./img/urban_elegance.png",
    imgalt: "Urban Elegance",
    link: "./Urban Elegance/",
  },
  {
    title: "Music Player",
    img: "./img/music_player.png",
    imgalt: "Music Player",
    link: "./Soniq/",
  },
  {
    title: "ToDo App",
    img: "./img/todo_app.png",
    imgalt: "Todo App",
    link: "./Todo Local Storage/",
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