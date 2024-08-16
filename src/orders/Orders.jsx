import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const tax = 5;
  const deliveryCharges = 5;
  const location = useLocation();
  const { title, thumbnail, price } = location.state;

  useEffect(() => {
    document.title = "orders";
  }, []);

  return (
    <div id="order-div" className="text-center bg-success">
      <div>
        <h4>your,</h4>
        {price ? (
          <div>
            <h3>{title}</h3>
            <img height="200" className="rounded" src={thumbnail} />
          </div>
        ) : (
          <h4>Orders</h4>
        )}
        <h3>Has been placed successfully </h3>
        <h4>Will be reaching you in 7 days</h4>
        <hr />
        <div className='d-flex flex-row-reverse justify-content-around'>
          <div>
          <Link to='/dashboard' className='text-warning'> Do you wanna Explore more?</Link>
          </div>
          <div id='table-media'>
            <table className="table table-success table-striped w-100 m-auto">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Description</th>
                  <th>Amount paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{price ? "Price of the product" : "Price of the products"}</td>
                  <td className="table-warning">&#36;
                    {price ? price : location.state.data}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>tax paid </td>
                  <td className="table-warning">&#36;{tax}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Delivery Charges paid</td>
                  <td className="table-warning">&#36;{deliveryCharges}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Total Amount paid</td>
                  <td className="table-warning">&#36;
                    {price
                      ? price + tax + deliveryCharges
                      : location.state.data + tax + deliveryCharges}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
