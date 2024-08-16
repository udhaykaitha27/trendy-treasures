import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booksinfo.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";



const Booksinfo = ({ value, cartNum, useIt }) => {
  const location = useLocation();
  const { state } = location;
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    weight,
    images,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    thumbnail,
  } = state;

  const [cartNot, setCartNot] = useState(useIt + 1);

const [cartbtn, setCartbtn] = useState(false);
const [like, setLike] = useState(false);
const [commentsdis, setCommentsdis] = useState(0);
const [del, setDel] = useState(0);

  const imagesOfproducts = images.map((eachImage, i) => {
    return (
      <div className={"me-5"} key={i}>
        <img height="50" src={eachImage} />
      </div>
    );
  });

  const reviewsOfProduct = reviews.map((eachReview, i) => {
    const { rating, comment, reviewerName, reviewerEmail } = eachReview;
    return (
      <div key={i} className=" m-3 p-3 rounded">
        <h4>Rating : {rating}</h4>
        <h4>Comments : {comment}</h4>
        <h4>Name of Reviewer : {reviewerName}</h4>
        
        <hr />
      </div>
    );
  });

  const navigate = useNavigate();
  const myref = useRef();
  const myrefrate = useRef();

  // const TokenId = JSON.parse(localStorage.getItem('token'));

  const likeHandler = () => {
    setLike(!false);
  };

  const unlikeHandler = () => {
    setLike(false);
  };

  const deleteComments = () => {
    localStorage.removeItem("comment");
    setDel((prev) => prev + 1);
  };

  const commentsdisplay = JSON.parse(localStorage.getItem("comment"));

  const runThise = () => {
    if (commentsdisplay == null || commentsdisplay == undefined) {
      return (
        <div className="border w-50 mt-3 rounded pt-2">
          <p className='ms-3'>No Comments!!!!</p>
        </div>
      );
    } else {
      const { rating, comments, price } = commentsdisplay;

      return (
        <div id="comments-div " className=" p-3 border h-50 w-50 mt-3 rounded-2">
          <h5>Rating : {rating}</h5>
          <p>
            Comments :<br /> {comments}
          </p>
          <button
            className="btn btn-outline-danger mb-3 "
            onClick={deleteComments}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const displayComments = runThise();

  const option = (amount) => {
    return {
      key: "rzp_test_NxjSVglSxxwwCU",
      amount: amount * 100 + 1000,
      currency: "USD",
      description: "Hold-on your paying the money",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          navigate("/order-placed", { state });
        }
      },
    };
  };

  const [ratings, setRatings] = useState({
    rating: "",
    comments: "",
    price:state.price
  
  });

  // console.log(ratings)

  const ratingsHandler = (e) => {
    const { name, value } = e.target;
    setRatings({
      ...ratings,
      [name]: value,
    
    });
  };

  const submitComments = () => {
    myref.current.value = "";
    myrefrate.current.value = "";
    localStorage.setItem("comment", JSON.stringify(ratings));
    setCommentsdis((prev) => prev + 1);
  };

  const buyHandler = (data) => {
    const rzp1 = new window.Razorpay(option(data));
    rzp1.open();
  };

  const cartHandler = () => {
    value(state);
    setCartNot((prev) => prev + 1);
    cartNum(cartNot);
    setCartbtn(!false);
  };

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div id="individual-book" className="bg-dark text-white ">
      <div>
        <h1>Welcome to Trendy - Treasures !!!!!!!!!!</h1>
      </div>
      <div id="img-like" className="mb-4 mt-5">
        <div id="single-like" style={{ cursor: "pointer" }}>
          {like ? (
            <FcLike onClick={unlikeHandler} size={43} />
          ) : (
            <FcLikePlaceholder onClick={likeHandler} size={40} />
          )}
        </div>
        <img id="single-image" src={thumbnail} />
      </div>
      <div className="d-flex">{imagesOfproducts}</div>
      <hr />
      <div>
        <h3 className='text-info'> {title}</h3>
        <p>
          <span style={{textDecoration : 'underline'}}>Product price :</span> <br />
          Discount on product : <mark>{discountPercentage}%</mark><br />
          price you avail :<mark className='bg-success'>&#36;{price}</mark> 
        </p>
        <p className='text-warning'>
         <span style={{textDecoration : 'underline'}} > About Product : </span>
          <br />
          Brand : {brand}
          <br />
          Category : {category}
          <br />
          Shipping : {shippingInformation}
          <br />
          Warranty : {warrantyInformation}
          <br />
          Availability : {availabilityStatus}
          <br />
          Left in Stock : {stock}
          <br />
        </p>

        <h4>
         <span style={{textDecoration : 'underline'}} >Features :</span>  <br />
          Order Quantity : {minimumOrderQuantity}
          <br />
          weight : {weight}
          <br />
          Rating : {rating}
          <br />
          Return Policy : {returnPolicy}
        </h4>

        <p className="mt-4 mb-4">
          <span style={{ textDecoration: "underline" }}>Read About It :</span>
          <br /> {description}
        </p>
        <button onClick={cartHandler} className="btn btn-outline-warning">
          {cartbtn ? "Added to cart" : "Add to cart"}
        </button>
        <button
          className="btn  btn-outline-success ms-5"
          onClick={() => buyHandler(price)}
        >
          Buy now
        </button>
      </div>
      <div id="ratings-div" className="border p-4 rounded-3 mt-5">
        <h4>Give your comments here!!!!!!</h4>
        <input
          ref={myrefrate}
          name="rating"
          onChange={ratingsHandler}
          className="form-control m-3 w-25"
          type="number"
          placeholder="Give your rating"
          min="1"
          max="5"
        />
        <textarea
          ref={myref}
          name="comments"
          onChange={ratingsHandler}
          placeholder="Enter your comments here!!!!!!"
          className="form-control m-3 w-50"
        />

        <button onClick={submitComments} className="btn btn-outline-info ms-3">
          Submit
        </button>
      </div>

      {commentsdisplay ? (
        state.price == commentsdisplay.price ? (
          displayComments
        ) : (
          <div className="border w-50 mt-3 rounded pt-2">
            <p className='ms-4'>Give your comment</p>
          </div>
        )
      ) : (
        displayComments
      )}
      <div className="border mt-5 p-3 rounded">
        <p>
          Ratings by our customers : <hr />
        </p>
        {reviewsOfProduct}
      </div>
    </div>
  );
};

export default Booksinfo;
