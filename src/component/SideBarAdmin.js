import React, { useState } from 'react';
import '../styles/dashboard.css';
import { Link } from 'react-router-dom';


function SideBarAdmin() {
    const id = sessionStorage.getItem('id')

    
    
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };

    return (
        
            
            <>
                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar" style={{width:'95%'}}>

                        {/*  <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>
                        </a>

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*  <!-- Nav Item - Dashboard --> */}
                        
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/'} >
                            
                                <span>Home</span>
                                </Link>
                        </li>

                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />

                        {/*   <!-- Heading --> */}
                        <div className="sidebar-heading">
                            Interface
                        </div>

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Manager</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Manager Components:</h6>
                                    
                                    <Link className="collapse-item" to={`/managernoti`}>ManagerNoti</Link>
                                    <Link className="collapse-item" to={`/manageruser`}>ManagerUser</Link>
                                    <Link className="collapse-item" to={`/managerroom`}>ManagerRoom</Link>
                                    <Link className="collapse-item" to={`/account`}>ManagerAccount</Link>
                                    
                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                        

                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />

                        {/* <!-- Heading --> */}
                        <div className="sidebar-heading">
                            Addons
                        </div>

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-folder"></i>
                                <span>Pages</span>
                            </a>
                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Page Screens:</h6>
                                    <Link className="collapse-item" to={`/user/${id}`}>Profile</Link>
                                    <Link className="collapse-item" to={'/changepass'}>Change Password</Link>
                                    {/* <div className="collapse-divider"></div>
                                    <h6 className="collapse-header">Other Pages:</h6>
                                    <a className="collapse-item" href="404.html">404 Page</a>
                                    <a className="collapse-item" href="blank.html">Blank Page</a> */}
                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Charts --> */}
                       

                        {/* <!-- Divider --> */}
                        
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/manager/resident'} >
                            
                                <span>Manager Resident</span>
                                </Link>
                        </li>
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/managerpayment'} >
                            
                                <span>Manager Payment</span>
                                </Link>
                        </li>
                    </ul>
                    
                    
                </div>
           </>
        
    )
}

export default SideBarAdmin;