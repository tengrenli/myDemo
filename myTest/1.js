// var ArrayPrototypeSlice = Array.prototype.slice
// Function.prototype.bind = function (otherThis) {
//   if (typeof this !== 'function') {
//     // closest thing possible to the ECMAScript 5
//     // internal IsCallable function
//     throw new TypeError(
//       'Function.prototype.bind - what is trying to be bound is not callable'
//     )
//   }
//   console.log('otherThis->', otherThis)
//   var baseArgs = ArrayPrototypeSlice.call(arguments, 1)   // slice 方法 从第一位截取
//   var  baseArgsLength = baseArgs.length
//   console.log('baseArgs=>', baseArgs)
//   console.log('this=><', this)
//     fToBind = this // 调用的方法
//   fNOP = function () { }
//   console.log('status=>', fNOP.prototype.isPrototypeOf(this) )
//     fBound = function () {
//       baseArgs.length = baseArgsLength // reset to default base arguments
//       baseArgs.push.apply(baseArgs, arguments)
//       return fToBind.apply(
//         fNOP.prototype.isPrototypeOf(this) ? this : otherThis,
//         baseArgs
//       )
//     }

//   if (this.prototype) {
//     // Function.prototype doesn't have a prototype property
//     fNOP.prototype = this.prototype
//   }
//   fBound.prototype = new fNOP()

//   return fBound
// }

let slice = Array.prototype.slice
Function.prototype.bind = function () { 
  let bindThis = arguments[0]
  let thatFun = this
  let args = slice.call(arguments, 1)
  return function () { 
    let bindArgs = args.concat(slice.call(arguments))
    return thatFun.apply(bindThis, bindArgs)
  }
}
this.x = 9 // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function () {
    return this.x
  }
}

// module.getX(); // 81

var retrieveX = module.getX
// retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module, 2)
console.log(boundGetX()) // 81

// bind 方法是创建一个 新函数
