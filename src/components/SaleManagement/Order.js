import React, { useContext, useState } from "react";
import clsx from "clsx";
import { ThanhQuangContext } from "../../App";
import styles from "./Cart.module.scss";
import { useMutation } from "@apollo/client";
import {getOrders,getUsers,getUser,getProducts,getProductWithOrders} from '../../graphql-client/queries';
import { createOrder } from "../../graphql-client/mutations";
import moment from 'moment'
const Order = ({ user }) => {
  // console.log(user);
  const [addOrder, { loading, error, data }] = useMutation(createOrder);

  let n = 0;
  let total;
  const { handleOrder, carts, handleNewCarts,handleIsOrderSuccess } = useContext(ThanhQuangContext);

  const [order, setOrder] = useState({
    userId: user.id,
    input: [],
    payying: "",
  });

  total = carts.reduce((a, b) => {
    return a + b.price * b.stock;
  }, 0);
  const handleChange = (changes) => {
    setOrder({ ...order, ...changes });
  };
  async function handleCreateOrder() {
    const newCarts = await carts.map((cart) => ({
      id:cart.id,
      productId: cart.productId,
      name: cart.name,
      img: cart.img,
      price: cart.price,
      stock: cart.stock,
      type: cart.type,
      
    }));
   
    addOrder({
      variables: {
        userId: order.userId,
        input: newCarts,
        payying: parseInt(order.payying),
      },
      refetchQueries: [{query:getUser,variables:{userId:order.userId}},{query:getProducts},
        // {query:getProductWithOrders,variables:{productId:newCarts[0].productId}},
        // {query:getProductWithOrders,variables:{productId:newCarts[1].productId}}
      ]
        
      
    });
    handleNewCarts();
    handleOrder();
    handleIsOrderSuccess()
  }

  return (
    <div className={clsx("bg-light border border-dark text-white p-5 rounded shadow ", styles.containerOrder)}>
      
      <div className={clsx("bg-white text-dark shadow", styles.formOrder)}>
        <div className="pb-2 border-bottom border-dark">
        <button className="btn border bg-success text-light border-dark px-2 mx-2 shadow" onClick={() => handleCreateOrder()}>T???o H??a ????n</button>
      <button className="btn mx-2 px-4 border border-dark btn-danger shadow" onClick={() => handleOrder()}>
        X
      </button>
        </div>
        <h5 className="text-danger">
H??a ????n B??n H??ng</h5>
        <p className="text-dark">C???a H??ng ...................</p>
        <p>{moment().format('L - LT')}</p>
        <p className="">H??? T??n Kh??ch H??ng: <span className="fw-bold">{user.name} </span> </p>
        <p><span className="fw-bold">?????a Ch???:</span> {user.address} </p>
        <p><span className="fw-bold"> Ghi Ch?? :<input type="text" id="" class="form-control" placeholder="Nh???p Ghi Ch?? ..." aria-describedby="" /></span></p>
        <p className="text-decoration-underline">Th??ng Tin ????n H??ng : </p>
        <div className="p-3 border">
        <table className="w-100 table table-striped">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
          </thead>
          <tbody>
          
          {carts.map((product) => (
            <tr className=" ">
              <td>{++n}. </td>
              <td className="">  {product.name}</td>
              <td> {product.type}</td>
              <td className=" ">  {product.price}</td>
              <td>  {product.stock}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        <div className="text-end fw-bold">T???ng C???ng : <span className="text-danger">{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></div>
        <label className="fw-bold px-2" htmlFor="paying">Nh???n C???a Kh??ch: </label>
        <div className="input-group mb-3">
  <span className="input-group-text">Nh???p Ti???n:</span>
  <input type="number" class="form-control"
  value={order.payying}
  placeholder="Vui L??ng Kh??ng ????? Tr???ng"
  onInput={(e) => handleChange({ payying: parseInt(e.target.value) })}
   aria-label="Amount (to the nearest dollar)"/>
  <span className="input-group-text">VND</span>
</div>
       
      </div>
    
    </div>
  );
};

export default Order;
