import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';



export const Signup = () => {

      let navigate = useNavigate()
    
     const [credential, setCredential] = useState({name:"", email:"", password:"", Geolocation:""});

    const handleSubmit =  ( async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:credential.name, email:credential.email, password:credential.password,location:credential.Geolocation}))
        const response = await fetch('https://gofood-mern-app-srq9.onrender.com/api/createUser', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credential.name, email:credential.email, password:credential.password,location:credential.Geolocation})
        })
        const json= await response.json();
        console.log(json);
        navigate('/');

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
    })

    const onChange= (event)=>{
        setCredential({...credential, [event.target.name]:event.target.value})
    }

  return (
    <div>
        <Navbar/>
  <div className='container'>
    
    <form onSubmit={handleSubmit}>
    <div className="mb-3 mt-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control bg-transparent text-white" name='name' value={credential.name} onChange={onChange}/>
        
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control bg-transparent text-white" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange}/>
        <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control bg-transparent text-white" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChange}/>
    </div>

    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
        <input type="text" className="form-control bg-transparent text-white " name='Geolocation' value={credential.Geolocation} onChange={onChange}/>
        
    </div>
    {/* <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
        <input type="text" className="form-control bg-transparent text-white" id="exampleInputPassword1" name='address' value={credential.Geolocation} onChange={onChange}/>
    </div> */}
    
    <button type="submit" onSubmit={handleSubmit} className="m-3 btn btn-success">Submit</button>
    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
    </form>
</div>
</div>
  )
}
