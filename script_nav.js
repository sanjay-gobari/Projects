const nav = document.getElementById("navbar");
const navList = document.getElementById("nav-list-i");
const sentinel = document.getElementById("nav-sentinel");
let isFloating = false;
let scrolledHeight = 0

window.addEventListener("load", () => {
  scrolledHeight = window.scrollY;
})

window.addEventListener("scroll", () => {
  const rect = sentinel.getBoundingClientRect();
  const outOfView = rect.bottom < -80;
  scrolledHeight = window.scrollY;

  const autoWidth = 560;
  if (outOfView && !isFloating) {
    
    if (scrolledHeight <= 100 ) {
      gsap.fromTo(nav,
        { width: "100%" },
        { duration: 0.3, width: autoWidth });
    }
    else {
      nav.style.width = autoWidth + "px"
      nav.style.borderRadius="0.25rem"
    }
isFloating = true;
  } else if (!outOfView && isFloating) {
    isFloating = false;


    gsap.fromTo(nav,
      { width: autoWidth },
      { duration: 0.3, width: "100%" });
    navList.style.justifyContent = "flex-end"


  }
})
