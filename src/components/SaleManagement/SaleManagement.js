import React,{useState,useContext,useEffect} from 'react'
import UserManagement from './UserManagement';
import {getUsers,getProducts} from '../../graphql-client/queries'
import {useQuery} from '@apollo/client';
import Cart from './Cart'
import clsx from 'clsx';
import styles from './Cart.module.scss';
import Order from './Order';
import {ThanhQuangContext} from '../../App';
const SaleManagement = () => {
   const {isOrder} = useContext(ThanhQuangContext) 
   
   const [selectedUserId,setSelectedUserId] = useState() ;
   const {addToCart,carts} = useContext(ThanhQuangContext)
   const [selectedUser, setSelectedUser] = useState();
   const  [productAdd,setProductAdd] = useState(); 
   const [isCartOpen,setIsCartOpen] = useState(false);
   const {loading:loading_products,error:error_products,data:data_products} = useQuery(getProducts)
   const {loading:loading_users,error:error_users,data:data_users} = useQuery(getUsers)
 
  const [isCreateCustomer,setIsCreateCustomer] =useState(false)
  useEffect(() => {
    if(data_users && selectedUserId!=null){
      let user = data_users.users.find(user => user.id===selectedUserId)
      setSelectedUser(user)
    }
  },[selectedUserId])
  const showCart =()=>{
    return (
      <>
      <span>&#128584;</span><i className="fa-solid fa-cart-shopping"></i>
      </>
    )
  }
  const handleIsCreate =()=>{
    setIsCreateCustomer(!isCreateCustomer);
  }
  const CloseCart=()=>{
  return (
    <>
      <span>&#128585;</span>
    <i className="fa-solid fa-cart-shopping"></i>
    </>
  )
  }
  return (
    <div className="container  border bg-light text-white p-3">
      {isOrder && selectedUser && <Order user={selectedUser}/> }
      {isOrder && !selectedUser? <p className="bg-danger  text-white p-2">Chọn Khách Hàng <span>&#128064;</span> </p>:''}
     <div>
     <button  onClick={()=>setIsCartOpen(!isCartOpen)} className={clsx('btn border border-light bg-dark text-light position-relative ',styles.buttonCart)}>{isCartOpen ?CloseCart():showCart()}
     <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">{carts.length}<span class="visually-hidden"></span></span>
     </button>
     <button className="position-relative btn btnAomacanada ">Check
     
     {isCartOpen && <Cart />}
     </button>
     </div>
     
     
     
     <h3 className="text-dark">Welcome Sale Station </h3><button onClick={()=>setIsCreateCustomer(!isCreateCustomer)} className="btn btn-light mx-2 border border-dark">Tạo Khách Hàng Mới</button>
     {isCreateCustomer && <UserManagement handleIsCreate={handleIsCreate}/>}
    
     <select name="" id=""
     onChange={(e)=>setSelectedUserId(e.target.value)}
     >
     
     <option value="">Chọn Khách Hàng </option>
     {data_users && data_users.users.map(user=>(
      <option value={user.id} key={user.id}>{user.name}</option>
     ))}
     </select>
      <div className="p-2 mt-2 cardList">
      
      {data_products && data_products.products.map(product=>(
        <div key={product.id} className="cardItem bg-light p-2 border text-black">
      
        <div className="imgContainer">
        <img className="card-img" src={product.img} alt="Card image cap" />
        </div>
        <div className="cardContent">
        <div className="cardContent__Top">
         {/* {product.name} */}
        <p>Tên Sản Phẩm: <span className="fw-bold">{product.name}</span></p>
        <p>Gía : <span className="fw-bold text-danger">${product.price}</span></p>
        <p>Loại : <span className="fw-bold">{product.type}</span></p>
        <p>Hàng Còn : <span className="fw-bold ">{product.stock}</span></p>
        </div> 
    <div className="cardContent__Bottom">
    <button className="btn border border-dark" onClick={()=>addToCart({...product,stock:1})}>Them Vao Gio Hang <i className="fa-solid fa-cart-shopping"></i></button>
    </div>
       
  </div>
        </div>
       

    

      ))}
      </div>
    </div>
  )
}

export default SaleManagement
        
   
  
  
  