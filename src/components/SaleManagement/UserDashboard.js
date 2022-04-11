import React,{useState,useEffect} from 'react'
import {useQuery} from '@apollo/client';
import UserManagement from './UserManagement';
import {getUsers,getUser} from '../../graphql-client/queries';
import clsx from 'clsx';
const UserDashboard = () => {
   const [isCreate,setIsCreate]= useState(false);
   const {loading:user_loading, error:user_error, data:user_data} = useQuery(getUsers);
    const [isDebt,setIsDebt] = useState(false)
   const [selectedUserId,setSelectedUserId] = useState(null);
   const {loading:u_loading,error:u_err,data:u_data} = useQuery(getUser,{
       variables: {
        userId:selectedUserId
       }
   }) 
   const substract =(a,b)=>{
       let result =  a-b ;
       return result
   }
    let n=0;
    return (
    <div >
     <button  onClick={()=>setIsCreate(!isCreate)}>Create Customer</button>
      {isCreate && <UserManagement />}  
      <div className="row bg-info text-white">
      <div className="col-6">
      <table>
          <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
          </tr>
          {user_data && user_data.users.map(user=>(
              <tr className={clsx('p-2',selectedUserId===user.id && 'bg-dark text-white')} key={user.id} onClick={setSelectedUserId.bind(this,user.id)}>
                  <td>{++n}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
              </tr>
          ))}
      </table>
      </div>
        <div className="col-6 bg-dark text-white">
            {u_loading && <p>Loading ...</p>}
            {u_data && <div className='p-2'>
                <p>Ten Khach Hang: {u_data.user.name}</p>
                <p>Dia Chi :{u_data.user.address}</p>
                <p>So Dien Thoai :{u_data.user.mobile}</p>
                {u_data.user.orders.map(order=>(
                <div className="bg-dark text-white p-2 border">
                    <p>Ma Don: {order.id}</p>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>SL</th>
                        </tr>
                        
                        {order.products.map((product,index)=>(
                            <tr>
                                <td>{++index}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                         <p>Tong cong:{order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)} </p>
                         <p>Da thanh toan : {order.payying}</p>
                         { order.payying < order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)?`Can Thanh Toan :`+ substract(parseInt(order.products.reduce((a,b)=>{return a+ (b.price*b.stock)},0)),parseInt(order.payying)):'Da Thanh Toan Du' }
                    </table>  
                </div>

                ))}


            </div>}
        </div>    
      </div>

    </div>
  )
}

export default UserDashboard