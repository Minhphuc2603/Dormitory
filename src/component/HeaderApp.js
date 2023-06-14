import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import LoginModal from '../screens/Login';







    // <div className="header">
    //   <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png"/>
    //   <nav>
    //     <ul>
    //       <Link className="font">Home</Link>
    //       <Link className="font">Home</Link>
    //       <Link to="/login" className="font">Login</Link>
    //     </ul>
    //   </nav>
    //   </div>



function HeaderApp() {
  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png"/>
      <nav>
        <ul>
          <Link to="/" className="font">Home</Link>
          <Link to="/" className="font">About</Link>
          <li><LoginModal /></li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderApp;



