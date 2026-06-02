import React from 'react'
import { useState } from 'react';
import './forgot.css'
import axios from "axios"
function Forgot() {
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res= await axios.post("http://localhost:5000/api/forgot-password",{email});
            setMessage(res.data.message);

        } catch (error) {
            setMessage("Error:" + error.response?.data?.message || "Something went wrong!");
        }
        
    };
  return (
    <div className="reset">
      <h1 className="headers">Retrieve password</h1>
      <hr />
      <form className="sep" onSubmit={handleSubmit} method="post">
        <p>Enter your email. We’ll send you a link to reset your password.</p>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <button>Send Reset link</button>
        {message && <p className='feedback'>{message}</p>}
      </form>
    </div>
  );
}

export default Forgot
