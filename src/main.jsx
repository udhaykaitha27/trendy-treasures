import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Authprovider from './Authprovider.jsx';
  import './index.css';

  


ReactDOM.createRoot(document.getElementById('root')).render(
  <Authprovider>
    <App />
    <ToastContainer/>
    </Authprovider>,
)
