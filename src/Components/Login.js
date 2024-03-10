import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';

const Signup = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [redirectToWelcome, setRedirectToWelcome] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication Failed';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage)
                    })
                }
            }).then((data) => {
                alert('Login Successful');
                localStorage.setItem("token", data.idToken);
                setRedirectToWelcome(true);
            })
            .catch((err) => {
                alert(err.message);
            })
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    const divStyles = {
        width: "400px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        margin: '0 auto',
        marginTop: '50px',
        backgroundColor: '#8e5da98f',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
    };

    const buttonStyles = {
        marginTop: '10px',
    };

    if (redirectToWelcome) {
        return <Redirect to="/welcome" />;
    }

    return (
        <div>
            <Header />
            <div style={divStyles}>
                <Form onSubmit={submitHandler}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Login</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginBottom: '10px', backgroundColor: '#590080' }}>
                        Login
                    </Button>
                </Form>
                <Link to='/forgotpassword' style={{ textAlign: 'center', marginTop: '10px' }}>Forgot Password</Link>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Link to="/">
                    <Button variant="outline-primary" style={buttonStyles}>
                        Don't have an account? Signup
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
