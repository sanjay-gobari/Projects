const main = document.querySelector('#main');
const data = [
  {
    title: "Calculator UI",
    img: "./img/calculator_ui.png",
    imgalt: "Calculator img",
    link:"./CalculatorUI/",
  },
  {
    title: "Stopwatch",
    img: "./img/stopwatch.png",
    imgalt: "Stopwatch",
    link:"./Stop_Watch/",
  },
  {
    title: "TIC TAC TOE",
    img: "./img/Tic Tac Toe.png",
    imgalt: "project",
    link:"./TIC TAC TOE/",
  },
  {
    title: "Urban Elegance",
    img: "./img/urban_elegance.png",
    imgalt: "Urban Elegance",
    link:"./UrbanElegance/",
  },
  {
    title: "Music Player",
    img: "./img/music_player.png",
    imgalt: "Music Player",
    link:"./music-1-project/",
  },
  {
    title: "ToDo App",
    img: "./img/todo_app.png",
    imgalt: "ToDo App",
    link:"./todo using localstorage/",
  },
]

createElm()

function createElm() {
  let cards = data.map(elm => `
      <div class="card">
        <a href="${elm.link}" class="image-wrapper">
          <img src="${elm.img}" alt="${elm.imgalt}">
        </a>
        <h3>${elm.title}</h3>
      </div>
  `).join("");
  main.innerHTML = cards;
}