
import {  useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TemplateUser from "../template/TemplateUser";
import { toast } from "react-toastify";

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: ""
    });

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if (user.name === null || user.name.trim() === "") {
          isproceed = false;
          errormessage += "Username";
        }
        if (user.email === null || user.email.trim() === "") {
            isproceed = false;
            errormessage += "Email";
          }
        if (user.phone === null || user.email.trim() === "") {
            isproceed = false;
            errormessage += "Phone";
          }
        if (user.address === null || user.address.trim() === "") {
            isproceed = false;
            errormessage += "Address";
          }

        if (!isproceed) {
            toast.warning(errormessage);
        
        }else {
            if (/^0\d{9}$/.test(user.phone)) {
            } else {
              isproceed = false;
              toast.warning("Phone numbers need 10 digits and start with the digit 0");
            }
          }
        return isproceed;
    }

    const handleSave = (e) => {
        e.preventDefault();
        if(IsValidate()){
        if (window.confirm("Are you sure you want to edit?")) {
            fetch(`http://localhost:9999/user/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then((res) => res.json())
                .then((data) => {
                    toast.success('Edit successful.');
                    navigate(`/user/${id}`);
                })
                .catch((err) => {
                    toast.error('Failed to edit: ' + err.message);
                });
        }
    }
    };

    useEffect(() => {
        fetch(`http://localhost:9999/user/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    return (
        <TemplateUser>
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        {/* Display user details */}
                                        {/* <img
                      src={mentor.avatar}
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    /> */}
                                        <div className="mt-3">
                                            <h4>{user.username}</h4>
                                            <p className="text-secondary mb-1">Full Stack Developer</p>
                                            <p className="text-muted font-size-sm">{user.address}</p>
                                            <button className="btn btn-primary">Follow</button>
                                            <button className="btn btn-outline-primary">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form onSubmit={handleSave}>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleInputChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={user.phone}
                                                    onChange={handleInputChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Gender</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <select
                                                     style={{width:'100%' , height:'40px'}}
                                                    name="gender"
                                                    value={user.gender}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={user.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <button type="submit" className="btn btn-info">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TemplateUser>
    );
}

export default EditUser;
