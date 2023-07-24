import Todo from '../models/todo.model.js'

export const getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id
    }).populate('user')
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate('user')
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    res.status(200).json(todo)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const createTodo = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const newTodo = new Todo({
      title,
      description,
      date,
      user: req.user.id
    })
    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const updateTodo = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const todo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    )
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id, req.body)
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
