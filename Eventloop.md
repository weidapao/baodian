# Eventloop 事件循环
nodejs是单线程的，操作系统是多线程的，当某个操作结束了，操作系统就会通知nodejs，node就把对应的回调函数添加到poll(轮询)队列，
最终这些回调函数会被执行

## Event Loop 详解
Node.js 启动时
1. 初始化eventloop
2. 开始执行脚本
3. 开始处理 event loop
每个阶段都有一个先入先出的队列，存有要执行的回调函数

## timers
用来存储setTimeout事件
这个阶段执行 setTimeout 和 setInterval 的回调函数
遇到代码setTimeout(fn,1000)，把fn放到timers的队列里面

## poll(轮询阶段)
获取新的 I/O 事件
等待时间到去check阶段
poll 阶段空闲了，同时存在 setImmediate() 任务，event loop 就会进入 check 阶段

## check

setImmediate(fn)
执行 setImmediate() 的回调函数

setTimeout(fn,0)
setImmediate(fn2)
不一定谁先执行，得看eventloop在哪个阶段
process.nextTick不属于eventloop,当前阶段结束之后马上执行，微任务
promise.then一般是用nextTick来实现

# Chrome

## 宏任务macrotask
一会儿

## 微任务microtask
马上

## 常见题目
```
setTimeOut(fn,0)
setImmediate(fn2)
```
不确定谁先执行。
原因：
1.开启eventloop
2.执行js代码
开启eventloop的速度不确定，执行js的时候可能处于timers阶段，就先执行setTimeOut

大部分时间处于poll阶段，poll阶段下一步到check阶段，setImmediate在check阶段执行，所以一般setImmediate优先级更高。
process.nextTick不属于eventloop,当前阶段结束之后马上执行，微任务
promise.then一般是用nextTick来实现