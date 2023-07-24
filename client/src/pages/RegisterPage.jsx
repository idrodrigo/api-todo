import {useForm} from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm()
  const { signUp, isAuthenticated, authErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/todo')
  }, [isAuthenticated, navigate])
  


  async function onSubmit(data) {
    signUp(data)
  }

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center'>

      {
        authErrors.map((error, index) => (
          <span key={index} className='bg-red-500 p-2'>{error}</span>
        ))  
      }
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
        <input type="text" placeholder="username"
          {...register("username", {required: true, minLength: 3})}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-zinc-600 my-2' 
        />
        {errors.username && <span 
        className='text-red-500'>Username is required</span>
        }
        <input type="email" placeholder="email" name="email"
          {...register("email", {required: true})}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-zinc-600 my-2'
        />
        {errors.email && <span
        className='text-red-500'>Email is required</span>
        }
        <input type="password" placeholder="password" name="password"
          {...register("password", {required: true, minLength: 6})}
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
      <p>
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
    </div>
  )
}

export default RegisterPage