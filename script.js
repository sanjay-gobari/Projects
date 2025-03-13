const contact_form = document.querySelector("#contact-me-form");


contact_form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted")
  contact_form.reset();
})

let isScrolling = true;

const progress = document.querySelector(".progress-bar");

const nav_list = document.querySelector(".nav-list")

const nav_data = [
  { name: "Home", link: "#" },
  { name: "Technology", link: "technology" },
  { name: "Projects", link: "projects" },
  { name: "About", link: "about" },
  { name: "Contact", link: "contact" },
]

makeNavList()

const progressMax = window.innerWidth;
const nav_gap = progressMax / (nav_data.length);

let count = 0;
window.addEventListener("scroll", updateProgress);

function makeNavList() {
  nav_list.innerHTML = nav_data.map((item, i) => {
    if (i === 0) {
      return (`<a href="${item.link}" data="${item.link}" class="nav-item active"  onclick="toggleActive(this)">
        ${item.name}
        </a>`)
    }
    return (`<a href="#${item.link}" data="${item.link}" class="nav-item" onclick="toggleActive(this)">
    ${item.name}
    </a>`)
  }).join("")
}
// update progress bar
function updateProgress() {

  const scroll = window.scrollY;
  var scrollMax = document.body.scrollHeight - window.innerHeight;
  var progressWidth = (scroll / scrollMax) * progressMax;
  progress.style.width = `${progressWidth}px`;

  if (isScrolling) {
    reset_active_all(); // Reset all nav items first
    let activeIndex = Math.min(Math.floor(progressWidth / nav_gap), nav_items.length - 1);
    toggleActive(nav_items[activeIndex]);
  }

}


// set active status
const nav_items = document.querySelectorAll(".nav-item");
function toggleActive(elm) {
  if (!elm.classList.contains("active")) {
    isScrolling = false;
    reset_active_all();
    elm.classList.add("active")
    setTimeout(() => {
      isScrolling = true;
    }, 500)
  }
}
// reset all active status
function reset_active_all() {
  nav_items.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active")
    }
  });
}




// eye track

const eye1 = document.querySelector('.eye1');
const pupil1 = document.querySelector('.pupil1');
const eye2 = document.querySelector('.eye2');
const pupil2 = document.querySelector('.pupil2');

const eyeRect1 = eye1.getBoundingClientRect();
const eyeRect2 = eye2.getBoundingClientRect();

document.addEventListener('mousemove', (event) => {
  moveEye(event, eyeRect1, pupil1);
  moveEye(event, eyeRect2, pupil2);
});

function moveEye(event, eyeRect, pupil) {
  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
  const eyeCenterY = eyeRect.top + eyeRect.height / 2;

  const deltaX = event.clientX - eyeCenterX;
  const deltaY = event.clientY - eyeCenterY;

  const distance = Math.min(20, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
  const angle = Math.atan2(deltaY, deltaX);

  const pupilX = Math.cos(angle) * distance;
  const pupilY = Math.sin(angle) * distance;

  pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
}



// send animation
document.querySelector(".contact-button").addEventListener("click", function () {
  const svg = this.querySelector("svg");
  const isValid = contact_form.checkValidity()
  if (isValid) {
    svg.classList.add("fly-away");
  }
  else { svg.classList.add("fly-crash"); }
  // Remove the class after animation ends to allow re-triggering
  setTimeout(() => {
    if (isValid) {
      svg.classList.remove("fly-away");
    }
    else {
      svg.classList.remove("fly-crash");
    }
  }, 2000);
});

