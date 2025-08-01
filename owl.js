function createElement(tag, className, styles = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.assign(el.style, styles);
  return el;
}

const owl = document.querySelector('.owl');

const owlBody = createElement('div', 'owlBody');

const eyeLeft = createElement('div', 'eye left eye1');
const pupilLeft = createElement('div', 'pupil pupil1');
eyeLeft.appendChild(pupilLeft);

const eyeRight = createElement('div', 'eye right eye2');
const pupilRight = createElement('div', 'pupil pupil2');
eyeRight.appendChild(pupilRight);

const beak = createElement('div', 'beak');
const belly = createElement('div', 'belly');

const feet = createElement('div', 'feet');
const toe1 = createElement('div', 'toe');
const toe2 = createElement('div', 'toe');
feet.append(toe1, toe2);

const wing1 = createElement('div', 'wingL');
const wing2 = createElement('div', 'wingR');


owl.append(owlBody,eyeLeft, eyeRight, beak, belly, feet, wing1, wing2);




// eye track

const eye1 = document.querySelector('.eye1');
const pupil1 = document.querySelector('.pupil1');
const eye2 = document.querySelector('.eye2');
const pupil2 = document.querySelector('.pupil2');

const eyeRect1 = eye1.getBoundingClientRect();
const eyeRect2 = eye2.getBoundingClientRect();
const owlRect = owl.getBoundingClientRect();

document.addEventListener('mousemove', (event) => {
  moveElem(event, eyeRect1, pupil1);
  moveElem(event, eyeRect2, pupil2);
  moveElem(event, owlRect, owl);


});

function moveElem(event, elmRect, elm) {
  const eyeCenterX = elmRect.left + elmRect.width / 2;
  const eyeCenterY = elmRect.top + elmRect.height / 2;

  const deltaX = event.clientX - eyeCenterX;
  const deltaY = event.clientY - eyeCenterY;

  const distance = Math.min(8, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
  const angle = Math.atan2(deltaY, deltaX);

  const elmX = Math.cos(angle) * distance;
  const elmY = Math.sin(angle) * distance;

const factor = 0.3
  if(elm.classList.contains("owl")){
    elm.style.transform = `translate(${elmX}px, ${elmY}px) rotate(${elmX*factor}deg)`;
  }
  else{
      elm.style.transform = `translate(${elmX}px, ${elmY}px)`;
  }
}
