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



app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/chats', chatRouter)

let users = new Map()


function deleteByValue(value) {
    for (let [key, val] of users) {
        if (val === value) {
            users.delete(key);

            return users // Stop after deleting the first occurrence
        }
    }
}

io.on('connection', socket => {
    console.log('connection is established', socket.id)
    socket.on('newUser', (id) => {
        console.log(id)
        users.set(id, socket.id);
        console.log(users)
    })
    socket.on('sendMessage', ({ userId, friendId, text }) => {
        console.log(userId)
        console.log("friendId", friendId)
        let friendSocketId = users.get(friendId)
        console.log("friendSocketId", friendSocketId)
        if (friendSocketId) {
            socket.to(friendSocketId).emit('recievedMsg', { userId, friendId, text })
        }
        console.log(text)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        let updatedUsers = deleteByValue(socket.id);
        console.log(updatedUsers)
    });
});


server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})