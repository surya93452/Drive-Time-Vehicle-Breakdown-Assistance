import {useNavigate} from 'react-router-dom';

import './header.css';
function Header() {
    const navigate=useNavigate();

      const navigateToHome = () =>{
        navigate('/');
      };
      const navigateToCarMechanic = () =>{
        navigate('/car-mechanic-details');
      };
      const navigateToBikeMechanic = () =>{
        navigate('/Bike-mechanic-details');
      };
      const navigateToTutorials = () =>{
        navigate('/Tutorials');
      };
      const navigateToPetrolbunk = () =>{
        navigate('/PetrolBunk');
      }; 
    return (
        <header>
        <div class="logo"> <span>D</span>rive Time Vehicle     
            <div class="logob"><span>B</span>reakdown Assistance</div>
        </div>
        <ul class="navlist">
            <li><a  onClick={navigateToHome}  href='#'><i className="fa fa-home" />Home</a></li>
            <li><a onClick={navigateToCarMechanic} href='#'><i className="fa fa-car" />Car Service Centers</a></li>
            <li><a onClick={navigateToBikeMechanic} href='#'><i className="fa fa-motorcycle" />Bike Service Centers</a></li>
            <li><a onClick={navigateToTutorials} href='#'><i className="fa fa-wrench" />Tutorials</a></li>
            <li><a onClick={navigateToPetrolbunk} href='#'><i className="fa fa-tint" />Gas Stations</a></li>
        </ul>

    </header>
   
                   
  );
}

export default Header;
