const express = require('express');
const app = express();
const port = 8090
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

app.get('/',(req,res)=>{
    res.send('wlcome home')
})


let health = 100
console.log(health)

myEmitter.on('fire',(ans)=>{
    // console.log("hello")
    health = health - 20
    console.log('i am injured my headlth is down my health is = ', health)
})

myEmitter.on('recover',()=>{
    health = health + 10;
    console.log('i am applying bandages my health is recovering ', health)

})

myEmitter.emit('fire', 'dusman marr gaya');
myEmitter.emit('fire', 'dusman marr gaya');


myEmitter.emit('recover')
myEmitter.emit('recover')
myEmitter.emit('recover')

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})