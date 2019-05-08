(() => {
  let barrage = ['hold the door'];

  const dom = document.querySelector('#barrage');
  const span = document.createElement('span');
  span.className = 'barrage-span';
  dom.appendChild(span);
  span.innerHTML = barrage[0];
  //   document.querySelector('.barrage-span').style.transform =
  //     'translateX(-100vw)';
  // 直接赋值样式不会产生动画，浏览器窗口变化 发生重绘后 才会开始动画
  //   span.style.transform = 'translateX(-100vw)';
  const translateX =
    100 + Math.ceil((span.clientWidth / window.innerWidth) * 100);
  setTimeout(() => {
    span.style.transform = `translateX(-${translateX}vw)`;
    // span.style.transform = `translateX(-100vw)`;
  });
  span.addEventListener('transitionend', () => {
    span.style.transform = null;
  });
})();
