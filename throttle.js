function throttle(after, wait) {
    /*option说明：after [回调函数]; 
                  wait  [周期性执行回调间隔时间ms]
     */
     var timer;
     var isScroll; //是否正在执行回调
     return function() {
         if (isScroll) return; //在回调函数未执行完以前
         isScroll = true;
         timer && clearTimeout(timer);
         timer = setTimeout(function() {
             after && after();
             isScroll = false;
             timer = null;
         }, wait);
     }
 }