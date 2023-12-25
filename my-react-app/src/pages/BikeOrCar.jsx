import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import './BikeOrCar.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function BikeOrCar(){
    const navigate=useNavigate();
    const navigateToBikeRegister = () =>{
        navigate('/bikeregister');
      };

      const navigateToCarRegister = () =>{
        navigate('/carregister');
      };
    
    return (
 
        <div class="box">
        <h2 class="Title">
        <span class="D">D</span>rive Time Vehicle <span>B</span>reakdown Assistance
        </h2>
        <h2 class="proffession">
        Are you a
        </h2>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={navigateToBikeRegister} >
          <i className="fa fa-motorcycle" />Bike Mechanic
          </button>
          </div>
          <div class="line"></div>
        
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={navigateToCarRegister}>
          <i className="fa fa-car" />Car Mechanic
          </button>
          </div>
          </div>
        );
        }
