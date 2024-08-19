import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link,useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import {useContext} from 'react';
import { dataProvider } from "../Authprovider";

const Signup = () => {
  const [loader,setLoader] = useState(false)

const navigate = useNavigate();
  

  const {signUp} = useContext(dataProvider);


  const [signupdata, setSignupdata] = useState({
    FirstName: "",
    LastName:"",
    PhoneNumber: "",
    Email: "",
    Password: "",

  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSignupdata({
      ...signupdata,
      [name]: value,
    });
  };

  const signuphandler = async() => 
  {
    if(!signupdata.FirstName || !signupdata.Email || !signupdata.PhoneNumber || !signupdata.Password || !signupdata.LastName)
    {
      return toast.error('Please provide all the feilds!!!!!')
    }

    try {
      setLoader(true);
      const userSignUp = await signUp(signupdata);
      if(userSignUp)
      {
        setLoader(false);
        toast.success('Your account has been created successfully!!!!!!!!')
        return navigate('/login')
      }
      
    } catch (error) {
      setLoader(false)
      toast.error('We could not create your account ')
      
    }
      
  }

  useEffect(()=>{
    document.title = 'sign-up'
      },[])


  return (
    <div className="w-50 m-auto mt-5 border p-4 ">
    <div className='text-center '>
    {loader ? <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm me-3" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button> :''}
    </div>
      <Form.Text className="text-success">Please Sign-up here!!!!!</Form.Text>
      <Form>
        <Form.Control
          name="FirstName"
          onChange={inputHandler}
          className="mb-3 mt-3"
          type="text"
          placeholder="Enter your first name............"
        />
        <Form.Control
          name="LastName"
          onChange={inputHandler}
          className="mb-3 mt-3"
          type="text"
          placeholder="Enter your last name............"
        />
        <Form.Control
          name="Email"
          onChange={inputHandler}
          className="mb-3"
          type="email"
          placeholder="Enter your Email Id .............."
        />
        <Form.Control
          name="PhoneNumber"
          onChange={inputHandler}
          className="mb-3"
          type="number"
          placeholder="Enter your phone number............."
        />
        <Form.Control
          name="Password"
          onChange={inputHandler}
          className="mb-3"
          type="password"
          placeholder="Enter your password.............."
        />
        <Button onClick={signuphandler} className="mb-3 ">Signup</Button>
        <br />
        <Form.Text>Already have an account? </Form.Text>
        <Link to="/login">Login</Link>
      </Form>
    </div>
  );
};

export default Signup;
