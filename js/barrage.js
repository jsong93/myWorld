(() => {
  let texts = [
    'hold the door',
    "I know death,He's got many faces",
    "Nothing someone says before the word 'but' really counts",
    'There is only one God ,and his name is Death',
    " And there is only one thing we say to Death:'Not today'",
    'A Lannister always pays his debts',
    'Yow know nothing , Jon Snow',
    '听我誓言，做吾见证',
    '长夜将至，我从今开始守望',
    '我将不娶妻，不封地，不生子',
    '我将不戴王冠，不争荣宠',
    '我将尽忠职守，生死于斯',
    '我是黑暗中的利剑',
    '长城上的守卫',
    '抵御寒冷的烈焰',
    '破晓时分的光线',
    '唤醒眠者的号角',
    '守护国王的坚盾',
    '我将生命与荣耀献给守夜人',
    '今夜如此，夜夜皆然',
    'Valar Morghulis.Valar Dohaeris',
    'The man who fears losing has already lost',
    'Hear my words,and bear witness to my vow',
    'Night gathers,and now my watch begins',
    'I shall take no wife,hold no lands,father no children',
    'I shall wear no crowns and win no glory',
    'I shall live and die at my post',
    'I am the sword in the darkness',
    'I am the watcher on the walls',
    'I am the fire that burns against the cold',
    'the light that brings the dawn',
    'the horn that wakes the sleepers',
    'the shield that guards the realms of men',
    "I pledge my life and honor to the Night's Watch",
    'for this night',
    'and all the nights to come'
  ];

  //   let texts = ['hold the door', '19', '17', '16', '15', '14', '13', '12'];

  let textsCopy = [...texts];
  //   const dom = document.querySelector('.barrage');
  const dom = document.querySelector('#barrage-board');

  const rows = 6,
    divPool = [];
  for (let i = 0; i < rows; i++) {
    const div = document.createElement('div');
    div.className = 'barrage';
    divPool.push(div);
    dom.appendChild(div);
  }
  //   const rows = 6,
  //     column = 10;

  //   function barragePool() {
  //     for (let i = 0; i < rows; i++) {
  //       for (let j = 0; j < column; j++) {

  //       }
  //     }
  //   }

  function addSpan(div, text) {
    console.log(text);
    const span = document.createElement('span');
    span.className = 'barrage-span';
    span.innerHTML = text;

    // dom.appendChild(span);
    // dom.appendChild(span1);
    //   document.querySelector('.barrage-span').style.transform =
    //     'translateX(-100vw)';
    // 直接赋值样式不会产生动画，浏览器窗口变化 发生重绘后 才会开始动画
    //   span.style.transform = 'translateX(-100vw)';
    const translateX =
      100 + Math.ceil((span.clientWidth / window.innerWidth) * 100);
    setTimeout(() => {
      span.style.transform = `translateX(-${translateX}vw)`;
      // span1.style.transform = `translateX(-${translateX}vw)`;
    }, 500);

    div.appendChild(span);
    //   console.log(span.offsetLeft);
    // div.appendChild(span1);

    span.addEventListener('transitionend', () => {
      span.parentElement.removeChild(span);
    });
  }

  function shoot(text) {
    console.log(text);
    let success = false;
    for (const div of divPool) {
      if (div.children) {
        const l = div.children.length;
        if (l) {
          // 为什么会有负数
          const transformX = window
              .getComputedStyle(div.children[l - 1])
              .getPropertyValue('transform')
              .split(',')[4],
            windowX = window.innerWidth,
            domX = div.children[l - 1].clientWidth;
          //   if (transformX < 0) {
          //     console.log(1);
          //     continue;
          //   }
          console.log(transformX, windowX, domX);
          if (transformX < 0 || transformX + domX < windowX * 0.2) {
            addSpan(div, text);
            success = true;
            break;
          }
        } else {
          addSpan(div, text);
          success = true;
          break;
        }
      } else {
        addSpan(div, text);
        success = true;
        break;
      }
    }
    if (!success) {
      // 会卡 为社么呢 掉多了吗
      // 防抖
      //   setTimeout(shoot(text), 3000);
    }
  }
  //   shoot();

  setInterval(() => {
    if (textsCopy.length) {
      shoot(textsCopy.shift());
    } else {
      textsCopy = [...texts];
    }
    // console.log(
    //   window
    //     .getComputedStyle(divPool[0].children[0])
    //     .getPropertyValue('transform')
    // );
    // console.log(divPool[0].children[0].offsetLeft);
    // console.log(divPool[0].children[0].scrollLeft);
  }, 1000);
})();
