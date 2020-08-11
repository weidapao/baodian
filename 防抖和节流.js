function debounce(fn, delay){
  let timerId = null
  return function(){
      const context = this
      if(timerId){window.clearTimeout(timerId)}
      timerId = setTimeout(()=>{
          fn.apply(context, arguments)
          timerId = null
      },delay)
  }
}

// 时间戳版
function throttle(func, wait) {
  var previous = 0;
  return function() {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
      }
  }
}

// 时间到之后把time设置为null，然后才能执行下次
function throttle2(func, wait) {
  let timeout;
  return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
          timeout = setTimeout(() => {
              timeout = null;
              func.apply(context, args)
          }, wait)
      }

  }
}

var throttle3 = function(func, delay) {
  var timer = null;
  var startTime = Date.now();
  return function() {
          var curTime = Date.now();
          var remaining = delay - (curTime - startTime);
          var context = this;
          var args = arguments;
          clearTimeout(timer);
           if (remaining <= 0) {
                 func.apply(context, args);
                 startTime = Date.now();
           } else {
                 timer = setTimeout(func, remaining);
           }
   }
}

var a = debounce(()=>{console.log(3)},3000)
a()
a()
a()
a()
a()
a()