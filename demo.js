function jiexie(str){
  var result = []
  var c = ''
  for(i=0;i<str.length;i++){
    if(str[i]!='.'&&str[i]!='['&&str[i]!=']'){
      c+=str[i]
    }else{
      if(c!=''){
        result.push(c)
        c = ''
      }
    }
  }
  if(c!=''){
    result.push(c)
  }
  return result
}
console.log(jiexie('a[0].b'))
console.log(jiexie('a[1]'))
console.log(jiexie('x'))