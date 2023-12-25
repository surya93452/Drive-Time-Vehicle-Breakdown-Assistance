
import BrakeAdjustment from "../videos/BrakeAdjustment.mp4"
import FuseBlown from "../videos/FuseBlown.mp4"
import EngineOilChange from "../videos/ChangeEngineOil.mp4"
import CheckBatteryHealth from "../videos/BatteryHealth.mp4"

import './Tutorials.css'

export default function Tutorials(){

    return (
      <div  className="video-container-style">
        
        <div>
          <h3>How to Adjust Brakes?</h3> 
          <video  controls src={BrakeAdjustment}  width="750" height="500" />
        </div>
        <div>
          <h3>What to do if fuse blown up?</h3>   

          <video controls src={FuseBlown}  width="750" height="500" />
          </div>
          <div>
          <h3>How to Change Engine Oil?</h3>   

          <video  controls src={EngineOilChange}  width="750" height="500" />
          </div>
          <div>
          <h3>How to Check Battery Health?</h3>   

          <video controls src={CheckBatteryHealth}  width="750" height="500" />
          </div>

        
      </div>
    );
}
  
