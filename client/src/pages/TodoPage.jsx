import TodoCard from "../components/TodoCard"
import { useTodos } from "../hooks/useTodos"
import { useEffect } from "react"

function TodoPage() {

  const { getTodos, todos, setTodos } =useTodos()

  useEffect(() => {
    getTodos()
    return () => setTodos([])
  }, [])

  if(todos.length === 0) return (
    <div>
      <h1>No todos</h1>
    </div>
  )

  
  return (
    <div  className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
      {
        todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo} />
        ))

      }
    </div>
  )
}

export default TodoPage