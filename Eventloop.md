# Eventloop 事件循环
轮询
有一个程序在不停地等操作系统完成

## timers
用来存储setTimeout事件
setTimeout(fn,1000)
把fn放到timers的队列里面

## poll
等待时间到去check阶段

## check
存setimmediate(fn)

setTimeout(fn,0)
setimmediate(fn2)
不一定谁先执行，得看eventloop在哪个阶段
process.nextTick不属于eventloop,当前阶段结束之后马上执行，微任务
promise.then一般是用nextTick来实现

# Chrome

## 宏任务macrotask
一会儿

## 微任务microtask
马上