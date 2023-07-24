import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signIn, authErrors, isAuthenticated } = useAuth()
  const navigate  = useNavigate()


  const onSubmit = handleSubmit((data) => {
    console.log(data)
    signIn(data)
  })

  useEffect(() => {
    if(isAuthenticated){
      navigate('/todo')
    }
  }, [isAuthenticated, navigate])
  

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      {
        authErrors.map((error, index) => (
          <span 
            key={index} 
            className='bg-red-500 p-2 text-white text-center'>
            {error}
          </span>
        ))  
      }
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="email" name="email"
            {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-zinc-600 my-2'
          />
          {errors.email && <span
            className='text-red-500'>Email is required</span>
          }
          <input type="password" placeholder="password" name="password"
            {...register("password", { required: true, minLength: 6 })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-zinc-600 my-2'
          />
          {errors.password && <span
            className='text-red-500'>Password is required</span>
          }

          <button type='submit'>
            Register
          </button>


        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an account? 
          <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage