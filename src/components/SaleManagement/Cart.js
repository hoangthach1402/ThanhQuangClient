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
    <div className={clsx('bg-light border  text-white p-2 shadow',styles.cart)}>
        {carts.length ===0 && <p className="text-black fw-bold">Chưa Có Sản Phẩm</p>}
        {carts && carts.map(cart=>(
        <div key={cart.id} className={clsx(styles.item)}>
        <div className={clsx(styles.containImg,'p-2')}><img className={styles.img} src={cart.img} alt="" /></div>
        <div className='fw-bold mx-2'>{cart.name}</div>
        <div className='fw-bold'>{cart.price}</div>
        <div className={styles.quantity}>
        <input type="number" value={cart.stock}  onChange={e=>handleChange([{stock:e.target.value},{id:cart.id}])}/>
        </div>
        <div><button className="btn" onClick={()=>handleRemoveCart(cart.id)}><span>&#10060;</span></button></div>
        </div>
        ))
        }
       {carts.length!==0 && <button className="btn btn-dark" onClick={()=>handleOrder()}>Order <span>&#129297;</span></button>} 
      
    </div>
       
  )
}
        
        
        

export default Cart