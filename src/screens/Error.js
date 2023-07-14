import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };

    const containerStyle = {
        padding: '40px 0px',
        width: '850px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        textAlign: 'center',
    };

    const imgStyle = {
        height: '350px',
    };

    const buttonStyle = {
        backgroundColor: '#6c63ff',
        color: 'white',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bolder',
        padding: '10px',
        outline: 'none',
        border: 'none',
        transition: '0.2s all',
    };

    const mediaQueryStyle = {
        '@media (max-width: 360px)': {
            padding: '40px 0px',
            width: '300px',
            gap: '10px',
        },
        '@media (max-width: 780px)': {
            padding: '40px 0px',
            width: '300px',
            gap: '20px',
        },
        '@media (max-width: 480px)': {
            padding: '80px 0px',
            width: '300px',
            gap: '20px',
        },
        '@media (max-width: 240px)': {
            padding: '80px 0px',
            width: '300px',
            gap: '20px',
        },
    };

    return (
        <div id="container" style={containerStyle}>
            <h1>Oops! Page not found</h1>
            <img src="https://cpxrml.csb.app/src/404-image.svg" style={imgStyle} alt="404 error" />
            <h2>We can't find the page you're looking for!</h2>
            <div style={mediaQueryStyle.container}>
                <button style={buttonStyle} onClick={handleHome}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default Error;