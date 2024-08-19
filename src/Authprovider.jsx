import React from 'react';
import {createContext} from 'react';
import axios from 'axios';



 export const dataProvider = createContext();

const Authprovider = ({children}) => {


 

  const userAPI = 'https://back-end-server-sh16.onrender.com/';

  const signUp = async(data) =>
  {
      const createUser = await axios.post(`${userAPI}create-user`,data)
      return createUser.data;
  }
      
  

  const logIn = async(data) =>
  {
      const loginUser = await axios.post(`${userAPI}login-user`, data)
      // console.log(loginUser)
      return (loginUser.data.updatedUser.JwtToken)   
    
  }

 

  return (
    <dataProvider.Provider value={{signUp,logIn}}>
      {children}
    </dataProvider.Provider>
  )
}

export default Authprovider;

