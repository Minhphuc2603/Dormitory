import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";



export default function SideBar() {
     return (
               <div id="menu-full" className='menu-full'>
                    <div className='menu-top'>
                         <div className='menu-infor'>
                              <div className='menu-avatar'>
                                   <img src='https://png.pngtree.com/png-vector/20220608/ourlarge/pngtree-round-kid-avatar-boy-face-png-image_4919114.png'></img>
                              </div>
                              <div>
                                   <h4>User:</h4>
                                   <h6>Balance:</h6>
                              </div>
                         </div>
                         
                         <div className='menu-link'>
                              <Row>
                                   <Col>
                              <Link to="/"className="menu-linkitem col-">Home</Link>
                              <Link to="/user"className="menu-linkitem col-">Manager Profile</Link>
                              
                              <Link to="/manageruser"className="menu-linkitem">Manager User</Link>
                              <a href='#' className='menu-linkitem'>
                                   <p>Booking beds</p>
                              </a>
                              <a href='#' className='menu-linkitem'>
                                   <p>Available beds</p>
                              </a>
                              <a href='#' className='menu-linkitem'>
                                   <p>Payment History</p>
                              </a>
                              <a href='#' className='menu-linkitem'>
                                   <p>Resident History</p>
                              </a>
                              <a href='#' className='menu-linkitem'>
                                   <p>My Request</p>
                              </a>
                              <a href='#' className='menu-linkitem'>
                                   <p>Regulation</p>
                              </a>
                                 </Col>
                              </Row>
                         </div>
                    </div>

                    <div className='menu-bottom'>
                         <div className='memu-bottom-detail'>
                              <a href="#" className='btn-logout'>Logout</a>
                         </div>

                    </div>
               </div>
     );
}