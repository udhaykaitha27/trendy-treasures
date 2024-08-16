
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Dashboard.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [arrayOfBooks, setArrayOfBooks] = useState([]);
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filterHandler = (e) => {
    const sortedBooks = e.target.value === 'ascending'
      ? arrayOfBooks.sort((a, b) => a.price - b.price)
      : arrayOfBooks.sort((a, b) => b.price - a.price);
    setArrayOfBooks([...sortedBooks]);
    setFilter(e.target.value);
  };

  const searchHandler = (e) => {
    const object = arrayOfBooks.filter(data =>
      data.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearch(object);
    setCurrentPage(1); // Reset to the first page on search
  };

  const arrayOfData = search.length ? search : arrayOfBooks;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = arrayOfData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(arrayOfData.length / itemsPerPage);

  useEffect(() => {
    (async () => {
      try {
        const getArray = await axios.get("https://dummyjson.com/products");

        if (getArray.data) {
          setArrayOfBooks(getArray.data.products);
        }
      } catch (error) {
        toast.error("cannot render the books");
      }
    })();
  }, []);

  const books = currentBooks.map((eachObject) => {
    const { title, thumbnail, price, id, discountPercentage } = eachObject;

    return (
      <div id="each-div" className="p-4 m-2" key={id}>
        <div className="text-center" id="image-div">
          <img style={{ height: 200 }} src={thumbnail} alt="image" />
          <hr />
        </div>
        <div id="details-div">
          <h3>{title}</h3>
          <h3 className='text-success'>Price : &#36;{price}</h3>
          <h3 className='text-info'>Discount : {discountPercentage}% </h3>
          <hr />
          <div className="text-center">
            <button className="btn btn-warning">
              <Link to={`/bookinfo/${id}`} state={eachObject} id='viewmore-btn'>
                view more
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div>
      <input className='form-control w-50 m-auto mb-4 mt-4' type='text' onChange={searchHandler} placeholder='Find your product here......' />
      <select placeholder='Filter the products' onChange={filterHandler} className='form-control w-50 m-auto mb-4'>
        <option >Filter the products</option>
        <option value='ascending'>Low to High</option>
        <option value='descending'>High to Low</option>
      </select>
      <div id="books-container">{books}</div>
      <div className="pagination-controls text-center mt-4">
        <button className='btn btn-outline-primary' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>   Page {currentPage} of {totalPages} </span>
        <button className='btn btn-outline-success'  onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= arrayOfData.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

