# CommonJS
```
//importing 
const doSomething = require('./doSomething.js'); 

//exporting
module.exports = function doSomething(n) {
  // do something
}
```
在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，CommonJS不适合浏览器端模块加载

# AMD
三个api
1. require([module], callback)
2. define(id, [depends], callback)
3. require.config()
通过define来定义一个模块，然后使用require来加载一个模块, 使用require.config()指定引用路径
## 优缺点
- 适合在浏览器环境中异步加载模块
- 不能按需加载、开发成本大

# UMD
```
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```
前后端都能用

# ES6
```
import
export
```
通过babel将不被支持的import编译为当前受到广泛支持的 require

# 总结
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
- 原始值变了，import加载的值也会跟着变。ES6 模块是动态引用，并且不会缓存值。
  
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- 运行时加载：CommonJS模块是一个对象，输入时是先加载整个模块，生成一个对象。这种加载称为运行时加载。
- 编译时加载：ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时可以指定加载某个输出值，而不是加载整个模块。
这种加载称为编译时加载。
CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成