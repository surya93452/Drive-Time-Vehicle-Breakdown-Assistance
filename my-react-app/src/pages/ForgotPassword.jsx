import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const ResetPassword = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      alert("Email has been left blank!");
    } else if (password.length === 0) {
      alert("Password has been left blank!");
    } else {
      axios.post('http://127.0.0.1:5000/reset', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        alert("Password Updated Successfully")
        navigate("/login");
       
      })
      .catch(function (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred while resetting the password.");
        }
      });
    }
  }

  return (
    <div className="Auth-form-container2">
      <form className="Auth-form2"  onSubmit={ResetPassword}>
        <div className="Auth-form-content2">
          <h3 className="Auth-form-title2">Reset Your Password</h3>
        
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
              Submit
            </button>
          </div>
          <div className="text-center2">
    Return to Login <p className="link-primary"><a href="/login">Login</a></p>
</div>

        </div>
      </form>
    </div>



  //   <div>
  //               <form>
  //                 <div className="reset-account">
  //                   <p className="reset-account">Reset Your Password</p>
  //                 </div>
 
  //                 <div className="reset-email">
  //                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
  //                   <label className="form-label" for="form3Example3">Email address</label>
  //                 </div>
             
  //                 <div className="reset-password">
  //                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
  //                   <label className="form-label" for="form3Example4">Password</label>
                  
  //                   <button type="button" className="btn" onClick={ResetPassword} >Reset Password</button>
  //                   <p className="reset-register">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
  //                   </div>
 
  //               </form>
              
            
  //  </div>
);
}