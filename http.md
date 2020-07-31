# HTTP
## 定义
HyperText Transfer Protocol，超文本传输协

## TCP/IP协议
- 应用层 http、ftp、dns
- 传输层， tcp、udp
- 网络层 ip
- 数据链路层
发送端（每通过一层，增加首部）从应用层往下走，接收端（每通过一层，删除首部）则往应用层往上走

## 三次握手
- 发送端发送一个带有SYN的数据包
- 接收端收到数据包，发送SYN/ACK的数据包，传达确认信息
- 发送端回传带有ACK的数据包，结束

## http报文
```
HTTP/1.1 200 OK
Date: Tue, 10 Jul 2012 06:50:15 GMT
Content-Length: 362
Content-Type: text/html

<html>
```
http协议版本 状态码 状态码原因短语
首部字段
回车
内容实体

## 请求方法
### GET
获取资源
### POST
传输实体的主体
### PUT
传输文件
### HEAD
获得报文首部
### DELETE
删除文件
### OPTIONS
询问支持的方法
### TRACE
追踪路径

## 持久连接节省通信量
每次请求都会造成无谓的tcp连接建立和断开，增加通信的开销量

### 持久连接
HTTP keep-alive
只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。
建立一次tcp连接后，进行多次请求和响应交互
HTTP/1.1 中，所有的连接默认都是持久连接 

### 管线化
发送请求后，不用等待响应，可直接发送下一个请求

## 使用Cookie状态管理
根据服务端发送的响应报文内一个set-cookie首部字段信息，下次客户端向服务端发送请求时，客户端会自动在请求报文中
加入cookie。

## HTTP状态码
- 1XX 接收的请求正在处理
- 2xx success 请求正常处理完毕
- 3xx 重定向 需要附加操作
- 4xx 客户端错误 服务器无法处理请求
- 5xx 服务器错误
## 重定向
### 永久性重定向 301
请求的资源已经被分配了新的uri
### 临时性重定向 302
### 304 not modified
客户端发送带条件的请求，服务端允许请求访问资源，但没有满足条件的情况。
### 403 Forbidden
对请求资源的访问被服务器拒绝了
### 404 Not Found
无法找到请求资源
### 500
### 503 Service Unavailable
服务器处于超负载状态、或正在进行停机维护，无法处理请求

## 代理
客户端---代理服务器(转发)---源服务器(持有资源实体)

## 缓存
### 强制缓存
在缓存数据未失效的情况下，不需要再和服务器发生交互
Expires和Cache-Control
#### Expires服务器告诉浏览器缓存的过期时间(浏览器和服务器时间不同步的问题)

#### Cache-Control
通用首部字段Cache-Control,请求报文和响应报文双方都会使用的首部
cache-Control: private, max-age=0, no-cache 参数用逗号分隔
- private 缓存服务器只能给特定用户提供缓存服务
- no-cache 目的:防止从缓存中返回过期的资源
- max-age 客户端发送的指令里带max-age,如果判定资源缓存时间比指定时间小，客户端就接收缓存资源
max-age=0，缓存服务器通常要把请求转发给源服务器

缺点: 时间到了但是文件没有改变，还是会去请求一次服务器

### 协商缓存
需要进行比较判断是否可以使用缓存。强制缓存优先级高于协商缓存。
ETag
返回文件的唯一标识ETag，只有当文件内容改变时，ETag才改变。
浏览器的缓存文件过期时，浏览器带上请求头(If-None-Match)相当于上一次发来的Etag
服务器比较If-None-Match和文件的ETag，一致就返回304，使用本地缓存。
不一致就返回文件内容和ETag
Last-Modified
浏览器请求，服务器返回并带上文件上次修改时间 Last-Modified
浏览器缓存文件过期，浏览器带上请求头If-Modified-Since请求服务器
服务器比较If-Modified-Since和文件上次修改时间。一致就返回304，使用本地缓存。
不一致返回文件内容和Last-Modified

### 缓存的优先级
Pragma > Cache-Control > Expires > ETag > Last-Modified

## HTTPS