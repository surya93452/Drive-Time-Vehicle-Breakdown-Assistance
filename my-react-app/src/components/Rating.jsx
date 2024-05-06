import "./Rating.css";
import React, { useEffect, useState } from "react";

export default function Rating(props) {
  const [rating, setRating] = useState(0);
  
  const [totalStars, setTotalStars] = useState(5);

  useEffect(() => setRating(props.rating || 0), [props.rating]);

  return (
    <div className="Rating">
      
      {[...Array(totalStars)].map((star, index) => {
        
        return (
          <label key={index}>
            
            <span
              className="star"
              style={{
                color:
                  (rating >= index + 1) ? "#ffc107" : "#e4e5e9",
              }}
              
            >
              &#9733;
            </span>
          </label>
        );
      })}
        
    
    </div>
  );
}
