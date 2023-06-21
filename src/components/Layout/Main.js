import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "./../Footer/Footer";

export const UserContext=createContext('');

const Main = () => {
  const [user,setUser]=useState('');
  return (
    <div>
      <UserContext.Provider value={[user,setUser]}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      </UserContext.Provider>
    </div>
  );
};

export default Main;
