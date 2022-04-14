import React,{useState,useEffect,useContext} from 'react'
import {useQuery,useMutation} from '@apollo/client';
import {deleteOrder,editUser,deleteUser} from '../../graphql-client/mutations';
import UserManagement from './UserManagement';
import {getUsers,getUser,getOrders} from '../../graphql-client/queries';
import {ThanhQuangContext} from '../../App'
import clsx from 'clsx';
const UserDashboard = () => {
    const {handleCreateUserSuccess} = useContext(ThanhQuangContext)  
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
        <p className="w-50 ms-auto bg-danger text-light fw-bold  text-start"><span >&#128405;</span>Can Thanh Toan : ${debt} <i class="fs-3 fa-solid fa-triangle-exclamation"></i></p>
    )
   }
   const CompletePayment =()=>{
    return (
        <p className="w-50 ms-auto text-light bg-success fw-bold  text-start">✔️ Thanh Toán Đủ </p>
    )
   }
   const handleIsCreateUserDashboard =()=>{
     console.log('run')
     setIsCreate(!isCreate)
    }
     
   const test=()=>{
   console.log('test')
   }
    let n=0;
    return (
    <div className="bg-light ">
        <h4 className="text-dark text-center border-bottom border-dark ">USERS</h4>
     <button className="btn border border-dark bg-light text-dark m-2 "  onClick={()=>setIsCreate(!isCreate)}>Create Customer</button>
      {isCreate && <UserManagement handleIsCreateUserDashboard={handleIsCreateUserDashboard}/>}  
      <div className="row  text-dark">
      <div className="col-xs-12 col-md-6 col-lg-6 col-xs-6 border border-light userDashboard__Left overflow-auto  ">
      
      <div className="accordion-item ">
        <h2 className="accordion-header sticky-0" id="panelsStayOpen-headingTwo">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-four" aria-expanded="true" aria-controls="panelsStayOpen-four">
            SHOW USER
          </button>
        </h2>
        <div id="panelsStayOpen-four" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="accordion-body">
            <table className="table  vh-100 table-striped">
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
        </div>
      </div>    
     
      </div>
        <div className="col-xs-12 col-md-6 col-lg-6 col-xs-6 bg-light text-dark max-height100vh overflow-auto">
            {u_loading && <p>Loading ...</p>}
            {u_data && <div className='border-start border-light  border-start border-light'>
                
            <div class="accordion-item sticky-0">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-five" aria-expanded="false" aria-controls="panelsStayOpen-five">
            Show User Info
          </button>
        </h2>
        <div id="panelsStayOpen-five" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div class="accordion-body">
            <div className="userDashboard__Info bg-light shadow">
                <div className=" shadow">
                 <button onClick={()=>handleUpdate(u_data.user.id)} className="btn btn-success">Update User Info</button>
                 <button onClick={()=>handleDeleteUser(u_data.user.id)} className="btn btn-danger mx-2">Delete</button>
                </div>
 
                 {editUserState && 
                 <div>
                 <div className="row border ">
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
                </div>
          </div>
        </div>
      </div>
             

               

                {u_data.user.orders.map(order=>(
                <div key={order.id} className="bg-paper text-dark p-2 m-1 border border-dark w-100 position-relative">
                    <div className="fw-bold border-bottom border-dark">Ma Don:<span>{order.id}</span></div>
                    <div>KH: {u_data.user.name}</div>
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
                    <div className="fw-bold text-light  bg-dark  ms-auto d-block w-50 text-start"><span>&#128181; </span> Tong Cong:  ${order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)} </div>
                         <div className="text-light bg-primary fw-bold  ms-auto w-50 text-start"><span>&#128181; </span> Da thanh toan : ${order.payying}</div>
                         { order.payying < order.products.reduce((a,b)=>{
                            return a +(b.stock *b.price) 
                         },0)?DebtToString(substract(parseInt(order.products.reduce((a,b)=>{return a+ (b.price*b.stock)},0)),parseInt(order.payying))):CompletePayment()}      
                    <button className="btn border  border-dark d-block ms-auto userDashboard__btnDelete bg-light" onClick={()=>handleDeleteOrder(order.id)}>❌ </button>  
                </div>
                ))}
            </div>}


              
        </div>    
      </div>

    </div>
  )
}

export default UserDashboard