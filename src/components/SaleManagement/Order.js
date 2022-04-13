import React, { useContext, useState } from "react";
import clsx from "clsx";
import { ThanhQuangContext } from "../../App";
import styles from "./Cart.module.scss";
import { useMutation } from "@apollo/client";
import {getOrders,getUsers,getUser} from '../../graphql-client/queries';
import { createOrder } from "../../graphql-client/mutations";
const Order = ({ user }) => {
  // console.log(user);
  const [addOrder, { loading, error, data }] = useMutation(createOrder);

  let n = 0;
  let total;
  const { handleOrder, carts, handleNewCarts } = useContext(ThanhQuangContext);

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
      name: cart.name,
      img: cart.img,
      price: cart.price,
      stock: cart.stock,
      type: cart.type,
      
    }));
    console.log(newCarts);
    addOrder({
      variables: {
        userId: order.userId,
        input: newCarts,
        payying: parseInt(order.payying),
      },
      refetchQueries: [{ query:getOrders},{query:getUsers},{query:getUser,variables:{userId:order.userId}}]
    });
    handleNewCarts();
    handleOrder();
  }

  return (
    <div className={clsx("bg-light border border-dark text-white p-5 rounded shadow ", styles.containerOrder)}>
     
      <div className={clsx("bg-white text-dark shadow", styles.formOrder)}>
        <div className="pb-2 border-bottom border-dark">
        <button className="btn border bg-success text-light border-dark px-2 mx-2 shadow" onClick={() => handleCreateOrder()}>Tạo Hóa Đơn</button>
      <button className="btn mx-2 px-4 border border-dark btn-danger shadow" onClick={() => handleOrder()}>
        X
      </button>
        </div>
        <h5 className="text-danger">
Hóa Đơn Bán Hàng</h5>
        <p className="text-dark">Cửa Hàng ...................</p>
        <p>Ngay.....Thang...... Nam .........</p>
        <p className="">Họ Tên Khách Hàng: <span className="fw-bold">{user.name}.</span> </p>
        <p>Ghi Chu: ...................................................................</p>
        <p>Thông Tin Đơn Hàng : </p>
        <div className="p-3 border">
        <table >
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
          {carts.map((product) => (
            <tr className="border border-dark">
              <td>{++n}. </td>
              <td className="border border-dark">  {product.name}</td>
              <td> {product.type}</td>
              <td className="border border-dark">  {product.price}</td>
              <td>  {product.stock}</td>
            </tr>
          ))}
        </table>
        </div>
        <p className="text-right fw-bold">Tổng Cộng : ${total}</p>
        <label className="fw-bold px-2" htmlFor="paying">Nhận Của Khách</label>
        <input
          type="number"
          value={order.payying}
          placeholder="vd:  520.000.00"
          onInput={(e) => handleChange({ payying: parseInt(e.target.value) })}
        />
      </div>
    
    </div>
  );
};

export default Order;
