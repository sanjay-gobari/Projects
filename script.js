





// glow effect on tools section
const card_wrapper = document.querySelector('.tools-w');
const tools = document.querySelectorAll(".tools")
card_wrapper.addEventListener('mousemove', (e) => {
  tools.forEach(tool => {
    const rect = tool.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tool.style.background=`radial-gradient(200px circle at ${x}px ${y}px, rgba(59, 0, 83, 0.35), rgba(0, 0, 0, 0))`;
  })
})
//--end-- //
const timeElement = document.querySelector('#time');
function getFormattedTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12-hour format

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `[ ${hours} : ${paddedMinutes} : ${paddedSeconds} ${ampm} ]`;
}
  timeElement.textContent = getFormattedTime();
setInterval(()=>{
  timeElement.textContent = getFormattedTime();
},1000)
