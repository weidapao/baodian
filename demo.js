function Person(name,age){
    return function(key){
        if(key==='name'){
            return name
        }
        if(key==='age'){
            return age
        }
    }
}

var c = Person('jack',23)
console.log(c('name'))
console.log(c('age'))
