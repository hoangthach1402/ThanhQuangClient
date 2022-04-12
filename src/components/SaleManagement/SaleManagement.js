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

  return (
    <div className="container  border bg-dark text-white p-3">
      {isOrder && selectedUser && <Order user={selectedUser}/> }
      {isOrder && !selectedUser? <p className="bg-danger position-fixed top-0 left-0 w-50 text-white p-2">please select user</p>:''}
     <div>
     <button  onClick={()=>setIsCartOpen(!isCartOpen)} className={clsx('btn btn-primary text-white position-relative',styles.buttonCart)}>{isCartOpen ?'Close Cart':'Show Cart'}
     <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">{carts.length}<span class="visually-hidden"></span></span>
     </button>
     {isCartOpen && <Cart />}

     </div>
     <h3>Welcome Sale Station </h3><button onClick={()=>setIsCreateCustomer(!isCreateCustomer)} className="btn btn-light mx-2">Create Customer</button>
     {isCreateCustomer && <UserManagement />}
    
     <select name="" id=""
     onChange={(e)=>setSelectedUserId(e.target.value)}
     >
     <option value="">Select User</option>
     {data_users && data_users.users.map(user=>(
      <option value={user.id} key={user.id}>{user.name}</option>
     ))}
     </select>
      <div className="p-2 mt-2 cardList">
      
      {data_products && data_products.products.map(product=>(
        <div key={product.id} className="cardItem bg-light p-2 border text-black">
        <div className={clsx(styles.cartProduct)} style={{width: "12rem"}}>
      <div className="imgContainer">
      <img className="card-img" src={product.img} alt="Card image cap" />
      </div>
       <div>
         {/* {product.name} */}
       <p>Ten San Pham: <span className="fw-bold">{product.name}</span></p>
       <p>Gia: <span className="fw-bold text-danger">${product.price}</span></p>
       <p>Loai: <span className="fw-bold">{product.type}</span></p>
       </div> 
  <div>
  <button className="btn border" onClick={()=>addToCart({...product,stock:1})}>Add to cart</button></div>

    

  </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default SaleManagement
        
   
  
  
  