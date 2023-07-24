import { Link } from "react-router-dom"
import { useTodos } from "../hooks/useTodos"
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

function TodoCard({ todo }) {
  const { deleteTodo } = useTodos()

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold"
      >{todo.title}</h1>
      <div className="flex gap-x-2 items-center">
        <Link to={`/todo/${todo._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteTodo(todo._id) }
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
      </header>

      <p className="text-gray-400"
      >{todo.description}</p>

      <p className="text-gray-400"
      >{
        dayjs(todo.date).utc().format('DD/MM/YYYY')}
        </p>

    </div>
  )
}

export default TodoCard