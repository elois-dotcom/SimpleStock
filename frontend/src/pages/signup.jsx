import React from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  
  const navigate = useNavigate(); // Used to redirect to home

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting user:", name, email,number,password);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email,number,password }),
      });
      const result = await response.json();
      console.log("response from backend:", result);

      if (response.ok) {
        toast.success("Urakoze kwiyandikisha");
        setEmail("");
        setPassword("");

        navigate("/");
      } else {
        toast.error("Ongera ugerageze");
      }
    } catch (error) {
      console.error("error met", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="right">
        <img
          src="./Stock Yawe.png"
          alt="Logo"
          srcset=""
          className="signupimg"
        />
        <br />

        <p className="wel">
          Muraho, <br />
          Murakaze Neza.
        </p>
        <br />
        <p className="slo">
          Iyandikishe kugira utangire ukoreshe <strong>Stock Yawe</strong>.
        </p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Amazina"
          className="put"
        />
        <br />
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Imeyiri"
          className="put"
        />
        <br />
        <input
          type="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Nomero"
          put
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Ijambo Banga"
          className="put"
        />
        <br />

        <button type="submit" className="bu">
          Ohereza
        </button>
      </form>
    </div>
  );
}

export default Signup;
