import axios from "./axios.js"

export const getTodosRequest = () => 
  axios.get("/todos")

export const getTodoRequest = id =>
  axios.get(`/todos/${id}`)

export const addTodoRequest = todo =>
  axios.post("/todos", todo)

export const updateTodoRequest = (id, todo) =>
  axios.put(`/todos/${id}`, todo)

export const deleteTodoRequest = id =>
  axios.delete(`/todos/${id}`)
