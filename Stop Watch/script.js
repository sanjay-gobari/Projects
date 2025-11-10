const start_btn = document.querySelector('#start-btn')
const stop_btn = document.querySelector('#stop-btn')
const reset_btn = document.querySelector('#reset-btn')
const lap_btn = document.querySelector('#lap-btn')
const lap_items = document.querySelector('#lap-items')
const cHour = document.querySelector('#cHour')
const cMinute = document.querySelector('#cMinute')
const cSecond = document.querySelector('#cSecond')
const cMSecond = document.querySelector('#cMSecond')

// --------------------------------------------------//
start_btn.addEventListener("click",start_time)
stop_btn.addEventListener("click",stop_time)
lap_btn.addEventListener("click",lap_time)
reset_btn.addEventListener("click",reset_time)

// --------------------------------------------------//

let timerStatus=false
let amsecond=0;
let asecond=0;
let aminute=0;
let ahour=0;
let lapCount=0;
// --------------------------------------------------// 
let Tinterval;
// --------------------------------------------------//
window.onload=()=>{
  updateT()
  }
  function updateT(){
    updateMSecond(amsecond)
    updateSecond(asecond)
    updateMinute(aminute)
    updateHour(ahour)
  }
// --------------------------------------------------//
function start_time(){
  if(!timerStatus){timerStatus=true
  Tinterval = setInterval(()=>{count_Time()},100)}
}
function stop_time(){
  if(timerStatus){timerStatus=false
  clearInterval(Tinterval)}
}

// --------------------------------------------------//
function lap_time(){
if(timerStatus){  lapCount+=1;
  const timedata=lapCount+"> " +addZero(ahour)+':'+addZero(aminute)+':'+addZero(asecond)+':'+(amsecond<100?`00${amsecond}`:amsecond);
  // console.log(timedata)
let el=document.createElement("div")
el.classList.add("lap-item")
el.classList.add("p1")
el.classList.add("m1")
el.classList.add("w-100")
el.innerText=timedata
lap_items.append(el)}

}
// --------------------------------------------------//
function reset_time(){
  amsecond=0;
  asecond=0;
  aminute=0;
  ahour=0;
  lapCount=0;
updateT()
lap_items.innerHTML=''
stop_time()
}
// --------------------------------------------------//
function count_Time(){
amsecond+=100;

if(amsecond===1000){
  amsecond=0;
  asecond+=1
  updateSecond(asecond)
}
updateMSecond(amsecond)

if(asecond===60){
  asecond=0;
  updateSecond(asecond)
  aminute+=1
  updateMinute(aminute)
}
if(aminute===60){
  aminute=0;
  updateMinute(aminute)
  ahour+=1
  updateHour(ahour)
}
if(ahour===24){
  ahour=0;
  updateHour(ahour)
}
// console.log(asecond+" "+aminute+" "+ahour)
}
// --------------------------------------------------//
function addZero(data){
  if(data<10){
    data="0"+data
  }
  return(data)
  }
// --------------------------------------------------//

function updateMSecond(ms){
  if(ms<100){
    ms="00"+ms
  }
  cMSecond.innerText=ms
  }
// --------------------------------------------------//

function updateSecond(s){
s=addZero(s)
cSecond.innerText=s
}
function updateMinute(m){
  m=addZero(m)
  cMinute.innerText=m
}
function updateHour(h){
  h=addZero(h)
  cHour.innerText=h
}
// --------------------------------------------------//