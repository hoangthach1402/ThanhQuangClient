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
  const [isOrderSuccess,setIsOrderSuccess]= useState(false);
  const [carts,setCarts] =useState([]) 
  const [isSelectedBtn,setIsSelectedBtn] = useState(); 
  const [isSuccessCreateUser,setIsSuccessCreateUser] = useState(false);
  const handleIsOrderSuccess=()=>{
    setIsOrderSuccess(!isOrderSuccess);
  }
  const handleCreateUserSuccess=()=>{
    setIsSuccessCreateUser(!isSuccessCreateUser);
  }
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
  ,handleCreateUserSuccess,isSuccessCreateUser,handleIsOrderSuccess
  };

  return (
    <ThanhQuangContext.Provider value={ThanhQuangContextValue}>
    {isOrderSuccess && 
      <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Tao Don Hang Thanh Cong </strong> 
  <button type="button" class="btn-close" ></button>
</div>
    }
    
    {isSuccessCreateUser && 
      <div className="alert alert-success alert-dismissible fade show" role="alert">
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    Tao Khach Hang Thanh Cong
</div>
    }
    <div className="alert alert-success alert-dismissible fade show w-80 index-10 btnAlert" role="alert">
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     <p>Tao Khach Hang Thanh Cong !</p> 
</div>
    <div className="bg-light shadow d-flex flex-wrap d-none d-sm-none d-md-block navPc">
    <span className="fs-3 fw-bold">&#128018; SaleLIKEMonkey</span>
      <button className={clsx('btn border-end',selectStation==='userDashboard'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('userDashboard')}><span>📚 </span>User </button>
      <button className={clsx('btn border-end px-4',selectStation==='Sale'&& 'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('Sale')}>🛍️ Sale </button>
      <button className={clsx('btn border-end',selectStation==='ProductManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('ProductManagement')}>🏠 Product</button>
      <button className={clsx('btn border-end',selectStation==='orderManagement'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('orderManagement')}>📦 Order </button>
      <button className={clsx('btn border-end',selectStation==='historyProduct'&&'btn text-dark bg-light border border-dark')} onClick={()=>setSelectStation('historyProduct')}><span>&#128214;</span> Lịch Sử  
      </button>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light opacity-100 d-md-none navMobile shadow">
  <div class="container-fluid ">
  
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
      <span onClick={()=>setSelectStation('userDashboard')} className='btn border'>📚</span>
      <span onClick={()=>setSelectStation('Sale')} className="btn">🛍️</span>
      <span  onClick={()=>setSelectStation('ProductManagement')} className="btn">🏠</span>
      <span  onClick={()=>setSelectStation('orderManagement')} className="btn">📦</span>
      <span onClick={()=>setSelectStation('historyProduct')} className="btn">&#128214;</span>
      <p><span className="fs-1 fw-bold">&#128018;</span></p>

    {/* <div className="collapse navbar-collapse shadow border-bottom border-dark" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
      <div className={clsx('w-100 text-left py-2 rounded-pill',selectStation==='userDashboard'&&'border border-dark')} onClick={()=>setSelectStation('userDashboard')}><span>&nbsp; 📚</span>User</div>
        </li>
        <li>
      <div className={clsx('w-100 text-left py-2 rounded-pill',selectStation==='Sale'&& ' border border-dark')} onClick={()=>setSelectStation('Sale')}>&nbsp;🛍️ Sale </div>
        </li>

        <li>
      <div className={clsx('w-100 text-left py-2 rounded-pill',selectStation==='ProductManagement'&&' border border-dark')} onClick={()=>setSelectStation('ProductManagement')}>&nbsp; 🏠 Product</div>

        </li>
        <li>
      <div className={clsx('w-100 text-left py-2 rounded-pill',selectStation==='orderManagement'&&' border border-dark')} onClick={()=>setSelectStation('orderManagement')}>&nbsp; 📦 Order </div>

        </li>
        <li>
        <div className={clsx('w-100 text-left py-2 rounded-pill',selectStation==='historyProduct'&&' border border-dark')} onClick={()=>setSelectStation('historyProduct')}><span>&nbsp;&#128214;</span> Lịch Sử  </div>
        </li>
      </ul>
    </div> */}
  </div>
</nav>


        
       

      <div className="containerApp">
      {selectStation==='Sale' && <SaleManagement /> }
      {selectStation==='userDashboard' && <UserDashboard /> }
      {(selectStation==='ProductManagement') && <ProductManagement />}
      {(selectStation==='orderManagement') && <OrderManagement />}
      {(selectStation==='historyProduct') && <ProductHistory />}
      </div>
  
      
    </ThanhQuangContext.Provider>
  );
}

export default App;
