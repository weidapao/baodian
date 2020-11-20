// never是一个函数永远运行不会返回，或者throw一个error
const logger = (): never => {
  while (true) {
    console.log('hahahahahaha')
  }
}

// void是表示一个函数不会return一个value，函数运行结束了，但是没有返回一个值
function logError(errorMessage: string): void {
  console.error(errorMessage)
}

type FormControl = {
  name: string
}

type ValidatofFn = (c: FormControl) => { [key: string]: any } | null
const Valid: ValidatofFn = function (c) {
  return { c: c.name }
}

class Person {
  name: String
  age: number
}
class Customer {
  name: String
}
const cust: Customer = new Person()

// 联合类型

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'circle'
  radius: number
}

function getSize(param: Rectangle | Circle): number {
  switch (param.kind) {
    case 'rectangle':
      return param.width
    case 'circle':
      return param.radius
  }
}

// 用in来判断类型
interface A {
  a: number
}
interface B {
  b: string
}
// function foo(x: A | B) {
//   if ('a' in x) {
//     return x.a
//   }
//   return x.b
// }
// any和unknown的区别
// Declaring a variable of any type allows you to assign it a value of any type
// If you declare a variable of type unknown, the compiler will force you to narrow its type down before accessing its properties,
// sparing you from potential runtime surprises.

type Person2 = { address: string }
let person1: unknown
person1 = JSON.parse('{ "address": "25 Broadway" }')
const isPerson = (object: any): object is Person2 => 'address' in object
if (isPerson(person1)) {
  console.log(person1.address)
}

class Dog {
  constructor(readonly name: string) {}

  sayHello(): string {
    return 'Dog says hello!'
  }
}

class Fish {
  constructor(readonly name: string) {}

  dive(howDeep: number): string {
    return `Diving ${howDeep} feet`
  }
}

type Pet = Dog | Fish

function talkToPet(pet: Pet): string {
  if (pet instanceof Dog) {
    return pet.sayHello()
  } else if (pet instanceof Fish) {
    return 'Fish cannot talk, sorry.'
  }
}

const myDog = new Dog('Sammy')

const myFish = new Fish('Marry')

console.log(talkToPet(myDog))
console.log(talkToPet(myFish))
// talkToPet({ name: 'John' }); 编译错误

// Abstract classes抽象类
// 定义一些方法给子类实现
abstract class Person3 {
  constructor(public name: string) {}
  giveDayOff() {
    console.log(`Giving a day off to ${this.name}`)
  }
  promote(percent: number) {
    this.giveDayOff()
    this.increasePay(percent)
  }
  abstract increasePay(percent: number): void
}

class Employee extends Person3 {
  increasePay(percent: number): void {
    throw new Error('Method not implemented.')
  }
}

class Contractor extends Person3 {
  increasePay(percent: number): void {
    throw new Error('Method not implemented.')
  }
}

const workers: Person3[] = []
workers[0] = new Employee('111')

// 函数重载
interface Product {
  id: number
  description: string
}

class ProductService {
  getProducts(description: string): Product[]
  getProducts(id: number): Product
  getProducts(product: string | number): Product[] | Product {
    if (typeof product === 'number') {
      return { id: 11, description: '33' }
    } else if (typeof product === 'string') {
      return [{ id: 11, description: '33' }]
    } else {
      return { id: -1, description: 'Error: getProducts() accept only number or string as args' }
    }
  }
}
const prodService = new ProductService()

console.log(prodService.getProducts(123))

console.log(prodService.getProducts('blue jeans'))

// 接口和类
interface MotorVehicle {
  startEngine(): boolean
  stopEngine(): boolean
  brake(): boolean
  accelerate(speed: number): void
  honk(howLong: number): void
}
interface Flyable {
  fly(howHigh: number)
  land()
}

