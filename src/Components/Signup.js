import { useState } from "react";
import React from 'react'
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: '', email: '', password: '', cpassword: ''});

    const history = useHistory();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch( `http://localhost:5000/api/auth/createuser` , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
          }); 
    
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Signed up Successfully", "success")
        }
        else{
            props.showAlert("Already Exist", "danger")
        }
    }
    
    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className="mb-4">Create a New Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={handleChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
