gsap.registerPlugin(ScrollTrigger);

// Initial state of section2
gsap.set("#section2", { opacity: 0, scale: 0.9, borderRadius: "2rem" });

ScrollTrigger.create({
  trigger: "#section1",
  start: "top top",
  end: "80% top",
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    gsap.to("#section1", {
      opacity: 1 - progress,
      scale: 1 - progress * 0.05,
      overwrite: true,
    });
    gsap.to("#section2", {
      opacity: progress + 0.5,
      scale: 0.9 + progress * 0.1,
      overwrite: true,
      borderRadius: (2 - (progress * 2)) + "rem"
    });
  }
});


  // Split letters into spans
  const h2 = document.querySelector("#work-msg");
  const text = h2.textContent.trim();
  h2.innerHTML = text
    .split("")
    .map(letter =>
      letter === " "
        ? `<span class="letter space">&nbsp;</span>`
        : `<span class="letter">${letter}</span>`
    ).join("");


gsap.fromTo(".letter",
  {
    y: 40,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.02,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#work-msg",
      start: "top 90%", // when .work-msg top reaches 90% of viewport height
      toggleActions: "play none none none"
    }
  }
);

// 

const toolsH2 = document.querySelector("#tools-heading");
  const text2 = toolsH2.textContent.trim();
  toolsH2.innerHTML = text2
    .split("")
    .map(letter =>
      letter === " "
        ? `<span class="letter2 space">&nbsp;</span>`
        : `<span class="letter2">${letter}</span>`
    ).join("");
// 
gsap.fromTo(".letter2",
  {
    y: 40,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.02,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#tools-heading",
      start: "top 90%", // when .work-msg top reaches 90% of viewport height
      toggleActions: "play none none none"
    }
  }
);
// 
gsap.fromTo(".tools",
  {
    y: 30,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".tools-w",
      start: "top 70%", // when .work-msg top reaches 90% of viewport height
      toggleActions: "play none none none"
    }
  }
);

gsap.fromTo(".about-img-w",
  {
    opacity: 0
  },
  {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-w",
      start: "top 70%", // when .work-msg top reaches 90% of viewport height
      toggleActions: "play none none none"
    }
  }
);



gsap.fromTo(".about-text-heading-1,.about-text-heading-2",
  {
    opacity: 0
  },
  {
    opacity: 1,
    duration: 2,
    ease: "linear",
    scrollTrigger: {
      trigger: ".about-w",
      start: "top 90%", // when .work-msg top reaches 90% of viewport height
      toggleActions: "play none none none"
    }
  }
);

gsap.fromTo(".about-text-p", 
  {
    yPercent:100,
  },
{  yPercent:0,
  opacity: 1,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".text-mask",
    start: "top 60%",
    toggleActions: "play none none none",
  }}

);


