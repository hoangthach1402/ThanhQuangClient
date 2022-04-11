import React,{useState,useContext} from 'react'
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
  console.log(selectedUserId);
 
   const [isCartOpen,setIsCartOpen] = useState(false);
   const {loading:loading_products,error:error_products,data:data_products} = useQuery(getProducts)
   const {loading:loading_users,error:error_users,data:data_users} = useQuery(getUsers)
  //  console.log(data_users);
  const [isCreateCustomer,setIsCreateCustomer] =useState(false)
  
  return (
    <div className="container  border">
      {isOrder && <Order />}
     <button  onClick={()=>setIsCartOpen(!isCartOpen)} className={clsx('btn btn-primary text-white',styles.buttonCart)}>OpenCart</button>
     {isCartOpen && <Cart />}
     <h3>Welcome Sale Station </h3><button onClick={()=>setIsCreateCustomer(!isCreateCustomer)} className="btn btn-dark text-white">Create Customer</button>
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
        <div key={product.id} className="cardItem">
        <div className={clsx(styles.cartProduct)} style={{width: "12rem"}}>
  <img className="card-img" src={product.img} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
  </div>
    
  <ul className="list-group ">
    <li className="list-group-item">Price: {product.price}</li>
    <li className="list-group-item">Type: {product.type}</li>
  </ul>
  <div><button onClick={()=>addToCart(product)}>Add to cart</button></div>
  </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default SaleManagement
        
   
  
  
  