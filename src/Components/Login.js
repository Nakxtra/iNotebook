import { useState } from "react";
import React from 'react'
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: '', password: ''});

    // const {alertError} = useContext(AlertContext)

    const history = useHistory();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch( `http://localhost:5000/api/auth/login` , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          }); 
    
        const json = await response.json();
        
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            
            // alertError("success", "Successfully Logged In")
            props.showAlert("Successfully Logged In", "success")
        }
        else{
            // alert("Invalid Credentials!!")
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    
    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className="mb-4">User Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
