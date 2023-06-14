import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";




export default function Banner() {
  return (
    
      <div className="slide-container">
        <Fade>
          <div className="each-fade">
            <img src="https://ocd.fpt.edu.vn/Content/images/landing/bg1.jpg" />
          </div>
          <div className="each-fade">
            <img src="https://ocd.fpt.edu.vn/Content/images/landing/bg2.jpg" />
          </div>
          <div className="each-fade">
            <img src="https://ocd.fpt.edu.vn/Content/images/landing/bg3.jpg" />
          </div>
          <div className="each-fade">
            <img src="https://ocd.fpt.edu.vn/Content/images/landing/bg4.jpg" />
          </div>
          <div className="each-fade">
            <img src="https://ocd.fpt.edu.vn/Content/images/landing/bg5.jpg" />
          </div>
        </Fade>
      </div>
      
  );
}
