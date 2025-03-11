const users =[
   {id:2, name:'John Doe'},
   {id:3, name:'Jane Doe'},
   {id:4, name:'Jany Doy'} 
]
const users2= users
function UpdateFieldName(){
   return users.map(item=> ({
        Id : item.id,
        UserName:item.name,
        age:Math.floor(Math.random()*36)+15
    }))
        

    
}
function removeUser(){
    users.pop()
}
function findUser(id){
   return users.find(users=>users.id==id).name

}
function removeFirstUser(){
users.shift()
}
function ChangeName(id,name){
    return users.find(users=>users.id==id).name=name

}
function evenNumber(){
    return users.filter(users=>users.id%2==0)
}
function iseven(){
    if(users.some(users=>users.id%2==0))
        return true
    else return false
}
function avgAge(){
    const avg= userUpdate.reduce((sum,userUpdate)=>sum +userUpdate.age,0)/userUpdate.length
     return avg
}
ChangeName(3,"motty")
const userUpdate =UpdateFieldName()
//console.log(avgAge())
//console.log(userUpdate)
const arr =[1,2,3]
const arr2=[4,5,6]
const arr3=[...arr,...arr2,7,8,9]
console.log(arr3)
const user ={
    id: 12345,
    Username: 'jojo',
    Age: 25,

}
function sum(){
    const sum=arr3.reduce((a , b) => {return a + b})
    return sum
}
user.FirstName='yarden'
console.log(...arr3)
