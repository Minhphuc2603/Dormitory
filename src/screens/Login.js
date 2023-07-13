import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const usenavigate = useNavigate();

    useEffect(()=>{
        const id =sessionStorage.getItem('id')
        if(id){
            usenavigate("/error")
        }
    },[])

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
          fetch('http://localhost:9999/account')
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error('Failed to fetch user data');
              }
            })
            .then((data) => {
              const foundUser = data.find(
                
                (user) => user.username === username && user.password === password && user.status===true
              );
              if (foundUser) {
                console.log('id:', foundUser.id);
                console.log('Role:', foundUser.role);
                sessionStorage.setItem('id', foundUser.id);
                sessionStorage.setItem('userrole', foundUser.role);
                usenavigate('/');
                toast.success('Success');
                
              } else {
                toast.error('Please enter valid credentials');
              }
            })
            .catch((err) => {
              toast.error('Failed to fetch user data: ' + err.message);
            });
        }
      };
      


    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="">

            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '200px' }}>
                <form onSubmit={ProceedLogin} className="container login-form">
                    <div className="card">

                        <div className="card-header" style={{ textAlign: "center", color: "purple" }}>
                            <img style={{ marginBottom: "30px" }} src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" />
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span style={{ color: 'red' }}>*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span style={{ color: 'red' }}>*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer " style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-success">Login</button>
                            <div class="divider" />
                            <Link className="btn btn-primary" to={'/'}>Back Home</Link>
                        </div>
                        <div className="text-center mb-2">
                            Don't have an account?
                            <Link to="/register" className="ml-2">
                                Register here
                            </Link>
                        </div>

                        <div>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;