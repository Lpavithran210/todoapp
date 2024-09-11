import todoModel from "../models/todoModel.js";
import userModel from "../models/userModel.js";

export const addTodo = async (req, res) => {
    const { title, note } = req.body
    try {
        await todoModel.create({ title, note, user: req.user.id })
        res.json({ message: "New todo created!" })
    }
    catch (e) {
        console.log(e.message)
    }
}

export const listAllTodos = async (req, res) => {
    try {
        const todos = await todoModel.find({ user: req.user.id })
        res.json({ message: "Fetched all todos!", data: todos })
    }
    catch (e) {
        console.log(e.message)
    }
}

export const todoDetails = async (req, res) => {
    const { id } = req.params
    try {
        const todo = await todoModel.findById(id)
        res.json({ message: "Fetched details!", data: todo })
    }
    catch (e) {
        console.log(e.message)
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(req.user.id)
        const todo = await todoModel.findById(id)
        if (!user) {
            res.status(400)
            throw new Error("User not found!")
        }
        if (todo.user.toString() !== user.id) {
            res.status(400)
            throw new Error("User not authorized")
        }
        await todoModel.findByIdAndUpdate(id, { ...req.body })
        res.json({ message: "Updated successfully!" })
    }
    catch (e) {
        console.log(e.message)
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(req.user.id)
        const todo = await todoModel.findById(id)
        if (!user) {
            res.status(400)
            throw new Error("User not found!")
        }
        if (todo.user.toString() !== user.id) {
            res.status(400)
            throw new Error("User not authorized")
        }
        await todoModel.findByIdAndDelete(id)
        res.json({ message: "Deleted successfully!" })
    }
    catch (e) {
        console.log(e.message)
    }
}