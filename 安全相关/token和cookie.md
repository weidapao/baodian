# token
token 也称作令牌，由uid+time+sign[+固定参数]
token 的认证方式类似于临时的证书签名, 并且是一种服务端无状态的认证方式,所谓无状态就是服务端并不会保存身份认证相关的数据

## 组成
- uid: 用户唯一身份标识
- time: 当前时间的时间戳
- sign: 签名, 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
- 固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库

## 存放
token在客户端一般存放于localStorage，cookie，或sessionStorage中。在服务器一般存于数据库中

## token可以抵抗csrf，cookie+session不行
1. 浏览器不会自动添加到headers里，攻击者也无法访问用户的token
2. 浏览器会自动带上cookie

## xss攻击(Cross Site Scripting) 跨站脚本攻击
原理：攻击者在web页面中会插入一些恶意的script代码,用户浏览器渲染html文档的过程中，脚本执行，达到恶意攻击用户的目的。
防御：首先前端要对用户输入的信息进行过滤，可以用正则，通过替换标签的方式进行转码或解码，少用.innerHTML、.outerHTML、document.write()
HTTP-only Cookie：浏览器将禁止页面的 Javascript 访问带有 HttpOnly 属性的 Cookie

## CSRF攻击(cross site request forgery,跨站请求伪造)
原理: 攻击者盗用用户的身份信息，并以用户的名义进行发送恶意的请求
例子: 一个恶意攻击者可以在另一个网站上放置如下代码`<img src="https://bank.example.com/withdraw?account=Alice&amount=1000&for=Badman" />`,用户访问就会发起这个请求。可以将这种地址藏在论坛，博客等任何用户生成内容的网站中。
防御: 
1. 用token
2. 检查Referer字段:这个字段用以标明请求来源于哪个地址,如果是CSRF攻击传来的请求，Referer字段会是包含恶意网址的地址，不会位于bank.example.com之下，这时候服务器就能识别出恶意的访问。