TODO: 项目遇到的问题 rn fs找不到，paths不支持中文，安卓手机text显示不全问题
TODO: 浮层，正则，观察者模式，js数据结构


>X-UA-Compatible overrides the Compatibility View Settings, so the page will render in standards mode regardless of the browser settings
防止用户把页面加到兼容性视图
加一个
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

> startTime ,endTime开始日期和结束日期
interval 时间间隔
xData 横坐标的名称
yData [{legend: "明火预警检测", line: [0, 0, 0, 0]}]

> useTable
// 参数 请求data的方法 查询的参数
// 初始化currentpage pagesize 查询参数
// useCallback包装了load方法，依赖是pageSize，current，查询参数，请求方法
// useEffect 包装load方法，依赖是load，自动重新请求
// 把相关方法给传出来
