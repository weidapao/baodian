function compose(middlewareList) {
  return function (ctx) {
      function dispatch(i) {
          const fn = middlewareList[i]
          if(!fn) return Promise.resolve()
          try {
              return Promise.resolve(
                  fn(ctx, dispatch.bind(null, i + 1))
              )
          } catch (err) {
              return Promise.reject(err)
          }
      }
      return dispatch(0)
  }
}

const middleware = function (ctx, next) {
  console.log(1)
  next().then(() => {
    console.log(6)
  })
}

const middleware2 = function (ctx, next) {
  console.log(2)
  next().then(() => {
    console.log(5)
  })
}

const middleware3 = function (ctx, next) {
  console.log(3)
  next().then(() => {
    console.log(4)
  })
}


var a = compose([middleware,middleware2,middleware3])
a()