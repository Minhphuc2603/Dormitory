import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";




export default function Banner() {
  return (
    
      <div className="slide-container">
        <Fade>
          <div className="each-fade">
            <img src="img/bg1.png" />
          </div>
          <div className="each-fade">
            <img src="img/bg2.jpg" />
          </div>
          <div className="each-fade">
            <img src="img/bg3.jpg" />
          </div>
          <div className="each-fade">
            <img src="img/bg4.jpg" />
          </div>
          
        </Fade>
      </div>
      
  );
}
