# webpack
## 基本概念
- Entry: 入口，webpack构建第一步从entry开始
- module:模块，在webpack中一个模块对应一个文件。webpack会从entry开始，递归找出所有依赖的模块
- Chunk：代码块，一个chunk由多个模块组合而成，用于代码合并与分割
- Loader: 模块转换器，对接收到的内容进行转换，返回转换后的结果(webpack只认识js)
- Plugin: 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

## 构建流程
1. 初始化参数: 从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译: 用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口: 根据配置中的 entry 找出所有的入口文件
4. 编译模块: 从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模块编译: 在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

缩略版
- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## 输出文件分析
### 单个bundle.js
```
(function(modules) {

  // 模拟 require 语句
  function __webpack_require__() {
  }

  // 执行存放所有模块数组中的第0个模块
  __webpack_require__(0);

})([/*存放所有模块的数组*/])
```
一个立即执行函数，原来一个个独立的模块文件被合并到了一个单独的 bundle.js，把所有模块都存放在了数组中，执行一次网络加载
### 分割代码时的输出
- 多了一个 __webpack_require__.e 用于加载被分割出去的，需要异步加载的 Chunk 对应的文件
- 多了一个 webpackJsonp 函数用于从异步加载的文件中安装模块

## Loader
能把源文件经过转化后输出新的结果，并且一个文件还可以链式的经过多个翻译员翻译
以scss为例
1. SCSS 源代码会先交给 sass-loader 把 SCSS 转换成 CSS；
2. 把 sass-loader 输出的 CSS 交给 css-loader 处理，找出 CSS 中依赖的资源、压缩 CSS 等；
3. 把 css-loader 输出的 CSS 交给 style-loader 处理，转换成通过脚本加载的 JavaScript 代码
链式执行，先 sass-loader 再 css-loader 再 style-loader

常用的Loader：file-loader、url-loader、ts-loader、babel-loader、eslint-loader

## Plugin
在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果
常用Plugin：mini-css-extract-plugin(分离样式文件),clean-webpack-plugin,webpack-bundle-analyzer(打包结果分析)，html-webpack-plugin(html创建)，uglifyjs-webpack-plugin压缩js

## 优化webpack
- 多进程/多实例构建 thread-loader
- 压缩代码 uglifyjs-webpack-plugin
- 图片压缩image-webpack-loader
- 提取页面公共资源SplitChunksPlugin
- DLL DllPlugin，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
- 开启缓存babel-loader 开启缓存

## 按需加载

## 模块热更新
1. webpack监听到文件的变化，重新打包之后，保存在内存中
2. dev server在浏览器端和服务端之间建立一个 websocket 长连接，devServer 通知浏览器端文件发生改变，
把新模块 hash 值发送到浏览器端
3. 用 webpack/hot/emitter 将最新 hash 值发送给 webpack，然后将控制权交给 webpack 客户端代码
4. webpack 接收到最新 hash 值验证并请求模块代码