import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const navigate = useNavigate(); // Used to redirect to home   

  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    console.log("submitting user:",email,password);

    try{
      const response = await fetch('http://localhost:5000/api/login' ,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email,password}),

      });
      const result= await response.json();
      console.log("response from backend:",result);

      if(response.ok){
        localStorage.setItem('token',result.token);
        localStorage.setItem('user',JSON.stringify({
          userId:result.userId,
          username:result.username,
          email:result.email
        }))
       toast.success('Murakaze neza');
        setEmail('');
        setPassword('');

        navigate('/addProduct');
      }else{
        toast.error('Andika Imeyiri cyangwa ijambo banga byawe neza !');
      }
    } catch (error){
      console.error('error met',error);
    }
  };

  return (
    <div className="container">
      <div className="side-left">
        <img
          src="./image-login.jpg"
          alt="login-visual"
          srcset=""
          className="login-img"
        />
      </div>
      <form onSubmit={handleSubmit} className="side-right">
        <p className='welcome'>
          Stock Management System.
        </p>
        <br />

        <p className="wel">
          Muraho, <br />
          Murakaze Neza.
        </p>
        <br />
        <p className="slo">
          Urakaze neza aho ushobora kugenga umutungo wawe neza.
        </p>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Imeyiri"
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Ijambo Banga"
        />
        <br />
        <Link to="forgot-password-page" className="forgot-password-link">
          Wibagiwe Ijambo Banga ?
        </Link>
        <button type="submit">Ohereza</button>
        <Link to="signup" className="forgot-password-link">
          Kora Konte Niba Ntayo ufite
        </Link>
      </form>
    </div>
  );
}

export default Login
