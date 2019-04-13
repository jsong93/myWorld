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
