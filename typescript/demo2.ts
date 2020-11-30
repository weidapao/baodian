// never 类型表示的是那些永不存在的值的类型。 
// 例如， never 类型是那些总是会抛出异常
// 或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

// 类型保护
function isNumber(x: any): x is number { return typeof x === "number";
}
function isString(x: any): x is string { return typeof x === "string";
}

// interface是接口，type是类型，本身就是两个概念。只是碰巧表现上比较相似。
// 希望定义一个变量类型，就用type，如果希望是能够继承并约束的，就用interface。
// 如果你不知道该用哪个，说明你只是想定义一个类型而非接口，所以应该用type