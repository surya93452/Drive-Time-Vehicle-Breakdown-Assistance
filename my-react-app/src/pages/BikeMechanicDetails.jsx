import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import './CarMechanicDetails.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'

export default function BikeMechanicDetails(){
 
    const [stateDropdownList,setStateid] = useState([]);
    const [statedropdownname,setStatename] = useState('Please select');
    const [districtDropdownList,setDistrictid] = useState([]);
    const [districtDropdownName,setDistrictName] = useState({label: "Please select", value: ""});
    const [cityDropdownList,setCityid] = useState([]);
    const [cityDropdownName,setCityName] = useState({label: "Please select", value: ""});
    const [searchResults,setSearchResults] = useState([]);
    
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
    
        const onSubmitSelect = (e) => {
            e.preventDefault();
            axios.post('http://127.0.0.1:5000//get_users_by_city', {
                city_id: cityDropdownName.value,
                isCarMechanic: 'N'
              })
              .then(function (response) {
                console.log(response);
                setSearchResults(response.data.users);

               
              })
              .catch(function (error) {
                  console.log(error, 'error');
              });
    }
    
  return (

    <div className="Auth-form-container5">
      
    <form className="Auth-form5" onSubmit={onSubmitSelect}>

      <div className="Auth-form-content5">
      
        <h3 className="Auth-form-title5">Search For Bike Service Centers</h3>  

      <div className="form-group mt-3 row-flex ">
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

      <div className="form-group mt-3 row-flex">
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

      <div className="form-group mt-3 row-flex">
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

        <div className="gap-2 mt-3 btn-container">
          <button type="submit" className="btn btn-primary" >
          <i className="fa fa-search" />Search
          </button>
        </div>
        <div className="main-section" >
          { searchResults?.length > 0 && (
            <h3 style={{ color: "black", marginRight: "23em"}}>Search Results</h3>
          )}
            {searchResults?.map(result => (
              <div className="result-card">
                <div className="div-width">
                  <div className="text-style"><i className="fa fa-user" /><b>Name: </b>{result.mechanic_name}</div>
                  <div className="text-style"><i className="fa fa-phone" /><b>Contact No: </b>{result.contact_number}</div>
                </div>
                <div className="div-width">
                  <div className="text-style"><i class="fa fa-home" /><b>Shop Name: </b>{result.shop_name}</div>
                  <div className="text-style grid-style">
                    <div><i className="fa fa-address-card" /><b>Address: </b></div>
                    <div>{result.address}</div>
                  </div>
                  <div className="text-style"><i className="fa fa-map-marker" /><b>Map: </b><a href={result.geolocation} target="_blank">{result.geolocation}</a></div>
                  <div className="text-style grid-style">
                    <div><i className="fa fa-info-circle" /><b>About Us: </b></div>
                    <div>{result.shop_description}</div>
                  </div>
                </div>
            </div>
        ))}
        </div>

      </div>
    </form>
  </div>
);
}