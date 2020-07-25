  
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepCloner = require("../index");
describe("DeepCloner", () => {
  it("是一个函数", () => {
    assert.isFunction(DeepCloner);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = DeepCloner(n);
    assert(n === n2);
    const s = "123456";
    const s2 = DeepCloner(s);
    assert(s === s2);
    const b = true;
    const b2 = DeepCloner(b);
    assert(b === b2);
    const u = undefined;
    const u2 = DeepCloner(u);
    assert(u === u2);
    const empty = null;
    const empty2 = DeepCloner(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = DeepCloner(sym);
    assert(sym === sym2);
  });
  describe("能够复制对象",()=>{
    it("普通对象",()=>{
      const a = { name: "方方", child: { name: "小方方" } };
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    })
    it("能够复制数组对象", () => {
      const a = [[11, 12], [21, 22], [31, 32]];
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert(a[2] !== a2[2]);
      assert.deepEqual(a, a2);
    });
    it("能够复制函数", () => {
      const a = function(x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a(1, 2) === a2(1, 2));
    });
    it("环也能复制", () => {
      const a = { name: "方方" };
      a.self = a;
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    });
    it("可以复制正则表达式", () => {
      //   const a = /hi\d+/gi;
      const a = new RegExp("hi\\d+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = DeepCloner(a);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("可以复制日期", () => {
      //   const a = /hi\d+/gi;
      const a = new Date();
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a.getTime() === a2.getTime());
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
  })
})