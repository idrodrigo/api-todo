import TodoCard from "../components/TodoCard"
import { useTodos } from "../hooks/useTodos"
import { useEffect } from "react"

function TodoPage() {

  const { getTodos, todos, setTodos } =useTodos()

  useEffect(() => {
    getTodos()
    return () => setTodos([])
  }, [])

  return (
    todos.length > 0 
    ? <div  className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
      {
        todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo} />
        ))

      }
    </div>
    : <div> 
      <h1>No todos</h1>
    </div>
  )
}

export default TodoPage