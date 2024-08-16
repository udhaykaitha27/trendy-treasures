import React,{useEffect} from "react";
import "./Home.css";
import {Link,useLocation} from 'react-router-dom'

const Home = () => {

  useEffect(()=>{
    document.title = 'Home'
      },[])

  return (
    <div id="home-container">
      <div>
      <h4 id="greet-home">Welcome to Trendy-Tresures  !!<br/>&#128640; Shop today to avoid later regrets &#128640;</h4>
      </div>
      <div id="image-div-home">
        <img
          id="imagesmoving"
          height="150"
          src="https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png"
        />
        <img
          height="150"
          src="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png"
          
        />
        <img
          height="150"
          src="https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png"
        />
        <img
          height="150"
          src="https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png"
        />
        <img
          id="imagesmo"
          height="150"
          src="https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png"
        />
        <img
          id="imagesmo"
          height="150"
          src="https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png"
        />
        <img
          id="imagesmo"
          height="150"
          src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/3.png"
        />
        <img
          id="imagesmo"
          height="150"
          src="https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png"
        />
      </div>

      <div>
        <h5 id="quote-div" style={{ textTransform: "uppercase" }}>
        Don't be slow! Our prices are low.<br/> ** Hurry before stock runs out! **
        </h5>
      </div>
      <div id="sub-home-container">
        <h4 className='text-dark' id="shop-home"> Enjoy shopping beautifull products that you like</h4>
      </div>
      <p className='text-danger'>Have an Account? just <Link to='/login'>Click me </Link> to login into your account </p>
      <p className='text-danger'>Dont have an account , <Link to='/signup'>Create</Link> one</p>
    </div>
  );
};

export default Home;
