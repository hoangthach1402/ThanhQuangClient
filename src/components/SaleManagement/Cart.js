import React,{useContext,useState} from 'react'
import clsx from 'clsx';
import styles from './Cart.module.scss';
import {ThanhQuangContext} from '../../App';

const Cart = () => {
  const {carts,handleRemoveCart,handleOrder,handleSetCarts} = useContext(ThanhQuangContext) ;
  const [stock,setStock] = useState(1)
  const handleChange =(changes)=>{
 if(carts){

 
 const [stockChange, productId] = changes
 const oldProduct = carts.find(p=>p.id === productId.id);
 const index = carts.findIndex(p=>p.id ===productId.id) ;
 const newProduct = {...oldProduct,...stockChange} 
 console.log(newProduct);
 const newCarts = [...carts];
 newCarts[index] = {...newProduct}
//  console.log(newCarts);
  handleSetCarts(newCarts);
 }
}
  return (
    <div className={clsx('bg-info text-white p-2',styles.cart)}>
        {carts.length ===0 && <p>Cart is empty</p>}
        {carts && carts.map(cart=>(
        <div key={cart.id} className={styles.item}>
        <div className={styles.containImg}><img className={styles.img} src={cart.img} alt="" /></div>
        <div className={styles.title}>{cart.name}</div>
        <div className={styles.title}>{cart.price}</div>
        <div className={styles.quantity}>
        <input type="number" value={cart.stock}  onChange={e=>handleChange([{stock:e.target.value},{id:cart.id}])}/>
        </div>
        <div><button onClick={()=>handleRemoveCart(cart.id)}>X</button></div>
        </div>
        ))
        }
       {carts.length!==0 && <button onClick={()=>handleOrder()}>Order</button>} 
      
    </div>
       
  )
}
        
        
        

export default Cart