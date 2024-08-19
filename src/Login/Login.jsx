import React, { useState,useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataProvider } from '../Authprovider';
import { toast } from 'react-toastify';



const Login = () => {

  const navigate = useNavigate();

  const [loader,setLoader] = useState(false)

  const { logIn } = useContext(dataProvider);


  const [loginData, setLoginData] = useState({
    Email: '',
    Password: ''
  })

const inputdataHndlr = (e) => {
 const {name,value} = e.target;
 setLoginData({
  ...loginData,
  [name] : value
 })
}


  const loginHandler = async() => {
    if (!loginData.Email || !loginData.Password)
    {
      return toast.error('Please enter your login Credentials!!!!!!!')
    }


      try {
        setLoader(true);
        const userLogin = await logIn(loginData);
        if(userLogin)
        {
          localStorage.setItem('token', JSON.stringify(userLogin))
          setLoader(false);
           toast.success('You have logged in successfully!!!!!!!!')
           return navigate('/dashboard');
           
        }

      } catch (error) {
        toast.error('Couldnt find your account')
        setLoader(false);
      }
  }

  useEffect(()=>{
    document.title = 'login-page'
      },[])

  return (
    <>
    <div className='text-center '>
    {loader ? <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm me-3" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button> :''}
    </div>

    <div className='w-50 m-auto mt-5 border p-4 '>
      <Form >
        <Form.Text className='text-success'>Please Log-in here!!!!!</Form.Text>
        <Form.Control name='Email' onChange={inputdataHndlr} className='mb-3 mt-3 ' type='email' placeholder='Enter your Email Id ..............' />
        <Form.Control name='Password' onChange={inputdataHndlr} className='mb-3 ' type='password' placeholder='Enter your password..............' />
        
        <Button className='mb-3 ' onClick={loginHandler}>Login</Button>
        <br />
        <Form.Text >Your email is safe with us !!!!!!!!!!</Form.Text>
        <br/>
        <Form.Text>Couldnt find your account ? <Link to='/signup'>create one</Link></Form.Text>

      </Form>
    </div>

    </>
  )
}

export default Login
