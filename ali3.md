# arcgis js
esriLoader 实际上返回的是一个Promise实例，里面包装这相关的模块。后来我看了下这个 esriLoader 的源码，实际上它是通过动态创建<script>标签加载 arcgis 框架，然后再去通过require(['mduleA', 'moduleB'])去加载相关模块，
最后Promise.resolve([])出来。

redux来保存map实例
