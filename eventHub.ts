class EventHub {
  private cache :{[key:string]:Array<(data:unknown)=>void>}= {}
  on(eventname:string,fn:(data:unknown)=>void){
    this.cache[eventname] = this.cache[eventname]||[]
    this.cache[eventname].push(fn)
  }
  emit(eventname,data?:unknown){
    const fnList = this.cache[eventname] || []
    fnList.map(fn=>fn(data))
  }
  off(eventname,fn){
    const fnList = this.cache[eventname]||[]
    if(fnList.indexOf(fn)>-1){
      fnList.splice(fnList.indexOf(fn),1)
    }
  }
}
// test
type TestCase = (message: string) => void;

const test1: TestCase = message => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, "eventHub 是个对象");
  console.log(message);
};

const test2: TestCase = message => {
  const eventHub = new EventHub();
  // on emit
  let called = false;
  eventHub.on("xxx", y => {
    called = true;
    console.assert(y[0] === "今天林志玲结婚了");
    console.assert(y[1] === "言承旭无话可说");
  });
  eventHub.emit("xxx", ["今天林志玲结婚了", "言承旭无话可说"]);
  console.assert(called);
  console.log(message);
};

const test3: TestCase = message => {
  const eventHub = new EventHub();
  let called = false;
  const fn1 = () => {
    console.log('hhhhh')
    called = true;
  };

  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);
  eventHub.emit("yyy");
  console.assert(called === false,'失败');
  console.log(message);
};

test1("EventHub 可以创建对象");
test2(".on 了之后 .emit，会触发 .on 的函数");
test3(".off 有用");