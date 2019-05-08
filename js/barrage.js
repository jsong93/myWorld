(() => {
  let barrage = ['hold the door', "I know death,He's got many faces"];

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

  function shoot() {
    const span = document.createElement('span');
    const span1 = document.createElement('span');
    span.className = 'barrage-span';
    span1.className = 'barrage-span';
    for (const div of divPool) {
      div.appendChild(span);
      div.appendChild(span1);
    }
    // dom.appendChild(span);
    // dom.appendChild(span1);
    span.innerHTML = barrage[0];
    span1.innerHTML = barrage[1];
    //   document.querySelector('.barrage-span').style.transform =
    //     'translateX(-100vw)';
    // 直接赋值样式不会产生动画，浏览器窗口变化 发生重绘后 才会开始动画
    //   span.style.transform = 'translateX(-100vw)';
    const translateX =
      100 + Math.ceil((span.clientWidth / window.innerWidth) * 100);
    setTimeout(() => {
      span.style.transform = `translateX(-${translateX}vw)`;
      span1.style.transform = `translateX(-${translateX}vw)`;
    });
    span.addEventListener('transitionend', () => {
      for (const div of divPool) {
        if (div.childern) {
          div.removeChild(span);
          div.removeChild(span1);
        }
      }
      //   dom.removeChild(span);
      //   dom.removeChild(span1);
      shoot();
    });
  }
  shoot();
})();
