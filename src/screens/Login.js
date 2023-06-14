import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export default function LoginModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLoginClick(event) {
        event.preventDefault();
        // Xử lý logic đăng nhập ở đây
        setModalIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boder: '10px'
        }
    };

    return (
        <>
            <Link to="#" className="font" onClick={() => setModalIsOpen(true)}>Login</Link>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
                style={customStyles}
                closeTimeoutMS={200}
            >
                <div className="modal-content">

                    <form onSubmit={handleLoginClick} className="form">
                        <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" />
                        <h1>Login</h1>
                        <input class="form-control login-input" id="UserName" name="UserName" type="text"
                            value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" required=""></input>
                        <input class="form-control login-input" id="Password" name="Password" type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required=""></input>

                        <div className="buttons">
                            <button type="submit">Submit</button>
                            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


