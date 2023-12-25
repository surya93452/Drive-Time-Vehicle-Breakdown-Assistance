import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './MechanicLogin.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'

export default function MechanicLogin(){
  const {state}=useLocation();
 
    const [isReadOnly, setReadOnly] = useState(true);
    const [email,setEmail] = useState(state.email);
    const [password,setPassword] = useState(state.password);
    const [shop_name,setShopName] = useState(state.shop_name);
    const [mechanic_name,setMechanicName] = useState(state.mechanic_name);
    const [contact_number,setcontactNumber] = useState(state.contact_number);
    const [address,setAddress] = useState(state.address);
    const [geolocation,setGeolocation] = useState(state.geolocation);
    const [shop_description,setShopDescription] = useState(state.shop_description);
  
    const [stateDropdownList,setStateid] = useState([]);
    const [statedropdownname,setStatename] = useState('Please select');
    const [districtDropdownList,setDistrictid] = useState([]);
    const [districtDropdownName,setDistrictName] = useState({label: state.district, value: state.district_id});
    const [cityDropdownList,setCityid] = useState([]);
    const [cityDropdownName,setCityName] = useState({label: state.city, value: state.city_id});

  
    
    // const []
    const navigate = useNavigate();
    

    useEffect(() => {
      // Update the document title using the browser API
      axios.get('http://127.0.0.1:5000/retrievelocations')
            .then(function (response) {
                console.log(response);
                //console.log(response.data);
                setStateid(response.data.states)
                setStatename(response.data.states[0].state_name);
                setDistrictid(response.data.districts)
                // setCityid(response.data.cities)
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
            axios.post('http://127.0.0.1:5000/getCityListByDistrict', {
              districtId: state.district_id
            })
            .then(function (response) {
              console.log(response);
              setCityid(response.data.cities);
            })
            .catch(function (error) {
                console.log(error, 'error');
            });
    },[]);
  
     
    const updateUserDetails = (e) => {
      e.preventDefault();
      if (districtDropdownName === "") {
        alert("Please select district");
        return;
      }
      if (cityDropdownName === "") {
        alert("Please select city");
        return;
      }
        axios.post('http://127.0.0.1:5000/update_user', {
            email: email,
            shop_name: shop_name,
            mechanic_name: mechanic_name,
            contact_number: contact_number,
            address: address,
            geolocation: geolocation,
            shop_description: shop_description,
            state: statedropdownname,
            district: districtDropdownName.label,
            city: cityDropdownName.label,
            district_id: districtDropdownName.value,
            city_id: cityDropdownName.value

     
        })
        .then(function (response) {
             console.log(response);
            navigate("/login");
            alert("User Updated Sucessfully") 
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 409) {
                alert("Email Already exists");
            }
        });
    };
    const onCityChange = (e) =>{
    e.preventDefault();
    setCityName({label: e.target.name, value: e.target.id})
    }
  

    const  onDropdownChange = (e) => {
      e.preventDefault();
      setDistrictName({label: e.target.name, value: e.target.id})
      
      axios.post('http://127.0.0.1:5000/getCityListByDistrict', {
        districtId: e.target.id
      })
      .then(function (response) {
        console.log(response);
        setCityid(response.data.cities);
      })
      .catch(function (error) {
          console.log(error, 'error');
      });
    }

    const onEditUserDetails = () => {
      setReadOnly(false);
    }
     
     
  return (
    

    <div className="Auth-form-container">
      <div className={`Auth-form ${!isReadOnly ? "hide-input" : "show-input"}`}>
      <div id="user-data-container" className="Auth-form-content">
      <h3 className="Auth-form-title">Mechanic Details</h3>
      <div className="row-style">
        <label>Email Address</label>
        <span>{email}</span>
      </div>
      <div className="row-style">
        <label>Shop Name</label>
        <span>{shop_name}</span>
      </div>

      <div className="row-style">
        <label>Mechanic Name</label>
        <span>{mechanic_name}</span>
      </div>

      <div className="row-style">
        <label>Contact Number</label>
        <span>{contact_number}</span>
      </div>
      <div className="row-style">
        <label>Shop Address</label>
        <span>{address}</span>
      </div>

      <div className="row-style">
        <label>State</label>
        <span>{statedropdownname}</span>
      </div>

      <div className="row-style">
        <label>District</label>
        <span>{districtDropdownName.label}</span>
      </div>

      <div className="row-style">
        <label>City</label>
        <span>{cityDropdownName.label}</span>
      </div>

      <div className="row-style">
        <label>Location Link</label>
        <span>{geolocation}</span>
      </div>

      <div className="row-style">
        <label>Shop Description</label>
        <span>{shop_description}</span>
      </div>

      <div className="d-grid gap-2 mt-3">
          <button type="button" className="btn btn-primary" onClick={onEditUserDetails}>Edit</button>
      </div>

    </div>
      </div>

         
    
    <form className={`Auth-form ${isReadOnly ? "hide-input" : "show-input"}`}  onSubmit={updateUserDetails}>

      <div className="Auth-form-content">
      
        <h3 className="Auth-form-title"> Update Details</h3>
      
        
        <div className="form-group mt-3">
          <label>Shop Name</label>
          <input type="shop_name" 
          value={shop_name} onChange={(e) => setShopName(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Shop Name" required
          />
                   
      </div>

      <div className="form-group mt-3">
          <label>Mechanic Name</label>
          <input type="mechanic_name" 
          value={mechanic_name} onChange={(e) => setMechanicName(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Mechanic Name" required
          />
                   
      </div>

      <div className="form-group mt-3">
          <label>Contact Number</label>
          <input type="contact_number" 
          value={contact_number} onChange={(e) => setcontactNumber(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Contact Number" required
          />
                   
      </div>
      
      <div className="form-group mt-3">
          <label>Shop Address</label>
          <input type="address" 
          value={address} onChange={(e) => setAddress(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Shop Address" required
          />
                   
      </div>

      <div className="form-group mt-3">
          <label>Select State</label>
          <div class="dropdown-center mt-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {statedropdownname}
            </button>
            <ul class="dropdown-menu">
            {stateDropdownList?.map(state => (
      <li><a class="dropdown-item" href="#">{state.state_name}</a></li>
      ))}

            </ul>
          </div>
      </div>

      <div className="form-group mt-3">
          <label>Select District</label>
          <div class="dropdown-center mt-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {districtDropdownName.label}
            </button>
            <ul class="dropdown-menu">
            {districtDropdownList?.map(district => (
              <li><a class="dropdown-item" id={district.district_id}  name={district.district_name} onClick={onDropdownChange} href="#">{district.district_name}</a></li>
            ))}

            </ul>
          </div>
      </div>

      <div className="form-group mt-3">
          <label>Select City/Area</label>
          <div class="dropdown-center mt-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {cityDropdownName.label}
            </button>
            <ul class="dropdown-menu">
            {cityDropdownList?.map(city => (
              <li><a class="dropdown-item" id={city.city_id}  name={city.city_name} onClick={onCityChange} href="#">{city.city_name}</a></li>
      
      ))}

            </ul>
          </div>
      </div>

      <div className="form-group mt-3">
          <label>Location Link</label>
          <input type="geolocation" 
          value={geolocation} onChange={(e) => setGeolocation(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Geolocation" required
          />
                   
      </div>

      <div className="form-group mt-3">
          <label>Shop Description</label>
          <input type="shop_description" 
          value={shop_description} onChange={(e) => setShopDescription(e.target.value)} 
          className="form-control mt-1" 
          placeholder="Enter Shop Description" required
          />
                   
      </div>



        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" >
            Update
          </button>
        </div>



      </div>
    </form>
  </div>




  //   <div>
  //               <form>
  //                 <div className="create-account">
  //                   <h1>Car Mechanic Registration</h1>
  //                   <p className="create-account">Create Your Account</p>
  //                 </div>
 
  //                 <div className="register-email">
  //                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form-email" className="form-control" placeholder="Enter a valid email address" required/>
  //                   <label className="form-label" for="form-email">Email address</label>
  //                 </div>
 
             
  //                 <div className="register-password">
  //                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form-password" className="form-control" placeholder="Enter password" required/>
  //                   <label className="form-label" for="form-password">Password</label>
  //                 </div>

  //                 <div className="register-shopname">
  //                   <input type="shop_name" value={shop_name} onChange={(e) => setShopName(e.target.value)} id="form-shopname" className="form-control" placeholder="Enter Shop Name" required/>
  //                   <label className="form-label" for="form-shopname">Shop Name</label>
  //                 </div>

  //                 <div className="register-mechanicname">
  //                   <input type="mechanic_name" value={mechanic_name} onChange={(e) => setMechanicName(e.target.value)} id="form-mechanicname" className="form-control" placeholder="Enter Mechanic Name" required/>
  //                   <label className="form-label" for="form-mechanicname">Mechanic Name</label>
  //                 </div>

  //                 <div className="register-contactnumber">
  //                   <input type="contact_number" value={contact_number} onChange={(e) => setcontactNumber(e.target.value)} id="form-contactnumber" className="form-control" placeholder="Enter Contact Number" required/>
  //                   <label className="form-label" for="form-contactnumber">Contact Number</label>
  //                 </div>

  //                 <div className="register-shopaddress">
  //                   <input type="address" value={address} onChange={(e) => setAddress(e.target.value)} id="form-shopaddress" className="form-control" placeholder="Enter Address" required/>
  //                   <label className="form-label" for="form-shopaddress">Shop Address</label>
  //                 </div>

  //                 <div className="register-geolocation">
  //                   <input type="geolocation" value={geolocation} onChange={(e) => setGeolocation(e.target.value)} id="form-geolocaion" className="form-control" placeholder="Enter Google Map link" required/>
  //                   <label className="form-label" for="form-geolocaion">Geolocation link</label>
  //                 </div>

  //                 <div className="register-shopdescription">
  //                   <input type="shop_description" value={shop_description} onChange={(e) => setShopDescription(e.target.value)} id="form-shopdescription" className="form-control" placeholder="Enter Shop Description" required/>
  //                   <label className="form-label" for="form-shopdescription">Shop Description</label>
  //                   <a href="/reset" className="text-body">Forgot password?</a>
  //                   <button type="submit" className="btn " onSubmit={registerUser} >Sign Up</button>
  //                   <p className="register-login">Login to your account <a href="/login" className="link-danger">Login</a></p>
  //                   </div>
  //               </form>          
  // </div>
);
}