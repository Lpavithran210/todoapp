import express from 'express'
import { addTodo, deleteTodo, listAllTodos, todoDetails, updateTodo } from '../controllers/todoController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, listAllTodos)
router.post('/add_todo', protect, addTodo)
router.route('/:id').get(protect, todoDetails).patch(protect, updateTodo).delete(protect, deleteTodo)

export default router