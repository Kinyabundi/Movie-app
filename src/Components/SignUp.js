//import { Alert } from "bootstrap";
import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {signUp} = useUserAuth();
  const navigate = useNavigate()
 const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    try {
        await signUp(email, password);
        navigate("/")
    } catch (err) {
        setError(err.message);
    }

 };
  return (
    <>
      <div className="p-4 box">
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="mb-3">Create An PopCornflix Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Control type="password" placeholder="Password"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign Up
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
