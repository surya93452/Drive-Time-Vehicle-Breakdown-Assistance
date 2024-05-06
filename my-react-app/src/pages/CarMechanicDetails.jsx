import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import './CarMechanicDetails.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import Rating from "../components/Rating";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CarMechanicDetails(){
 
    const [stateDropdownList,setStateid] = useState([]);
    const [statedropdownname,setStatename] = useState('Please select');
    const [districtDropdownList,setDistrictid] = useState([]);
    const [districtDropdownName,setDistrictName] = useState({label: "Please select", value: ""});
    const [cityDropdownList,setCityid] = useState([]);
    const [cityDropdownName,setCityName] = useState({label: "Please select", value: ""});
    const [searchResults,setSearchResults] = useState([]);

    const [show, setShow] = useState(false);

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
const [userRating, setUserRating] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setSelectedUserEmail(e.target.id);
  }


  const handleChange = (e) => {
    setTotalStars(parseInt(Boolean(e.target.value, 10) ? e.target.value : 5));
  };

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
    

    const submitUserRating = (e) => {
      e.preventDefault();
    axios.post('http://127.0.0.1:5000/submit_review', {
            email: selectedUserEmail,
            rating:rating

    }).then(function (response) {
      console.log(response);
      setRating(null)
      setShow(false);
      setUserRating(response.data.averageRating)
 })
 .catch(function (error) {
     console.log(error, 'error');
     if (error.response.status === 409) {
         alert("Email Already exists");
     }
 });
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
                isCarMechanic: 'Y'
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
      
        <h3 className="Auth-form-title5">Search For Car Service Centers</h3>  

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
                  


                  <Button variant="primary" onClick={handleShow} id={result.email}>
        Rate Us
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="Rating">
      <h1>Star rating</h1>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={submitUserRating}>Submit</Button>
        </Modal.Footer>
      </Modal>


                </div>
                <div className="div-width">
                  <div className="text-style"><i class="fa fa-home" /><b>Shop Name: </b>{result.shop_name}</div>
                  <div className="text-style grid-style">
                    <div><i className="fa fa-address-card" /><b>Address: </b></div>
                    <div>{result.address}</div>
                  </div>
                  <div className="text-style"><i className="fa fa-map-marker" /><b>Map: </b><a href={result.geolocation} target="_blank">{result.geolocation}</a></div>
                  <div className="text-style grid-style">
                    <div><i className="fa fa-info-circle" /><b>Rating: </b></div>
                    <div><Rating rating={userRating || result.rating}/></div>
                    
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