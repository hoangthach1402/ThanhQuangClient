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
        // getUser({variables:{userId:selectedUserId}})
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

   const DebtToString=(debt)=>{
    return (
        <p className="bg-danger text-light fw-bold p-2 text-end"><span >&#128405;</span>Can Thanh Toan : ${debt} <i class="fs-3 fa-solid fa-triangle-exclamation"></i></p>
    )
   }
   const CompletePayment =()=>{
    return (
        <p className="text-light bg-success fw-bold p-2 text-end">Da Thanh Toan <i className="border p-1 bg-light border-light rounded-circle  text-success fa-solid fs-5 fa-check"></i></p>
    )
   }
    let n=0;
    return (
    <div className="bg-light">
   
     <button className="btn border border-dark bg-light text-dark m-2 "  onClick={()=>setIsCreate(!isCreate)}>Create Customer</button>
      {isCreate && <UserManagement />}  
      <div className="row  text-dark">
      <div className="col-xs-12 col-md-6 col-lg-6 col-xs-6 p-3 border border-light p-2">
      <table className="table   table-striped">
          <thead className="">
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
          </thead>
              <tbody>
              
              {user_data && user_data.users.map(user=>(
              <tr className={clsx(selectedUserId===user.id && 'table-active')} key={user.id} onClick={setSelectedUserId.bind(this,user.id)}>
                  <td>{++n}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
              </tr>
          ))}
              </tbody>
      </table>
      </div>
        <div className="col-xs-12 col-md-6 col-lg-6 col-xs-6 bg-light text-dark ">
            {u_loading && <p>Loading ...</p>}
            {u_data && <div className='p-4 border-start border-light  border-start border-light'>
               <div className="mb-4 border-bottom border-light py-2">

                <button onClick={()=>handleUpdate(u_data.user.id)} className="btn btn-success">Update User Info</button>
                <button onClick={()=>handleDeleteUser(u_data.user.id)} className="btn btn-danger mx-2">Delete</button>
               </div>
                {editUserState && 
                <div>
                <div className="row border p-4">
                <div className="col-sm-6 col-md-4 fw-bold ">Ten Khach Hang:</div>
                <div className="col-sm-6 col-md-8">
                 <input className="w-100" onInput={(e)=>handleChange({name:e.target.value})} value={editUserState.name}/> 
                </div>
                 <div className="col-sm-6 col-md-4 fw-bold">
                 Dia Chi :
                 </div>  
                 <div className="col-sm-6 col-md-8 ">
                 <input className="w-100" onInput={e=>handleChange({address:e.target.value})} value={editUserState.address}/>
                 </div> 
                 <div className="col-sm-6 col-md-4 fw-bold">
                  Mobile:
                 </div>   
                 <div className="col-sm-6 col-md-8">
                     <input className="w-100" onInput={e=>handleChange({mobile:e.target.value})} value={editUserState.mobile}/>
                 </div>   

                </div>

                </div>
                }
                {u_data.user.orders.map(order=>(
                <div key={order.id} className="bg-white text-black p-2 m-3 border border-dark w-100">
                    <p className="fw-bold border-bottom border-dark">Ma Don: {order.id}</p>
                    <table className="table table-striped">
                        <thead className="p-2">
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>SL</th>
                        </thead>
                        <tbody>
                        
                        {order.products.map((product,index)=>(
                            <tr key={product.id}>
                                <td>{++index}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <p className="fw-bold text-light p-2 bg-dark  d-block w-80 text-end"><span>&#128181; </span> Tong Cong:  ${order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)} </p>
                         <p className="text-light bg-primary fw-bold p-2 text-end"><span>&#128181; </span> Da thanh toan : ${order.payying}</p>
                         { order.payying < order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)?DebtToString(substract(parseInt(order.products.reduce((a,b)=>{return a+ (b.price*b.stock)},0)),parseInt(order.payying))):CompletePayment()}      
                    <button className="btn border  border-dark d-block ms-auto" onClick={()=>handleDeleteOrder(order.id)}>Xoa Hoa Don </button>  
                </div>
                ))}


              
            </div>}
        </div>    
      </div>

    </div>
  )
}

export default UserDashboard