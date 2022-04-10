import React, { useState, useEffect } from "react";
import BookList from "./components/BookList/BookList";
import Form from "./components/Form/Form";
import clsx from "clsx";
import { useQuery, gql } from "@apollo/client";
import { createContext } from "react";
import SaleManagement from './components/SaleManagement/SaleManagement';
import ProductManagement from './components/SaleManagement/ProductManagement';
export const ThanhQuangContext = createContext();
function App() {
  const [theme,setTheme] = useState(false);
  const [selectStation,setSelectStation] = useState('book'); 
  const [isSaleManagement,setIsSaleManagement] = useState(false)
  const [isOrder,setIsOrder] = useState(false);
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
 
      <button onClick={()=>setSelectStation('book')}>Book Management </button>
      <button onClick={()=>setSelectStation('Sale')}>Sale </button>
      <button onClick={()=>setSelectStation('ProductManagement')}>Product Management</button>
      
      {selectStation==='Sale' && <SaleManagement /> }
      {(selectStation==='ProductManagement') && <ProductManagement />}
      {selectStation==='book' && 
        <div
        className='container py-3'
       
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
