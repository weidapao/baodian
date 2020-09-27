function express() {
  var funcs = []; // 待执行的函数数组
  var app = function(req,res){
    var i = 0;
    var next = function(){
      var fn = funcs[i]
      i++
      if (!fn) {    // 如果函数不存在,return
          return;
      }
      fn(req,res,next)
    }
    next()
  }
  app.use = function(task){
    funcs.push(task);
  }
  return app
}

const http = require('http')

var app = express();
http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});

function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next();
    console.log('middlewareA after next()');
}

function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    next();
    console.log('middlewareB after next()');
}

function middlewareC(req, res, next) {
    console.log('middlewareC before next()');
    next();
    console.log('middlewareC after next()');
}

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);