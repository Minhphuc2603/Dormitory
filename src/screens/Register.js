import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SHA256 } from "crypto-js";



const Register = () => {


  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");
  const [StudentID, setStudentID] = useState("");
  const [account, setAccount] = useState("")


  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:9999/user')
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);

      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);
  useEffect(() => {
    fetch('http://localhost:9999/account')
      .then(resp => resp.json())
      .then(data => {
        setAccount(data);

      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);

  const IsValidate = () => {
    let isproceed = true;

    if (username === null || username.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in Username');
    }
    if (name === null || name.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in name');
    }
    if (phone === null || phone.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in phone');
    }
    if (address === null || address.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in address');
    }
    if (email === null || email.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in email');
    }
    if (StudentID === null || StudentID.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in studentID');
    }
    if (password === null || password.trim() === "") {
      isproceed = false;
      toast.warning('Please enter the value in address');
    }
    if (password !== confirmPassword) {
      isproceed = false;
      toast.warning('Passwords do not match');
    }
    if (!/^0\d{9}$/.test(phone)) {
      isproceed = false;
      toast.warning('Phone numbers need 10 digits and start with the digit 0');
    }
    const isExistingAccount = account.find((acc) => acc.username === username);
   if (isExistingAccount) {
    isproceed = false;
    toast.warning('Username already exists');
  }
  const isEmail = users.find((u) => u.email === email);
   if (isEmail) {
    isproceed = false;
    toast.warning('Email already exists');
  }
  const isID = users.find((u) => u.StudentID === StudentID);
   if (isID) {
    isproceed = false;
    toast.warning('StudentID already exists');
  }
  const isPhone = users.find((u) => u.phone === phone);
   if (isPhone) {
    isproceed = false;
    toast.warning('Phone already exists');
  }

    return isproceed;
  }





  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = SHA256(password).toString();



    // Tạo đối tượng người dùng mới
    const userObj = {

      name,
      email,
      phone,
      address,
      gender,
      StudentID,
      cost: 0

    };

    // Tạo đối tượng tài khoản mới
    const accountObj = {


      username,
      password: hashedPassword,
      role: "student",
      status: true
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
      <div className="offset-lg-3 col-lg-6" >
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
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <label>StudenID</label>
                <input
                  type="text"
                  className="form-control"
                  value={StudentID}
                  onChange={(e) => setStudentID(e.target.value)}
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