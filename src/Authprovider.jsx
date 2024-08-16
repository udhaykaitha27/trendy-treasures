import React from 'react';
import {createContext} from 'react';
import axios from 'axios';



 export const dataProvider = createContext();

const Authprovider = ({children}) => {


 

  const userAPI = 'https://the-techie-crud.onrender.com/'

  const signUp = async(data) =>
  {
      const createUser = await axios.post(`${userAPI}user-creation`,data)
      return createUser.data;
  }
      
  

  const logIn = async(data) =>
  {
      const loginUser = await axios.post(`${userAPI}user-login`, data)
      return (loginUser.data.loginToken)   
    
  }

 

  return (
    <dataProvider.Provider value={{signUp,logIn}}>
      {children}
    </dataProvider.Provider>
  )
}

export default Authprovider;

