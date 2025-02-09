// Initialize variables
let gameover = false;
let currentPlayer = 'x';
let current_row;
let current_col;
let cp;
let element = null;
let haveevent = false;

const total_time = 60;
let int1,int2;
let time1 = total_time;
let time2 =total_time;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
//query

const play_again = document.querySelector(".play-again-btn");
const move_reset = document.querySelector('.move-reset');
const game_reset = document.querySelector(".reset-btn");
const winner_msg = document.querySelector('.winner-msg');
const draw_line = document.querySelector('.my-line');
const cline = document.querySelector('.cline');

const fill_1 = document.querySelector(".player-progress-fill-1")
const fill_2 = document.querySelector(".player-progress-fill-2")
let progress1=0;
let progress2=0;

const playerBox1 = document.querySelector(".player-box-1");
const playerBox2 = document.querySelector(".player-box-2");

//default values
  document.getElementById("time1").innerText = `00:${total_time}`
  document.getElementById("time2").innerText = `00:${total_time}`
playerBox1.classList.add("player-highlight")
fill_1.style.width = `${progress1}%`;
fill_2.style.width = `${progress2}%`;
winner_msg.style.display = 'none';
play_again.disabled = true;           //dissable play again button
play_again.style.display = 'none';    //set play again button display to none
game_reset.onclick = () => { resetGame(); }
//
const cells = document.querySelectorAll('.tic-tac-toe-cell');
window.addEventListener('load', function () {
  add_flip();

});
//
function add_flip() {
  cells.forEach((cell, index) => {
    setTimeout(() => {
      cell.classList.add('flip');
    }, index * 20); // Adjust the delay time as needed
  });
}
//
function remove_flip() {
  cells.forEach((cell, index) => {
    if (cell.classList.contains('flip')) {
      cell.classList.remove('flip');
    }
  });
}

//function to draw line
function DrawLine(ang, no) {

  animet()
  if (currentPlayer == 'x') {
    draw_line.style.stroke = "red";
  }
  else {
    draw_line.style.stroke = "blue";
  }
  if (ang == 0) {
    if (no == 0) { setLine(5, 16.5, 95, 16.5) }
    if (no == 1) { setLine(5, 50, 95, 50) }
    if (no == 2) { setLine(5, 83.5, 95, 83.5) }

  }
  else if (ang == 90) {
    if (no == 0) { setLine(16.5, 5, 16.5, 95) }
    if (no == 1) { setLine(50, 5, 50, 95) }
    if (no == 2) { setLine(83.5, 5, 83.5, 95) }
  }
  else if (ang === 45) {
    setLine(10, 10, 90, 90)
  }
  else if (ang === -45) { setLine(90, 10, 10, 90) }
  else { }

}

// align-self: center;
// justify-self: center;
// Function to check for a win
function checkWin(player) {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      DrawLine(0, i);
      return true; // Row win
    }
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
      DrawLine(90, i);
      return true; // Column win
    }
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    DrawLine(45);
    return true; // Diagonal win
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    DrawLine(-45);
    return true; // Diagonal win
  }
  return false;
}

// Function to check for a draw
function checkDraw() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') {
        return false; // Game is still in progress
      }
    }
  }
  return true; // All cells are filled, no winner
}
// undo one move
function handleResetMoves() {
  board[current_row][current_col] = '';
  element.classList.remove(cp);
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  element = null;
  switchPlayer(currentPlayer);
  if (haveevent) {
    move_reset.removeEventListener('click', handleResetMoves);
    haveevent = false;
  }
}
//
function showWinnerMsg(msg) {
  if (msg === "draw") {
    winner_msg.style.display = 'grid';
    winner_msg.innerText = "Match Draw 😎"
    clearInterval(int1);
    clearInterval(int2);
  }
  else {
    setTimeout(() => {
      winner_msg.style.display = 'grid';
      winner_msg.innerText = `${currentPlayer.toUpperCase()} Won !!🎉`;
      clearInterval(int1);
    clearInterval(int2);
    }, 500);
  }
}
// Function to make a move
function makeMove(row, col, elm) {
  
  current_col = col;
  current_row = row;
  cp = currentPlayer;
  element = elm;


  if (!gameover) {
    // Check if the cell is empty
    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
      elm.classList.add(currentPlayer)
      // Check for a win or draw
      if (checkWin(currentPlayer)) {
        showWinnerMsg(currentPlayer)
        // Reset the game
        gameover = true;
        playAgain();
      } else if (checkDraw()) {
        showWinnerMsg("draw")
        // Reset the game
        gameover = true;
        playAgain();
      } else {
        if (element !== null && haveevent !== true) {
          move_reset.addEventListener('click', handleResetMoves);
          haveevent = true;
        }
        // Switch players
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        switchPlayer(currentPlayer);
      }
    }
    else {
      console.log('Invalid move! Cell already occupied.');
    }
  }
}
function enablebtn() {
  game_reset.style.display = 'block';
  move_reset.style.display = 'block';
}
function disablebtn() {
  game_reset.style.display = 'none';
  move_reset.style.display = 'none';
}


