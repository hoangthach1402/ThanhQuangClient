import React, { useState, useEffect } from "react";
import GlobalState from "./components/GlobalState/GlobalState";
import { Container } from "react-bootstrap";
import BookList from "./components/BookList/BookList";
import { Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form";
import clsx from "clsx";
import { useQuery, gql } from "@apollo/client";
import { createContext } from "react";
import { get } from "jquery";
import SaleManagement from './components/SaleManagement/SaleManagement';
export const ThanhQuangContext = createContext();
function App() {
  const [isOrder,setIsOrder] = useState(false);
  console.log(isOrder);
  const [isSale,setIsSale] = useState(false); 
  const [carts,setCarts] =useState([]) 
  const handleRemoveCart =(id)=>{
  const newCarts = carts.filter(cart=>cart.id !== id);
  setCarts(newCarts);
  }
  const handleAddToCart=(product)=>{
  console.log('run');
  setCarts([...carts,{...product}])
  }
  const handleOrder=()=>{
  setIsOrder(!isOrder);
  }
  const addToCart =(product)=>{
    let isNotExist = carts.find(cart=>cart.id===product.id) ===(null || undefined); 
    isNotExist &&  setCarts([...carts,{...product}]) ;
  }
   
  const ThanhQuangContextValue = {
  carts,handleRemoveCart,handleAddToCart,addToCart,handleOrder,isOrder
  };
  return (
    <ThanhQuangContext.Provider value={ThanhQuangContextValue}>
      <button onClick={()=>setIsSale(!isSale)}>{isSale?'Book Station':'Sale Station'}</button>
    
      {isSale?<SaleManagement />: 
        <div
        className="container py-3 mt-3"
        style={{ backgroundColor: "lightcyan" }}
      >
        <h1 className="text-center text-info mb-3 ">My Books</h1>
        <hr />
        <Form />
        <hr />
        <BookList />
      </div>
      }
      
    </ThanhQuangContext.Provider>
  );
}

export default App;
