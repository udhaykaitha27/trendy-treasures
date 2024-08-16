import React, {lazy, Suspense,useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header/Header';
import {useNavigate} from 'react-router-dom'



const Signup = lazy(() => import('./Signup/Signup'));
const Contact = lazy(() => import('./contact/Contact'));
const Login = lazy(() => import('./Login/Login'));
const Dashboard = lazy(()=> import('./Dashboard/Dashboard'))
const Home = lazy(()=> import('./Home/Home'));
const Bookinformation = lazy(()=>import('./BookInfo/Booksinfo'));
const Orders = lazy(()=>import('./orders/Orders'));
const Cart = lazy(()=> import('./cart/Cart'))



const App = () => {


  const[arrayOfcart,setArrayOfcart] = useState([])
  const[check,setCheck] = useState(0);
 const [cartNotification,setCartNotification] = useState(0)

  const cartCount = (data) =>
  {
      setCartNotification(data)
  }

  const cartItems = (data) => {

  setArrayOfcart((prev)=>[...prev,data])  
  setCheck(1);
  // navigate('/cart')


  }

  

  const cartElements = () =>
  {
    setArrayOfcart([]);
  }





  return (
    <BrowserRouter>
      <Header name={cartNotification}/>
      <Suspense  fallback={<h1 style={{marginLeft:50}}>Loading................</h1>}>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/contact' element={<Contact/>}/>    
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>     
        <Route path='bookinfo/:number'  element={<Bookinformation useIt={cartNotification} cartNum={cartCount} value={cartItems}/>}/>
        <Route path='/order-placed' element={<Orders  />}/>
        <Route path='/cart' element={<Cart cartid={cartCount} value={arrayOfcart} cartElements={cartElements}/>}/>
        <Route path='*' element={<h2>Cannot load the page!!!!!!!!</h2>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
