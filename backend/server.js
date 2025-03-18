const express = require('express');
const app = express();
const port = 8080;
const http = require('http');
const { Server } = require('socket.io');
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

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',  // React App URL
        methods: ['GET', 'POST'],
        credentials: true  // This is required to allow cookies, auth headers, etc.
    }
});

app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('hello world')
})

const onlineUsers = new Map();


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    const userId = socket.handshake.query.userId;
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers)

    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        io.emit('receiveMessage', message);  // Broadcast to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/chats', chatRouter)

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})