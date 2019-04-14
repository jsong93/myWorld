(function($) {
  $.fn.typewriter = function() {
    this.each(function() {
      var $ele = $(this),
        str = $ele.html(),
        progress = 0;
      $ele.html('');
      var timer = setInterval(function() {
        var current = str.substr(progress, 1);
        if (current === '<') {
          progress = str.indexOf('>', progress) + 1;
        } else {
          progress++;
        }
        $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
        if (progress >= str.length) {
          clearInterval(timer);
        }
      }, 300);
    });
    return this;
  };
})(jQuery);

$('#code').typewriter();

function timeElapse(date) {
  var current = Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = '0' + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  var result =
    '<span class="digit">' +
    days +
    '</span> 天 <span class="digit">' +
    hours +
    '</span> 小时 <span class="digit">' +
    minutes +
    '</span> 分钟 <span class="digit">' +
    seconds +
    '</span> 秒';
  $('#careerClock').html(result);
}

var together = new Date();
together.setFullYear(2016, 8, 1);
together.setHours(0);
together.setMinutes(0);
together.setSeconds(0);
together.setMilliseconds(0);
if (!document.createElement('canvas').getContext) {
  var msg = document.createElement('div');
  msg.id = 'errorMsg';
  msg.innerHTML =
    "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
  document.body.appendChild(msg);
  $('#code').css('display', 'none');
  $('#copyright').css('position', 'absolute');
  $('#copyright').css('bottom', '10px');
  document.execCommand('stop');
} else {
  timeElapse(together);
  setInterval(function() {
    timeElapse(together);
  }, 500);
}
/* 鼠标特效 */
// var a_idx = 0;
// jQuery(document).ready(function() {("body").click(function(e) {
// var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
// var i=("<span/>").text(a[a_idx]);
// a_idx = (a_idx + 1) % a.length;
// var x = e.pageX,
// y = e.pageY;
// i.css("z−index":11111,"top":y−20,"left":x,"position":"absolute","font−weight":"bold","color":"rgb(72,85,137)");
// ("body").append(i);i.animate({
// "top": y - 180,
// "opacity": 0
// },
// 1500,
// function() {
// $i.remove();
// });
// });
// });