class Car implements MotorVehicle, Flyable {
  fly(howHigh: number) {
    throw new Error('Method not implemented.')
  }
  land() {
    throw new Error('Method not implemented.')
  }
  startEngine(): boolean {
    throw new Error('Method not implemented.')
  }
  stopEngine(): boolean {
    throw new Error('Method not implemented.')
  }
  brake(): boolean {
    throw new Error('Method not implemented.')
  }
  accelerate(speed: number): void {
    throw new Error('Method not implemented.')
  }
  honk(howLong: number): void {
    throw new Error('Method not implemented.')
  }
}
// 继承接口
interface Flyable2 extends MotorVehicle {
  fly(howHigh: number)
  land()
}
class Weicar implements Flyable2 {
  fly(howHigh: number) {
    throw new Error('Method not implemented.')
  }
  land() {
    throw new Error('Method not implemented.')
  }
  startEngine(): boolean {
    throw new Error('Method not implemented.')
  }
  stopEngine(): boolean {
    throw new Error('Method not implemented.')
  }
  brake(): boolean {
    throw new Error('Method not implemented.')
  }
  accelerate(speed: number): void {
    throw new Error('Method not implemented.')
  }
  honk(howLong: number): void {
    throw new Error('Method not implemented.')
  }
}

// 枚举
enum WeekDays {
  Monday = 1,
  Tuesday = 2,
  Friday = 5,
}
const free = WeekDays.Friday

enum Direction {
  FtoC,
  CtoF,
}
console.log('FtoC', Direction.FtoC)

// 泛型 定义的时候代表一堆值，在函数调用或者class实例化的时候有确切的值，
// T in generics represents type : K for key, V for value, P for property,

class Personw {
  name: string
}
class Employee2 extends Personw {
  department: number
}
class Animal {
  name: string
  breed: string
}
const workersw: Array<Personw> = []
workersw[0] = new Personw()
workersw[1] = new Employee2()
workersw[2] = new Animal()

interface Comparator<T> {
  compareTo(value: T): number
}

class Rectangle implements Comparator<Rectangle> {
  compareTo(value: Rectangle): number {
    return 1
  }
}

class Triangle implements Comparator<Triangle> {
  compareTo(value: Triangle): number {
    return 2
  }
}

var rectangle1 = new Rectangle()
var triangle1 = new Triangle()
// rectangle1.compareTo(triangle1) 报错

// 给泛型一个默认值
class A<T = any> {
  // declaring default parameter type
  value: T
}
class B extends A {
  // No errors
}

function printMe<T>(value: T): T {
  console.log(value)
  return value
}

const printMe2 = <T>(value: T): T => {
  return value
}

printMe2<number[]>([1, 34])

interface User {
  name: string
  role: UserRole
}

enum UserRole {
  admin = 'admin',
  guest = 'guest',
}

function loadUser<T>(): T {
  return JSON.parse('{ "name": "john", "role": "admin" }')
}

const user = loadUser<User>()
switch (user.role) {
  case UserRole.admin:
    console.log('Show control panel')
    break
  case UserRole.guest:
    console.log('Hide control panel')
    break
}

// 泛型高阶函数
type numFunc<T> = (args: T) => (c: number) => number

const testFn: numFunc<string> = (a: string) => (c) => c++

// Mapped types
interface Person111 {
  name: string
  age: number
}

function doStuff(p: Readonly<Person111>) {
  // p.name='ccc' 报错，只读属性
  console.log(p.name)
}

// keyof :index type query,
type propName = keyof Person111

// [P in keyof T] T的所有键的集合
type Readonly1<T> = {
  readonly [P in keyof T]: T[P]
}

// 典型例子：过滤函数
interface Person55 {
  name: string
  age: number
}
const persons: Person55[] = [
  { name: 'John', age: 32 },
  { name: 'Mary', age: 33 },
]
function filter<T, P extends keyof T>(property: P, value: T[P], array: T[]) {
  return array.filter((item) => item[property] === value)
}
filter('name', '4334', persons)

// 可选类型
interface Person77 {
  name: string
  age?: number
}

type PartialPerson<T> = {
  [P in keyof T]?: T[P]
}
type RequiredPerson<T> = {
  [P in keyof T]-?: T[P] // 相当于去掉原接口属性的？
}
// const can:RequiredPerson<Person77>  ={name:'xxxx'} 报错，都是必填

// pick
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}

// 关键字: infer，暂定某数据是个泛型
// 该例子是把一个接口里的所有函数变成返回promise，promise的返回值是原来的返回值
interface SyncService {
  baseUrl: string;
  getA(): string;
}

type aa = keyof SyncService


type ReturnPromise<T> = T extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T

type Promisify<T> = {
  [P in keyof T]:ReturnPromise<T[P]>
}

class AsyncService implements Promisify<SyncService> {
  baseUrl: string
  getA(): Promise<string> {
    return Promise.resolve('')
  }
}



const has = (value: any): value is boolean => true
console.log(11,has(0))
console.log(22,has(true))
console.log(33,has(false))