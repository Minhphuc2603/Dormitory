import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [nextUserId, setNextUserId] = useState(0);
  
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  const navigate = useNavigate();
      const [users, setUsers] = useState([])
    useEffect(() => {
    fetch('http://localhost:9999/user')
        .then(resp => resp.json())
        .then(data => {
            setUsers(data);
            setNextUserId(data.length + 1);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (username === null || username === "") {
      isproceed = false;
      errormessage += "Username";
    }
    if (name === null || name === "") {
      isproceed = false;
      errormessage += "Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += "Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += "Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isproceed;
  };
  console.log(nextUserId)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo đối tượng người dùng mới
    const userObj = {
      id: nextUserId,
      name,
      email,
      phone,
      address,
      gender,
    };

    // Tạo đối tượng tài khoản mới
    const accountObj = {
      id: nextUserId,
      username,
      password,
      role: "student",
    };

    if (IsValidate()) {
      // Gửi dữ liệu người dùng
      fetch("http://localhost:9999/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userObj),
      })
        .then((res) => {
          if (res.ok) {
            // Cập nhật giá trị ID tiếp theo
            
            

            // Gửi dữ liệu tài khoản
            return fetch("http://localhost:9999/account", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(accountObj),
            });
          } else {
            throw new Error("Failed to register user");
          }
        })
        .then((res) => {
          if (res.ok) {
            // Cập nhật giá trị ID tiếp theo
            

            toast.success("Registered successfully.");
            navigate("/login");
          } else {
            throw new Error("Failed to register account");
          }
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
          console.error(err);
        });
    }
  };

    return (
        <div>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "200px" }}>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                            <div className="divider" />
                            <Link to={"/login"} className="btn btn-danger">
                                Close
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
