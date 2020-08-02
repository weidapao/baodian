```
let x = 'x'
let a =1
function f2(x){
    return x+a
}
{
    let a = 2
    f2('x')
}
```
a是环境不是参数，所以看函数f2定义的时候a是什么。
a是定义时的a,不是执行时的a
## 闭包
如果在函数里面可以访问外面的变量，那么
这个函数+这些变量=闭包

```
for(var i =0;i<6;i++){
    setTimeout(() => {
        console.log(i)
    }, 0);
}
```
打印6 6 6 6 6 6 
1. 把var改成let
2. 立即执行函数
```
for(var i =0;i<6;i++){
    !function(c){
    setTimeout(() => {
        console.log(c)
    }, 0);
    }(i)
}
```

### 闭包的特点
- 能让一个函数维持住一个变量

### 对象是穷人的闭包
```
var obj = {
    i:0,
    fn(){
        console.log(this.i)
    }
}
obj.fn()
```
维持一个变量

### 闭包是穷人的对象
```
function Person(name,age){
    return function(key){
        if(key==='name'){
            return name
        }
        if(key==='age'){
            return age
        }
    }
}

var c = Person('jack',23)
console.log(c('name'))
console.log(c('age'))
```
用闭包来模拟一个对象

## this
this是参数，隐式参数