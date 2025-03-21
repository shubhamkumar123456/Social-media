const express = require('express');
const app = express();
const port = 8080;
const server = require('http').createServer(app);
let connection = require('./config/db') // connectToDB
const cookieParser = require('cookie-parser')
const cors = require('cors')
connection()


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const chatRouter = require('./routes/chatRoutes')

app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true                 // Allow credentials (cookies, headers)
}));


const io = require('socket.io')(server);

app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('hello world')
})

const onlineUsers = new Map();


// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);
//     const userId = socket.handshake.query.userId;
//     onlineUsers.set(userId, socket.id);
//     console.log(onlineUsers)

//     socket.on('sendMessage', (message) => {
//         console.log('Message received:', message);
//         io.emit('receiveMessage', message);  // Broadcast to all connected clients
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/chats', chatRouter)

let users = new Map()


io.on('connection', socket => {
    console.log('connection is established', socket.id)
    socket.on('newUser', (id) => {
        console.log(id)
        users.set(id,socket.id);
        console.log(users)
    })
    socket.on('sendMessage',({userId,friendId,text})=>{
        console.log(userId)
        console.log("friendId",friendId)
        let friendSocketId = users.get(friendId)
        console.log("friendSocketId", friendSocketId)
        if(friendSocketId){
            socket.to(friendSocketId).emit('recievedMsg',{userId,friendId,text})
        }
        console.log(text)
    })
});


server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})