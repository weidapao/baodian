# 垂直居中
- top：50%，margin-top:-0.5高度
- top:50%,transform: translate(-10%,-50%);
- flex

# 水平居中
- .parent{text-align: center;} .child{display: inline-block;}
- margin:0 auto
- .parent{position:relative;} .child{position:absolute;left:50%;transform:translate(-50%);}
- flex

# 多列布局左列定宽，右列自适应
- .left{float:left;width:100px;}.right{margin-left:100px;} （ie6有3px的bug）
- .left{width:100px;float:left;}
.right-fix{width:100%;margin-left:-100px;float:right;}
.right{margin-left:100px;} ie6无bug版本
- .left{width:100px;float:left;} .right{overflow:hidden;} bfc实现
- flex .parent{display:flex;} .left{width:100px;} .right{flex:1;}

# 两侧定宽，中栏自适应
- flex
- .left{width：100px;float:left;} .center{float:left;width:100%;margin-right:-200px;} .right{width:100px;float:right;}

# 一列不定宽，一列自适应
- .left{float:left;} .right{overflow:hidden;}
- flex .parent{display:flex;} .right{flex:1;}
