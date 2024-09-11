import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
        unique: true
    },
}, {timestamps: true})

const todoModel = mongoose.model('Todo', todoSchema)

export default todoModel