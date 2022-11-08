const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let mouseX = width / 2;
let mouseY = height / 2;

let circle = {
  radius: 10,
  lastX: mouseX,
  lastY: mouseY,
};

const elems = [...document.querySelectorAll('[data-hover]')];

function onResize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function render() {
  circle.lastX = lerp(circle.lastX, mouseX, 0.25);
  circle.lastY = lerp(circle.lastY, mouseY, 0.25);

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.closePath();

  requestAnimationFrame(render);
}

function init() {
  requestAnimationFrame(render);

  window.addEventListener('mousemove', function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  window.addEventListener('resize', onResize, false);

  let tween = TweenMax.to(circle, 0.25, {
    radius: circle.radius * 3,
    ease: Power1.easeInOut,
    paused: true,
  });

  elems.forEach(el => {
    el.addEventListener(
      'mouseenter',
      () => {
        tween.play();
      },
      false
    );
    el.addEventListener(
      'mouseleave',
      () => {
        tween.reverse();
      },
      false
    );
  });
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

init();
