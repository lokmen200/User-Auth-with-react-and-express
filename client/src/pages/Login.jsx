import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  async function handSubmit(ev){
    try{
        ev.preventDefault()
        await axios.post('http://localhost:1111/login' , {email , password})
        navigate('/')
    }catch(e){
        console.log(e)
        alert('USER NOT FOUND')
    }
    
  }
  return (
    <>
    <div className=' grow flex items-center justify-around'>  
        <div className='mb-40'>
            <h1 className='font-semibold text-2xl text-center'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handSubmit}>

                <input type="email" placeholder='John@email.com' 
                onChange={ev=> setEmail(ev.target.value)}/>

                <input type="password" placeholder='password' 
                onChange={ev => setPassword(ev.target.value)}/>

                <button className='primary'>Login</button>
                
                <div className='py-2 text-center text-gray-500'>
                    Have already an account ? <Link to={'/register'} className='text-black underline'>Register now</Link> 
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
