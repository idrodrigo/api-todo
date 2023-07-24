import { createContext, useState } from "react";
import {
  addTodoRequest,
  deleteTodoRequest,
  getTodoRequest,
  getTodosRequest,
  updateTodoRequest
} from "../api/todo.js";
export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([])

  const createTodo = async (todo) => {
    try {
      const response = await addTodoRequest(todo)
      console.log(response);
    }
    catch (error) {
      console.log(error)
    }

  };

  const getTodos = async () => {
    try {
      const response = await getTodosRequest()
      console.log(response)
      setTodos(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await deleteTodoRequest(id)
      if (response.status === 204) {
        setTodos(todos.filter((todo) => todo._id !== id))
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const getTodo = async (id) => {
    try {
      const response = await getTodoRequest(id)
      return response.data
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (id, todo) => {
    try {
      const response = await updateTodoRequest(id, todo)
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        createTodo,
        getTodos,
        deleteTodo,
        getTodo, 
        updateTodo,
      }}>
      {children}
    </TodosContext.Provider>
  )
}
