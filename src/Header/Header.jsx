import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";

const Header = ({name}) => {
  const navigate = useNavigate();
  
  const [sample, setSample] = useState(true);

  const value = JSON.parse(localStorage.getItem("token"));
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setSample(!true);
    toast.success("You have logged out ");
    navigate("/");
  };

  return (
    <div id="main-header">
      <div id={value?"sub-header-1-1":"sub-header-1"}>
        <img style={{height :50,width:50,borderRadius : 50}} src='https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg'/>
        <h2 className="ms-5">Trendy Treasures.</h2>
      </div>
      <div id="sub-header-2">
        <ol id="lists">
          {value ? (
            <li className="me-3">
              <Link style={{ textDecoration: "none" }} to="/dashboard">
                <MdDashboard size="30" />
              </Link>
            </li>
          ) : (
            <li className="me-3">
              <Link style={{ textDecoration: "none" }} to="/">
                <IoIosHome size="30" />
              </Link>
            </li>
          )}
          <li className="me-3">
            <Link style={{ textDecoration: "none" }} to="/contact">
              <FaPhoneVolume size="20" />
            </Link>
          </li>
          <li className="me-3">
            <Link style={{ textDecoration: "none" }} to="/cart">
              <IoCartOutline size="30" id={value&&'cart-image'} />
             {value? <span id='notification-span'>{name}</span>:''}
            </Link>
          </li>
          {value ? (
            <li className="me-3">
              <Link style={{ textDecoration: "none" }} to="/">
                <IoIosLogOut size="30" onClick={logoutHandler} />
              </Link>
            </li>
          ) : (
            ""
          )}
        </ol>
      </div>
    </div>
  );
};

export default Header;
