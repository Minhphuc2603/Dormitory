
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function HeaderApp() {
  const id = sessionStorage.getItem('id')
  const role = sessionStorage.getItem('userrole')
  
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout")) {
      sessionStorage.removeItem('id')

      navigate('/')
      toast.success("Logout success")
    }

  }
  
    const [users, setUsers] = useState([])
   
    useEffect(() => {
    fetch('http://localhost:9999/user/'+id)
        .then(resp => resp.json())
        .then(data => {
            setUsers(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);


  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" />
      <nav>
        <ul>
          <div claaName="col-md-12" style={ { marginRight:"200px", color: "#FF33FF" }}>
            {id ? (
              <p>Xin chào, {users.name}!</p>
            ) : (
              <p></p>
            )}
          </div>
          <Link to="/" className="font">Home</Link>
          <Link to="/about" className="font">About</Link>
          {id ? (
            <>{role ==="admin"?(
              <Link to={`manageruser`} className="font">Manager Page</Link>
            ):
            <Link to={`/user/${id}`} className="font">Profile</Link>
            }
            
            <Link onClick={() => handleLogout()} className="font">Logout</Link>
            
            </>
          )
            
            : <Link to="/login" className="font">Login</Link>
          }


        </ul>
      </nav>
    </div>
  );
}

export default HeaderApp;



