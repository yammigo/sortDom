function debounce(before, after, wait) {
    /*option说明： before [事件触发时立即执行的函数]; 
                   after [回调函数]; 
                   wait [回调触发延迟时间ms]
    */
     var timer
     return function() {
         before && before();
         timer && clearTimeout(timer);
         timer = setTimeout(function() {
             after && after();
             timer = null;
         }, wait);
     }
 }