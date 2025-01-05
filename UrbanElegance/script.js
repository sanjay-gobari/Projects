
const cursorFollow = document.createElement('div');
const cursorSize = 20;
const cursorScale = 12;
let yOffSet = 0;
let currentY = 0;
function mouseFollow() {
  createCursor();
  document.addEventListener('mousemove', cursorMove);
  document.addEventListener('scroll', updateCursorPosition);
  // create cursor
  function createCursor() {
    cursorFollow.classList.add('my-cursor');
    cursorFollow.style.position = 'absolute';
    cursorFollow.style.width = cursorSize + 'px';
    cursorFollow.style.height = cursorSize + 'px';
    cursorFollow.style.borderRadius = '50%';
    cursorFollow.style.pointerEvents = 'none';
    cursorFollow.style.transition = "width 100ms, height 100ms, background 100ms";
    cursorFollow.style.transform = 'translate(-50%, -50%)';
    cursorFollow.style.backgroundColor = "rgb(255, 255, 255)";
    cursorFollow.style.mixBlendMode = "difference";
    cursorFollow.style.zIndex = "1000";
    document.body.appendChild(cursorFollow);
  }
  // cursor move
  function cursorMove(e) {
    cursorFollow.style.left = (e.clientX) + 'px';
    cursorFollow.style.top = (e.pageY) + 'px';
    currentY = e.clientY;

  }
  // update cursor position
  function updateCursorPosition(e) {
    yOffSet = window.scrollY; // y position of scroll
    cursorFollow.style.top = (currentY + yOffSet) + 'px';
  }
}

mouseFollow();

const mediaBox = document.getElementById("heading-text");


mediaBox.addEventListener("mouseover", function () {
  cursorFollow.style.border = "1px solid black";
  cursorFollow.style.width = (cursorSize * cursorScale) + 'px';
  cursorFollow.style.height = (cursorSize * cursorScale) + 'px';
});

mediaBox.addEventListener("mouseout", function () {
  cursorFollow.style.width = cursorSize + 'px';
  cursorFollow.style.height = cursorSize + 'px';
});





const images = document.querySelectorAll('.fimageelm');
const ftext = document.querySelector("#fboxtext");
const ftextElements = document.querySelectorAll('.ftextelm');
let progress = 0;

gsap.to(images[0], {
  y: `0`,
});
images.forEach((image, index) => {
  if (index === 0) {
    return
  }
  gsap.set(image, { y: "100%" });
});


// ___________________________________________________
//  scroll box based on scroll and boc is pinned
let boxoffset = 0;
gsap.to(ftext, {
  scrollTrigger: {
    trigger: ".fbox",
    pin: true,
    start: "top top",
    end: `${ftext.clientHeight * 2}px top`,
    scrub: true,
    onEnter: () => {
      boxoffset = window.scrollY;
      console.log("enter")
    },
  },
  onUpdate: (self) => {
    ftext.scrollTop = window.scrollY - boxoffset;
  },
});
// ___________________________________________________

// ___________________________________________________
// getting progress for each card secton
ftextElements.forEach((el, index) => {
  ScrollTrigger.create({
    trigger: el,
    start: "center center",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      progress = self.progress;
      syncImageProgress(progress, index + 1);
    }
  })
});
// ___________________________________________________
// scroll images cards
function syncImageProgress(progress, imageIndex) {
  if (imageIndex < images.length) {
    const image = images[imageIndex];
    gsap.to(image, {
      y: `${100 - (progress * 100)}%`,
      duration: 0.2,
      ease: "ease",
    });
  }
}

function scrollSync(){

}


// ___________________________________________________
// magnet 

const magnets = document.querySelectorAll(".magnet");
magnets.forEach((magnet,i)=>{
  magnet.addEventListener("mousemove", (e) => {
    const magnetRect = magnet.getBoundingClientRect();

    // Calculate the mouse's position relative to the magnet element
    const magnetCenterX = magnetRect.left + magnetRect.width / 2;
    const magnetCenterY = magnetRect.top + magnetRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    const distanceX = (mouseX - magnetCenterX);
    const distanceY = (mouseY - magnetCenterY);
  
    // Set a maximum distance to control how far the magnet will move
    const distanceMaxX=magnetRect.width; //max dist Y
    const distanceMaxY= magnetRect.height; //max dist Y
    const forceXfaxtor=distanceMaxX*0.22;
    const forceYfaxtor=distanceMaxY*0.62;
  
    const moveX = forceXfaxtor*(distanceX / distanceMaxX);
    const moveY = forceYfaxtor*(distanceY / distanceMaxY);
    magnet.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  
  magnet.addEventListener("mouseleave", () => {
    // Reset the position when the mouse leaves
    magnet.style.transform = "translate(0, 0)";
  });

})

