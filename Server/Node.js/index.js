const fs = require('fs');
const path = require('path');
const http = require('http')
const express = require('express');
const { error } = require('console');
const app = express()
app.use(express.json())

const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "balice" },
  { id: 3, name: "calice" }
]
app.post('/addUser',(req,res)=>{
  const {name}=req.body
  if(!name){
    return res.status(400).json({ error:'name is required'})
  }
  const existUser=users.find(user=>user.name.includes(name))
  if(existUser){
    return (res.status(400).json({error:"the name exists"}))
  }
const newUser ={
  id: users.length +1,
  name,
}
users.push(newUser)
return res.status(201).json(users)

})
app.get('/users', (req, res) => {
  return res.json(users)
  //  res.send('ומה שהולך להיות פה,הו מה שהולך להיות פה')
})

app.listen(1312, () => {
  console.log("server is running on http:/localhost:1312 ")
})
//console.log(users.getUser(0).age)


