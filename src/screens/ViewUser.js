

import { Link, useNavigate, useParams } from "react-router-dom";
import TemplateUser from "../template/TemplateUser";


import { useState, useEffect } from "react";


export default function ViewUser() {
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState([])
    const { id } = useParams()
    
    const navigate =  useNavigate();
    const [currentUserID] = useState(sessionStorage.getItem('id'))
    
    useEffect(() => {
        fetch("http://localhost:9999/user/" + id)
            .then((resp) => resp.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    useEffect(() => {
        fetch('http://localhost:9999/account/'+id)
            .then(resp => resp.json())
            .then(data => {
                setAccount(data);
            })
            .catch(err => {
                console.log(err.message);
            })
      }, []);
    return (
        <>
            <TemplateUser>
                <div className="container">
                    <div className="main-body">
                        {/* Breadcrumb */}
                        
                        {/* /Breadcrumb */}
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img
                                                    src={users.avatar}
                                                    alt="Load"
                                                    className="rounded-circle"
                                                    width={150}

                                                />                                         
                                            <div className="mt-3">
                                                <h4>{account.username}</h4>
                                                <p className="text-secondary mb-1">FPT University</p>
                                                <p className="text-muted font-size-sm">
                                                  {users.StudentID}
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{users.name}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{users.email}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{users.phone}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Gender</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                               {users.gender}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {users.address}
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Link
                                                    className="btn btn-info "
                                                    // target="__blank"
                                                    to={`/manageruser`}
                                                >
                                                  Back 
                                                </Link>
                                            </div>

                                        </div>

                                        
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>





            </TemplateUser>
        </>
    );
}