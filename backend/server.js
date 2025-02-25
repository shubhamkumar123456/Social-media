const express = require('express');
const app = express();
const port = 8080;
let connection = require('./config/db') // connectToDB
const cookieParser = require('cookie-parser')
const cors = require('cors')
connection()

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.send('hello world')
})


app.use('/users',userRouter)
app.use('/posts',postRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})