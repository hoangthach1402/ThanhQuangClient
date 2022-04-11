import React, { useContext, useState } from "react";
import clsx from "clsx";
import { ThanhQuangContext } from "../../App";
import styles from "./Cart.module.scss";
import { useMutation } from "@apollo/client";
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
    });
  }

  return (
    <div className={clsx("bg-dark text-white p-5", styles.containerOrder)}>
      Order customer
      <div className={clsx("bg-white text-dark text-center", styles.formOrder)}>
        <h4>Hoa don ban hang</h4>
        <p>Ten khach hang : {user.name}.</p>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
          {carts.map((product) => (
            <tr>
              <td>{++n} </td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </table>
        <h4 className="text-right mt-5">Tong cong: {total}</h4>
        <label htmlFor="paying">Nhan cua khach</label>
        <input
          type="number"
          value={order.payying}
          onInput={(e) => handleChange({ payying: parseInt(e.target.value) })}
        />
      </div>
      <button onClick={() => handleCreateOrder()}>Tao hoa don</button>
      <button className="btn btn-danger" onClick={() => handleOrder()}>
        X
      </button>
    </div>
  );
};

export default Order;
