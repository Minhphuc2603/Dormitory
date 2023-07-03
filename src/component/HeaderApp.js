
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function HeaderApp() {
  const id = sessionStorage.getItem('username')
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout")) {
      sessionStorage.removeItem('username')

      navigate('/')
      toast.success("Logout success")
    }

  }
  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" />
      <nav>
        <ul>
          <div claaName="col-md-12" style={ { marginRight:"200px", color: "#FF33FF" }}>
            {id ? (
              <p>Xin chào, {id}!</p>
            ) : (
              <p></p>
            )}
          </div>
          <Link to="/" className="font">Home</Link>
          <Link to="/about" className="font">About</Link>
          {id ? (
            <>
            <Link to="/user" className="font">Manager Profile</Link>
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



