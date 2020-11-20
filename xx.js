function myInterval(fn, ms) {
  let ref = null;
  const exec = () => {
    return setTimeout(() => {
      fn.apply(null);
      const timer = exec();
      ref = timer;
    }, ms);
  };
  ref = exec();
  return ref;
}

function myClearInterval(ref) {
  clearTimeout(ref);
}

timer1 = myInterval(()=>{
  console.log(1111)
},1000)

setTimeout(()=>{
  myClearInterval(timer1)
},5000)