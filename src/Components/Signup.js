import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const conpassRef = useRef('');

    const submitHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmpass = conpassRef.current.value;

        if (password === confirmpass) {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtdGRS_hZoIFX-OOXAcBBeWkkm2bfBavc',
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
                    }
                    else {
                        return res.json().then(data => {
                            let errorMessage = 'Authentication Failed';
                            if (data && data.error && data.error.message) {
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage)
                        })
                    }
                }).then((data) => {
                    alert('Signup Successful');
                    console.log(data.idToken);
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
        else {
            alert('Password does not match');
        }
        emailRef.current.value = '';
        passwordRef.current.value = '';
        conpassRef.current.value = '';
    }

    const divStyles = {
        width:"400px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'400px',
        margin: '0 auto',
        marginTop:'30px',
        backgroundColor: '#8e5da98f',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
    };

    const buttonStyles = {
        marginTop: '10px',
    };

    return (
        <div>
            <div style={divStyles}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" ref={conpassRef} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginBottom: '10px' }}>
                        Signup
                    </Button>
                </Form>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button variant="outline-primary" type="submit" style={buttonStyles}>
                    Have an account? Login
                </Button>
            </div>
        </div>
    );
};

export default Signup;
