// import { resolve } from 'dns';

(_ => {
  // let texts = [
  //   'hold the door',
  //   "I know death,He's got many faces",
  //   "Nothing someone says before the word 'but' really counts",
  //   'There is only one God ,and his name is Death',
  //   " And there is only one thing we say to Death:'Not today'",
  //   'A Lannister always pays his debts',
  //   'Yow know nothing , Jon Snow',
  //   '听我誓言，做吾见证',
  //   '长夜将至，我从今开始守望',
  //   '我将不娶妻，不封地，不生子',
  //   '我将不戴王冠，不争荣宠',
  //   '我将尽忠职守，生死于斯',
  //   '我是黑暗中的利剑',
  //   '长城上的守卫',
  //   '抵御寒冷的烈焰',
  //   '破晓时分的光线',
  //   '唤醒眠者的号角',
  //   '守护国王的坚盾',
  //   '我将生命与荣耀献给守夜人',
  //   '今夜如此，夜夜皆然',
  //   'Valar Morghulis.Valar Dohaeris',
  //   'The man who fears losing has already lost',
  //   'Hear my words,and bear witness to my vow',
  //   'Night gathers,and now my watch begins',
  //   'I shall take no wife,hold no lands,father no children',
  //   'I shall wear no crowns and win no glory',
  //   'I shall live and die at my post',
  //   'I am the sword in the darkness',
  //   'I am the watcher on the walls',
  //   'I am the fire that burns against the cold',
  //   'the light that brings the dawn',
  //   'the horn that wakes the sleepers',
  //   'the shield that guards the realms of men',
  //   "I pledge my life and honor to the Night's Watch",
  //   'for this night',
  //   'and all the nights to come'
  // ];

  //   let texts = ['hold the door', '19', '17', '16', '15', '14', '13', '12'];

  // let textsCopy = [...texts];
  let texts = [],
    textsCopy = [];
  //   const dom = document.querySelector('.barrage');
  const dom = document.querySelector('#barrage-board'),
    shootButton = document.querySelector('#shoot'),
    shootInput = document.querySelector('#shoot-text'),
    inputValue = document.querySelector('#input-value'),
    xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);

        // const promise = new Promise(resolve => {
        //   resolve(_.map(JSON.parse(xhr.responseText), 'content'));
        // });
        // promise.then(value => {
        //   setInterval(() => {
        //     if (textsCopy.length) {
        //       shoot(textsCopy.shift());
        //     } else {
        //       textsCopy = [...texts];
        //     }
        //   }, 1000);
        // });
        texts = _.map(JSON.parse(xhr.responseText), 'content');
        textsCopy = [...texts];
        setInterval(() => {
          if (textsCopy.length) {
            shoot(textsCopy.shift());
          } else {
            textsCopy = [...texts];
          }
        }, 1000);
      } else {
        console.error(xhr.statusText);
      }
    }
  };

  xhr.onerror = () => {
    console.error(xhr.statusText);
  };
  xhr.open('GET', '/barrage', true);
  xhr.send();

  const postXhr = new XMLHttpRequest();
  postXhr.onreadystatechange = () => {
    if (postXhr.readyState === 4) {
      if (postXhr.status === 200) {
        console.log(postXhr.responseText);
      } else {
        console.error(postXhr.statusText);
      }
    }
  };

  postXhr.onerror = () => {
    console.error(postXhr.statusText);
  };

  shootButton.addEventListener('click', shootClick);
  // shootButton.addEventListener('touch', shootClick);

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

  function shootClick() {
    const value = document.querySelector('#shoot-text').value;
    if (value && value.length) {
      // console.log('shoot ');
      texts.unshift(value);
      textsCopy.unshift(value);
      shootInput.value = null;
      inputValue.innerHTML = value;
      inputValue.style.animation = 'text-an 5s linear 1';
      setTimeout(() => {
        inputValue.style.animation = null;
      }, 500);

      shootInput.blur();
      // 在linux环境中会发生重定向，301，在windows中没事
      // postXhr.open('POST', '/barrage', true);
      // 在windows中有问题，这是什么鬼
      // nginx配错了 傻x
      postXhr.open('POST', '/barrage', true);
      postXhr.setRequestHeader('Content-Type', 'application/json');
      postXhr.send(JSON.stringify({ barrage: value }));
    }
  }

  function addSpan(div, text) {
    // console.log(text);
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
    // console.log(text);
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
          // console.log(transformX, windowX, domX);
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
})(_);
