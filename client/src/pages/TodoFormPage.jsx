import { useForm } from "react-hook-form"
import { useTodos } from "../hooks/useTodos";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

function TodoFormPage() {

  const { register, handleSubmit, setValue } = useForm()
  const { createTodo, getTodo, updateTodo } = useTodos()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    async function loadTodo() {
      if (id) {
        const todo = await getTodo(id)
        console.log(todo)
        setValue('title', todo.title)
        setValue('description', todo.description)
        setValue('date', dayjs(todo.date).utc().format('YYYY-MM-DD'))
      }
    }
    loadTodo()
  }, [])


  const onSubmit = async (data) => {
    const date = data.date 
    ? dayjs.utc(data.date).format() 
    : dayjs.utc().format() 

    try {
      if (id) {
        await updateTodo(id, {...data, date})
      } else {
        await createTodo({...data, date})
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/todo')
    }
  }

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center text-blue-700'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {/* {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )} */}

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></textarea>

        <label htmlFor="date">Date</label>
        <input type="date" name="date" {...register("date")} />
        <button 
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
          >Save</button>
      </form>
    </div>
  )
}

export default TodoFormPage