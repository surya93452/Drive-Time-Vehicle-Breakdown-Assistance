import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import CarMechanicDetails from "./pages/CarMechanicDetails";
import BikeMechanicDetails from "./pages/BikeMechanicDetails";
import Header from "./components/header";
import Footer from "./components/footer";
import BikeOrCar from "./pages/BikeOrCar";
import MechanicLogin from "./pages/MechanicLogin";
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPassword';
import CarRegisterPage from "./pages/CarMechanicRegisterPage";
import BikeRegisterPage from "./pages/BikeMechanicRegister";
import Tutorials from "./pages/Tutorials";
import './App.css';
import NearbyPetrolBunks from "./pages/petrol"


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/car-mechanic-details" element={<CarMechanicDetails />} />
          <Route path="/Bike-mechanic-details" element={<BikeMechanicDetails />} />
          <Route path="/Tutorials" element={<Tutorials />}/>
          <Route path="/mechanic-login" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/carregister" element={<CarRegisterPage />} />
          <Route path="/bikeregister" element={<BikeRegisterPage />} />
          <Route path="/reset" element={<ForgotPasswordPage />} />
          <Route path="/bikeorcar" element={<BikeOrCar />}/>
          <Route path="/Mechanic-page" element={<MechanicLogin />}/>
          <Route path="/PetrolBunk" element={<NearbyPetrolBunks />}/>
          

        </Routes>
        </main>
      <Footer />
    </BrowserRouter>
  </div>
    
  );
}

export default App;
