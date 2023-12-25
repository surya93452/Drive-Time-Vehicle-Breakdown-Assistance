import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './LoginPage.css'
import "bootstrap/dist/css/bootstrap.min.css"
 
export default function LoginPage(){
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const logInUser = (e) => {
      e.preventDefault();
        if(email.length === 0){
          alert("Email has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                //console.log(response.data);
                navigate("/Mechanic-page", {state: {...response?.data }});
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }   
  return (
    <div className="Auth-form-container1">
      <form className="Auth-form1"  onSubmit={logInUser}>
        <div className="Auth-form-content1">
          <h3 className="Auth-form-title1">Sign In</h3>
          <div className="text-center1">
              Not registered yet?{""}<p className="link-primary"> <a href="/bikeorcar">Sign Up</a></p>
              </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" >
            <i className="fa fa-sign-in" />Sign in
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
             <a href="/reset">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
    );
}