function playAgain() {
  disablebtn();
  play_again.style.display = 'block'
  play_again.disabled = false;
  play_again.onclick = () => { resetGame(); }
}
// Function to reset the game
function resetGame() {
  clearInterval(int1);
  clearInterval(int2);
  progress1=0;
  progress2=0;
  fill_1.style.width = `${progress1}%`;
  fill_2.style.width = `${progress2}%`;
  document.getElementById("time1").innerText = `00:${total_time}`
  document.getElementById("time2").innerText = `00:${total_time}`
  time1 = total_time;
  time2 = total_time;
  playerBox1.classList.add("player-highlight")
  currentPlayer = 'x';
  gameover = false;
  enablebtn();
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  setLine(0, 0, 0, 0);
  animetremove();
  remove_flip();
  add_flip();
  winner_msg.innerText = '';
  winner_msg.style.display = 'none';
  play_again.disabled = true;
  play_again.style.display = 'none';
  document.querySelectorAll(".tic-tac-toe-cell").forEach((e) => {
    if (e.classList.contains('x')) { e.classList.remove("x"); }
    if (e.classList.contains('o')) { e.classList.remove("o"); }

  })
}


function setLine(x1, y1, x2, y2) {
  draw_line.setAttribute('x1', `${x1}%`);
  draw_line.setAttribute('y1', `${y1}%`);
  draw_line.setAttribute('x2', `${x2}%`);
  draw_line.setAttribute('y2', `${y2}%`);
}
function animet() {
  if (cline.classList.contains("animate-line")) {
    return
  }
  else {
    cline.classList.add("animate-line")

  }
}
function animetremove() {
  if (cline.classList.contains("animate-line")) {
    cline.classList.remove("animate-line")
  }
}

function checkPlayerTurn() {

}

// timer1();
// timer2();

function timer1(status) {
  if(!int1){
    int1 = setInterval(() => {
      if (time1 <= 0) {
        clearInterval(int1);
      }
      if(status){
        time1 -= 1;
        const min1=time1%60;
      const hr1=Math.floor(time1/60)
      document.getElementById("time1").innerText = `0${hr1}:${min1>9?min1:'0'+min1}`;
      
      progress1 = 100-(time1 / total_time * 100)
      fill_1.style.width = `${progress1}%`;
      }
    }, 1000);
  }
  else{
    clearInterval(int1);
    int1=null;
    timer1(status)
  }
}
function timer2(status) {
  if(!int2){
    int2=setInterval(() => {
      if (time2 <= 0) {
        clearInterval(int2);
      }
      if(status){
        time2 -= 1;
        const min2=time2%60;
      const hr2=Math.floor(time2/60)
      document.getElementById("time2").innerText = `0${hr2}:${min2>9?min2:'0'+min2}`;
      
      progress2 = 100-(time2 / total_time * 100);
      fill_2.style.width = `${progress2}%`;
      }
    }, 1000);
    
  }
  else{
    clearInterval(int2);
    int2=null;
    timer2(status)
  }
}

function switchPlayer(cPlayer){

  if(cPlayer==='o'){
    timer1(false);
    timer2(true);
    if(!playerBox2.classList.contains("player-highlight")){
      playerBox1.classList.remove("player-highlight")
      playerBox2.classList.add("player-highlight")
    }
  }
  else{
    timer1(true);
    timer2(false);
    if(!playerBox1.classList.contains("player-highlight")){
      playerBox2.classList.remove("player-highlight")
      playerBox1.classList.add("player-highlight")
    }
  }
}