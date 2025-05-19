
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gofood-mern-app-srq9.onrender.com/api/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Invalid email or password");
      } else {
        localStorage.setItem("userEmail", credential.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <form onSubmit={handleSubmit} className='m-3' noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} required />
          </div>

          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/CreateUser" className="m-3 btn btn-danger">I'm a new user</Link>
        </form>
      </div>
    </div>
  );
}
