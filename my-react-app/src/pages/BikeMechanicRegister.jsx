import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import './BikeMechanicRegister.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'

export default function BikeRegisterPage(){
 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [shop_name,setShopName] = useState('');
  const [mechanic_name,setMechanicName] = useState('');
  const [contact_number,setcontactNumber] = useState('');
  const [address,setAddress] = useState('');
  const [geolocation,setGeolocation] = useState('');
  const [shop_description,setShopDescription] = useState('');

  const [stateDropdownList,setStateid] = useState([]);
  const [statedropdownname,setStatename] = useState('Please select');
  const [districtDropdownList,setDistrictid] = useState([]);
  const [districtDropdownName,setDistrictName] = useState({label: "Please select", value: ""});
  const [cityDropdownList,setCityid] = useState([]);
  const [cityDropdownName,setCityName] = useState({label: "Please select", value: ""});
    
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
    },[]);
  
     
    const registerUser = (e) => {
      e.preventDefault();

      
      if (districtDropdownName.label === "Please select") {
        alert("Please select district");
        return;
      }
      if (cityDropdownName.label === "Please select") {
        alert("Please select city");
        return;
      }
        axios.post('http://127.0.0.1:5000/signup', {
            email: email,
            password: password,
            shop_name: shop_name,
            mechanic_name: mechanic_name,
            contact_number: contact_number,
            address: address,
            geolocation: geolocation,
            shop_description: shop_description,
            isCarMechanic: 'N',
            state: statedropdownname,
            district: districtDropdownName.label,
            city: cityDropdownName.label,
            district_id: districtDropdownName.value,
            city_id: cityDropdownName.value 

     
        })
        .then(function (response) {
             console.log(response);
            navigate("/login");
            alert("User Created Sucessfully") 
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
     
     
  return (
    

    <div className="Auth-form-container">
      
    <form className="Auth-form"  onSubmit={registerUser}>

      <div className="Auth-form-content">
      
      
        <h3 className="Auth-form-title">Bike Mechanic Registration</h3>
        <div className="text-center">
            Already registered?{""}
            <p className="link-primary"> <a href="/login">Sign In</a></p>
            </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-1"
            placeholder="Enter email" required
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="form-control mt-1"
            placeholder="Enter password" required
          />
        </div>
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
            Submit
          </button>
        </div>

      </div>
    </form>
  </div>
);
}