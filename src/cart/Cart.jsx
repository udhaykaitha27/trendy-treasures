import React,{useEffect} from 'react';
import './Cart.css';
import {useNavigate,Link} from 'react-router-dom'

const Cart = ({value,cartid,cartElements}) => {

    const tokenValue = JSON.parse(localStorage.getItem('token'))

  
    const navigate = useNavigate();

    const option = (amount) => {
        return {
          key: "rzp_test_NxjSVglSxxwwCU",
          amount: amount * 100 + 1000,
          currency: "USD",
          description: "Hold-on your paying the money",
          handler: function (response) {
            if (response.razorpay_payment_id) {
              cartid(0);
              cartElements();
              navigate("/order-placed",{state : {data :totalPrice}});
            }
          },
        };
      };

      const buyHandler = (data) => {
        const rzp1 = new window.Razorpay(option(data));
        rzp1.open();

      };



const cartElement = value.map((eachCart,index)=>{
    try{
    const {title,thumbnail,category,price}=eachCart;

    return(
        <div key={index}>
        <div className='border p-1 d-flex align-items-center justify-content-around' >
        <h3>{title}</h3>
        <img height={100} id='image-media' src={thumbnail}/>
        <h3 id='date-media'>{category}</h3>
        <h2>Price : <span id='mark-media'>&#36;{price}</span></h2>
        </div>
        <br/>
        </div>
    )
}
catch(error)
{
    console.log(error.message.data)
}
})


 const totalPrice = value.reduce((acc,number)=>acc+number.price,0)
    

 useEffect(()=>{
  document.title = 'books-cart'
    },[])

  return (
    <div style={{height:'100vh'}} className='cart-container '>
        <div className=' ps-5 pe-5 d-flex  justify-content-between align-items-center'>
            <h3 className='align-items-center'>Your cart Items</h3>
            {tokenValue?<Link style={{textDecoration : 'none',
                color : 'red'
            }} to='/dashboard'>Shop More !</Link>:<span className='text-decoration-line-through text-danger'>Shop More</span>}
        </div>
        <hr/>
      {tokenValue?<div>{ cartElement }</div>
      :<div className='mb-5'><span className='ms-5 '> Please login to view your cart items!!</span></div>}
      <div className='d-flex ps-5 pe-5 justify-content-between'>
        
      <button
          className="btn  btn-warning ms-5"
          onClick={() => buyHandler(totalPrice)}
        >
          Buy now 
        </button>
        <h3>Total : <mark>&#36; {tokenValue?totalPrice:0}</mark></h3>
      </div>
    </div>
  )
}

export default Cart
