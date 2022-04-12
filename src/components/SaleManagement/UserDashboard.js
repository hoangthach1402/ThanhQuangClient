import React,{useState,useEffect} from 'react'
import {useQuery,useMutation} from '@apollo/client';
import {deleteOrder,editUser,deleteUser} from '../../graphql-client/mutations';
import UserManagement from './UserManagement';
import {getUsers,getUser,getOrders} from '../../graphql-client/queries';
import clsx from 'clsx';
const UserDashboard = () => {
   const [editUserValue,editUserMutate] = useMutation(editUser,{
       refetchQueries:[{query:getUsers}]
   })
    const [deleteUserValue,deleteUserMutate] = useMutation(deleteUser);
    const [deleteOrderById,deleteOrderMutate] = useMutation(deleteOrder)
    const [isCreate,setIsCreate]= useState(false);
   const {loading:user_loading, error:user_error, data:user_data} = useQuery(getUsers);
    const [isDebt,setIsDebt] = useState(false)
    const [selectedUserId,setSelectedUserId] = useState(null);
 
    const handleChange = (changes)=>{
        setEditUserState({ ...editUserState,...changes})
    }
    const [editUserState,setEditUserState] =useState({name:"",mobile:"",address:""});
  
    const handleUpdate =(id)=>{
        // const testQuery ={
        //     editUserId:selectedUserId,
        //     name:editUserState.name,
        //     mobile:editUserState.mobile,
        //     address:editUserState.address
        // }
        // console.log(testQuery)
            editUserValue({variables:{
            editUserId:selectedUserId,
            name:editUserState.name,
            mobile:editUserState.mobile,
            address:editUserState.address
        },
        refetchQueries: [{ query:getUser,variables:{userId:selectedUserId}}]
    })
    }

   const {loading:u_loading,error:u_err,data:u_data} = useQuery(getUser,{
       variables: {
        userId:selectedUserId
       }
   })

   useEffect(()=>{
       if(user_data){
           const findUser = user_data.users.find(u=>u.id===selectedUserId)
           setEditUserState({...editUserState,...findUser});
        }
    },[selectedUserId])



   const substract =(a,b)=>{
       let result =  a-b ;
       return result
   }

   const handleDeleteOrder =(id)=>{
    deleteOrderById({
        variables: {
            deleteOrderId:id
        },
        refetchQueries: [{query:getUser,variables:{userId:selectedUserId}}]
    })
   }
   const handleDeleteUser =(id)=>{
    deleteUserValue({
        variables: {
            deleteUserId:id
        },
        refetchQueries: [{ query:getUsers},{query:getUsers,variables:{userId:selectedUserId}}]
    })
   }


    let n=0;
    return (
    <div >
     <button className="btn btn-success m-2"  onClick={()=>setIsCreate(!isCreate)}>Create Customer</button>
      {isCreate && <UserManagement />}  
      <div className="row bg-dark text-white">
      <div className="col-6 p-3 ">
      <table>
          <tr className="border-bottom border-light p-2">
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
          </tr>
          {user_data && user_data.users.map(user=>(
              <tr className={clsx(selectedUserId===user.id && 'bg-white text-black')} key={user.id} onClick={setSelectedUserId.bind(this,user.id)}>
                  <td>{++n}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
              </tr>
          ))}
      </table>
      </div>
        <div className="col-6 bg-dark text-white ">
            {u_loading && <p>Loading ...</p>}
            {u_data && <div className='p-4 border-start border-light'>
               <div className="mb-4 border-bottom border-light py-2">

                <button onClick={()=>handleUpdate(u_data.user.id)} className="btn btn-success">Update User Info</button>
                <button onClick={()=>handleDeleteUser(u_data.user.id)} className="btn btn-danger mx-2">Delete</button>
               </div>
                {editUserState && 
                <>
                <p>Ten Khach Hang: <input onInput={(e)=>handleChange({name:e.target.value})} value={editUserState.name}/> </p>
                <p>Dia Chi : <input  onInput={e=>handleChange({address:e.target.value})} value={editUserState.address}/></p>
                <p>So Dien Thoai :<input onInput={e=>handleChange({mobile:e.target.value})} value={editUserState.mobile}/></p>

                </>
                }
                {u_data.user.orders.map(order=>(
                <div key={order.id} className="bg-white text-black p-2 border border-dark">
                    <p>Ma Don: {order.id}</p>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>SL</th>
                        </tr>
                        
                        {order.products.map((product,index)=>(
                            <tr key={product.id}>
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
                    <button onClick={()=>handleDeleteOrder(order.id)}>Xoa Hoa Don </button>  
                </div>

                ))}


            </div>}
        </div>    
      </div>

    </div>
  )
}

export default UserDashboard