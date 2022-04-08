import React,{useContext} from 'react'
import clsx from 'clsx';
import styles from './Cart.module.scss';
import {ThanhQuangContext} from '../../App';

const Cart = () => {
  const {carts,handleRemoveCart,handleOrder} = useContext(ThanhQuangContext) ;

  return (
    <div className={clsx('bg-info text-white p-2',styles.cart)}>
        {carts.length ===0 && <p>Cart is empty</p>}
        {carts && carts.map(cart=>(
        <div key={cart.id} className={styles.item}>
        <div className={styles.containImg}><img className={styles.img} src={cart.img} alt="" /></div>
        <div className={styles.title}>{cart.name}</div>
        <div className={styles.quantity}>
        <input type="number" value={1} />
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