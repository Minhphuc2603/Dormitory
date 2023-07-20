
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




function HeaderApp() {
  const id = sessionStorage.getItem('id')
  const role = sessionStorage.getItem('userrole')

  const navigate = useNavigate();
  // Hàm để hiển thị/ẩn modal
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const [showModal, setShowModal] = useState(false); // State để điều khiển hiển thị modal
  const handleLogout = () => {
    setShowModal(false); // Ẩn modal khi logout
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('userrole');
    sessionStorage.removeItem('DomID');
    navigate('/');
    toast.success("Logout success");
  }

  const [users, setUsers] = useState([])
  
 
  useEffect(() => {
    if(id!==null){
    fetch('http://localhost:9999/user/' + id)
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => {
        
      })
    }
  }, []);

 
  

  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" />
      <nav>
        <ul>
          <div style={{ marginRight: "200px", color: "#FF33FF" }}>
            {id ? (
              <p>Xin chào, {users.name}!</p>
            ) : (
              <p></p>
            )}
          </div>
          <Link to="/" className="font">Home</Link>
          <Link to="/about" className="font">About</Link>
          {id ? (
            <>{role === "admin" ? (
              <Link to={`manageruser`} className="font">Manager Page</Link>
            ) :
              <Link to={`/user/${id}`} className="font">Profile</Link>
            }

              <Link onClick={toggleModal} className="font">Logout</Link>

            </>
          )

            : <Link to="/login" className="font">Login</Link>
          }


        </ul>
      </nav>
      {/* Modal Logout */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
      <style>{`
            .navbar-links {
              display: flex;
              align-items: center;
              margin-left: auto;
              gap: 20px;
            }
            .navbar-brand {
                margin-right: 20px;
              }
          `
      }</style>
    </div>
  );
}

export default HeaderApp;



