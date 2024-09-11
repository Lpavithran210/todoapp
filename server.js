import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import todoRoute from './routes/todoRoute.js'

dotenv.config()
const app = express();
app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/todos', todoRoute)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, () => console.log("Db connected and listening to port " + process.env.PORT))
}).catch(e => console.log('Error in connection', e.message))