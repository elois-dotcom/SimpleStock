import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [username,setUsername]= useState('');
  const [password,setPassword]= useState('');
  const navigate = useNavigate(); // Used to redirect to home   

  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    console.log("submitting user:",username,password);

    try{
      const response = await fetch('http://localhost:5000/api/users' ,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({username,password}),

      });
      const result= await response.json();
      console.log("response from backend:",result);

      if(response.ok){
       toast.success('Murakaze neza');
        setUsername('');
        setPassword('');

        navigate('/addProduct');
      }else{
        toast.error('Ongera ugerageze');
      }
    } catch (error){
      console.error('error met',error);
    }
  };

  return (
    <div className='container'>
        <div className='side-left'>
    
        <img src="./image-login.jpg" alt="login-visual" srcset=""  className='login-img'/>
        </div>
       <form onSubmit={handleSubmit} className='side-right'>
                <h2>ASMS</h2><br/>
      
              <p className='wel'>Muraho, <br/>
                Murakaze Neza.
              </p><br/>
              <p className='slo'>Urakaze neza aho ushobora kugenga umutungo wawe neza.</p><br/>
                <label htmlFor="">Amazina</label><br/>
                <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/><br/>
                <label htmlFor="">Ijambo Banga</label><br/>
                <input type="password" name="password"value={password} onChange= {(e)=>setPassword(e.target.value)} required /><br/>

                <button type="submit">Ohereza</button>
            
        
      </form> 
    </div>
  )
}

export default Login
