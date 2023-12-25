import {useNavigate} from 'react-router-dom';

import './header.css';
function Header() {
    const navigate=useNavigate();

      const navigateToHome = () =>{
        navigate('/');
      };
      const navigateToCarMechanic = () =>{
        navigate('/mechanic-details');
      };
      const navigateToBikeMechanic = () =>{
        navigate('/BikeMechanic');
      };
      const navigateToTutorials = () =>{
        navigate('/Tutorials');
      };
    return (
        <div class="box">
        <h2 class="Title">
            <span class="D">D</span>rive Time Vehicle <span>B</span>reakdown Assistance
        </h2>
        <h2 class="proffession">
            Are you a
        </h2>
        <h3 class="mechanic-button">Bike Mechanic</h3>
        <div class="line"></div>
        <h3 class="car-mechanic">Car Mechanic</h3>
    </div>
   
                   
  );
}

export default Header;
