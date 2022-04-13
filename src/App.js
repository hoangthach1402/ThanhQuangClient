import React, { useState, useEffect } from "react";
import { createContext } from "react";
import SaleManagement from './components/SaleManagement/SaleManagement';
import ProductManagement from './components/SaleManagement/ProductManagement';
import OrderManagement from './components/SaleManagement/OrderManagement'
import UserDashboard from './components/SaleManagement/UserDashboard';
import ProductHistory from './components/SaleManagement/ProductHistory'
import clsx from 'clsx'
export const ThanhQuangContext = createContext();
function App() {
  const [selectStation,setSelectStation] = useState('Sale'); 
  const [isSaleManagement,setIsSaleManagement] = useState(false)
  const [isOrder,setIsOrder] = useState(false);
  const [carts,setCarts] =useState([]) 
  const [isSelectedBtn,setIsSelectedBtn] = useState(); 
  const handleRemoveCart =(id)=>{
  const newCarts = carts.filter(cart=>cart.id !== id);
  setCarts(newCarts);
  }
  const handleAddToCart=(product)=>{
  console.log('run');
  setCarts([...carts,{...product}])
  }
  const handleSetCarts=(products)=>{
    setCarts(products)
  }
  const handleOrder=()=>{
  setIsOrder(!isOrder);
  }
  const addToCart =(product)=>{
    let isNotExist = carts.find(cart=>cart.id===product.id) ===(null || undefined); 
    isNotExist &&  setCarts([...carts,{...product}]) ;
  }
  const handleNewCarts=()=>{
    setCarts([]);
  } 
  const ThanhQuangContextValue = {
  carts,handleRemoveCart,handleAddToCart,addToCart,handleOrder,isOrder,handleNewCarts,handleSetCarts
  };
 

  return (
    <ThanhQuangContext.Provider value={ThanhQuangContextValue}>
    <div className="border-bottom pb-2 border-dark m-2 d-flex flex-wrap d-none d-sm-none d-md-block">

      <button className={clsx('btn border-end',selectStation==='userDashboard'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('userDashboard')}><span>📚 </span>User Management </button>
      <button className={clsx('btn border-end px-4',selectStation==='Sale'&& 'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('Sale')}>🛍️ Sale </button>
      <button className={clsx('btn border-end',selectStation==='ProductManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('ProductManagement')}>🏠 Product Management</button>
      <button className={clsx('btn border-end',selectStation==='orderManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('orderManagement')}>📦 Order Management</button>
      <button className={clsx('btn border-end',selectStation==='historyProduct'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('historyProduct')}><span>&#128214;</span> Lịch Sử Hàng </button>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-md-none">
  <div class="container-fluid">
    <p><span className="fs-1 fw-bold">&#128018;</span> <span className="fs-1 fw-bold">SaleLIKEMonkey</span></p>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
      <div className={clsx('btn border-end',selectStation==='userDashboard'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('userDashboard')}><span>📚 </span>User Management </div>
        </li>
        <li>
      <div className={clsx('btn border-end px-4',selectStation==='Sale'&& 'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('Sale')}>🛍️ Sale </div>
        </li>

        <li>
      <div className={clsx('btn border-end',selectStation==='ProductManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('ProductManagement')}>🏠 Product Management</div>

        </li>
        <li>
      <div className={clsx('btn border-end',selectStation==='orderManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('orderManagement')}>📦 Order Management</div>

        </li>
        <li>
      <div className={clsx('btn border-end',selectStation==='historyProduct'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('historyProduct')}><span>&#128214;</span> Lịch Sử Hàng </div>

        </li>

        
       
      </ul>
    </div>
  </div>
</nav>


      {selectStation==='Sale' && <SaleManagement /> }
      {selectStation==='userDashboard' && <UserDashboard /> }
      {(selectStation==='ProductManagement') && <ProductManagement />}
      {(selectStation==='orderManagement') && <OrderManagement />}
      {(selectStation==='historyProduct') && <ProductHistory />}
  
      
    </ThanhQuangContext.Provider>
  );
}

export default App;
