import React,{useContext,useState,useEffect} from 'react'
import {getOrders} from '../../graphql-client/queries';
import {ThanhQuangContext} from '../../App';
import {useQuery} from '@apollo/client'

const OrderManagement = () => {
  const [orderSelectedId,setOrderSelectedId] = useState(null) ;
  const [order, setOrder] = useState();
  const {loading,error,data} = useQuery(getOrders) ;
  const [total,setTotal] = useState();
  async function getOrder(){

    if(orderSelectedId && data){
      let selectOrder =await  data.orders.find(order=>order.id===orderSelectedId);
      // console.log(typeof selectOrder)
     setOrder({...selectOrder});
    }
    } 
    // let total =0 ;
    useEffect(() => {
      getOrder();
      // 
    },[orderSelectedId])
    console.log(order)
  

   
  
  return (
    
    <div className="bg-white">
    <h3>Welcome Order Management Station</h3>
    <div className='row'>
      <div className="col-6">
        {data && data.orders.map(order=>(
        <div key={order.id} onClick={setOrderSelectedId.bind(this,order.id)} className="p-2 m-2 bg-dark text-white">
         <p >ID: {order.id}</p>
          <p>{order.user.name}</p>
        </div>
        ))
        }
       
      </div>
      <div className="col-6 order_Detail">
     {orderSelectedId && order && 
     <div>
     <p>{order.user.name}</p>
     <table>
     <tr>
       <th>ProductName</th>
       <th>Price</th>
       <th>Stock</th>
     </tr>
       
       {order.products.map(product=>(
         <tr key={product.id}>
         <td>{product.name}</td>
         <td>{product.price}</td>
         <td>{product.stock}</td>
       </tr>
       ))}
     </table>
        <p>Paying : ${order.payying}</p>
        <p>Total: </p>
        
     </div>
        
     }
      </div>
    </div>
    </div>
  )
}

export default OrderManagement