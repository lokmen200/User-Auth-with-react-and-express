import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const navigate = useNavigate()
  
  async function addUser(ev){
    ev.preventDefault()
    try{
        await axios.post('http://localhost:1111/register' , {name , email , password})
        navigate('/login')
    }catch(e){
        console.log(e)
        alert('email already used ')
    }
  }

  return (
    <>
    <div className=' grow flex items-center justify-around mt-32'>  
        <div className=''>
            <h1 className='font-semibold text-2xl text-center'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={addUser}>
                <input type="text" placeholder='John Doh' 
                onChange={ev => setName(ev.target.value)}/> 

                <input type="email" placeholder='John@email.com' 
                onChange={ev=> setEmail(ev.target.value)}/>

                <input type="password" placeholder='password' 
                onChange={ev => setPassword(ev.target.value)}/>

                <button className='primary'>Register</button>
                
                <div className='py-2 text-center text-gray-500'>
                    Have already an account ? <Link to={'/login'} className='text-black underline'>Login now</Link> 
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
