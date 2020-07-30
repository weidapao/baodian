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