window.onload = function () {
  window.mdc = '';
  this.app = document.getElementById('app');
  this.welcome = document.createElement('div');
  this.canvas = document.createElement('canvas');
  loadWelcome();
  loadColor();
  loadCanvas();
  loadbtn();
};
const colors = [
  {
    color: 'E2A2AC',
    name: '彤管',
  },
  {
    color: 'DD6B7B',
    name: '渥赭',
  },
  {
    color: 'C25160',
    name: '唇脂',
  },
  {
    color: 'BB1A35',
    name: '朱孔阳',
  },
  {
    color: 'A2D2E2',
    name: '云门',
  },
  {
    color: '87C0CA',
    name: '西子',
  },
  {
    color: '5AA4AE',
    name: '天水碧',
  },
  {
    color: '108B96',
    name: '法翠',
  },
  {
    color: 'E5B087',
    name: '骍刚',
  },
  {
    color: 'F18F60',
    name: '赪霞',
  },
  {
    color: 'EF845D',
    name: '赪尾',
  },
  {
    color: 'ED6D46',
    name: '朱柿',
  },
  {
    color: 'D3CCD6',
    name: '香炉紫烟',
  },
  {
    color: '9B8EA9',
    name: '紫菂',
  },
  {
    color: '806D9A',
    name: '槿紫',
  },
  {
    color: '663D74',
    name: '三公紫',
  },
  {
    color: '6A8D52',
    name: '石发',
  },
  {
    color: '5D8351',
    name: '漆姑',
  },
  {
    color: '4F794A',
    name: '芰荷',
  },
  {
    color: '2A6E3F',
    name: '官绿',
  },
  {
    color: '106898',
    name: '柔蓝',
  },
  {
    color: '12507B',
    name: '碧城',
  },
  {
    color: '06436F',
    name: '蓝采合',
  },
  {
    color: '003460',
    name: '帝释青',
  },
];
function loadWelcome() {
  welcome.className = 'welcome';
  welcome.id = 'welcome';
  welcome.innerHTML = '<div class="title" >中国传统色</div>';
  const bcg = document.createElement('bcg');
  bcg.className = 'bcg';
  bcg.id = 'bcg';
  bcg.style = '';
  [...colors, ...colors, ...colors].forEach(f => {
    let div = document.createElement('div');
    div.className = `colorBox ${f.color} ${f.name}`;
    div.id = `${f.color} ${f.name}`;
    div.style = `
      background: #${f.color};
    `;
    div.innerHTML = `
      <a color="${f.color}" 
        style="background:#${f.color};color:black;text-align: center;" 
        href="#${f.name + '-' + f.color}"
        colorName="${f.name}"
        color="${f.name}">
        ${f.name}
      </a>`;
    bcg.appendChild(div);
  });
  welcome.appendChild(bcg);
  app.appendChild(welcome);
}
function loadCanvas() {
  canvas.className = 'canvas';
  canvas.id = 'canvas';

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;

  let circle = {
    radius: 50,
    lastX: mouseX,
    lastY: mouseY,
  };
  const elems = [...document.querySelectorAll('[color]')];

  init();

  welcome.appendChild(canvas);

  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function render(fillStyle = '#ffffff') {
    circle.lastX = lerp(circle.lastX, mouseX, 0.25);
    circle.lastY = lerp(circle.lastY, mouseY, 0.25);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = fillStyle;
    ctx.moveTo(300, 300);
    ctx.font = '20px "微软雅黑"'; //设置字体
    ctx.font = '30px Verdana';
    //设置线性渐变色
    ctx.fillText(window.mdc, 20, 50);
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
      radius: circle.radius * 2,
      ease: Power1.easeInOut,
      paused: true,
    });

    elems.forEach(el => {
      el.addEventListener(
        'mouseenter',
        e => {
          ctx.fillStyle = el.style.background;
          window.mdc =
            el.getAttribute('colorName') + ' #' + el.getAttribute('color');
          const ele = document.querySelector('.title');
          console.log(ele);
          ele.innerHTML = window.mdc;
          ele.style.color = '#' + el.getAttribute('color');
          requestAnimationFrame(render);
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
}
function loadColor() {
  const container = document.createElement('div');
  container.className = 'container';
  colors.forEach(f => {
    const div = document.createElement('div');
    div.className = `colorline ${f.color} ${f.name}`;
    div.id = `${f.name}-${f.color}`;
    div.style = `
        background:#${f.color};
        font-size:10rem;
        `;
    div.innerHTML = f.name;
    container.appendChild(div);
  });
  app.appendChild(container);
}
function loadbtn() {
  const btnlist = document.createElement('button');
  const topBtn = document.createElement('button');

  btnlist.id = 'btn' + 1;
  btnlist.className = 'btn' + 1 + ' btn-right button';
  btnlist.innerHTML = '栅格模式';
  btnlist.addEventListener('click', function (e) {
    const text = e.target.textContent;
    if (text == '隐藏模式') {
      document.getElementsByClassName('title')[0].style = `
        background:black;
        Visibility:visible;
      `;
      e.target.textContent = '栅格模式';
    } else {
      document.getElementsByClassName('title')[0].style = `
        Visibility:hidden;
        background:rgba(0, 0, 0, 0);
      `;
      e.target.textContent = '隐藏模式';
    }
  });

  topBtn.id = 'btn' + 1;
  topBtn.className = 'btn' + 1 + ' btn-right button';
  topBtn.innerHTML = '回到顶部';
  topBtn.style = `top:60px;`;
  topBtn.addEventListener('click', setScroll);
  app.appendChild(btnlist);
  app.appendChild(topBtn);
}
// 回到顶部
function setScroll() {
  let timer = setInterval(() => {
    let base = getScroll();
    console.log(tag);
    if (base <= 1 || tag) {
      // 当滚轮往下滚动时tag为true，停止到达顶部
      clearInterval(timer);
    }
    document.documentElement.scrollTop = base - Math.pow(base, 3 / 5); // 速度可自己调整
  }, 20);
}
// 获取当前位置到顶部的距离
function getScroll() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  );
}
let tag = false;
