import React, { useState, useContext, useEffect } from "react";
import UserManagement from "./UserManagement";
import { getUsers, getProducts } from "../../graphql-client/queries";
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "@apollo/client";
import Cart from "./Cart";
import clsx from "clsx";
import styles from "./Cart.module.scss";
import Order from "./Order";
import { ThanhQuangContext } from "../../App";
const SaleManagement = ({data_productsApp}) => {
  const { isOrder } = useContext(ThanhQuangContext);
  const [isClose,setIsClose]= useState(false)
  const [selectedUserId, setSelectedUserId] = useState();
  const { addToCart, carts } = useContext(ThanhQuangContext);
  const [selectedUser, setSelectedUser] = useState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
  setIsClose(false)
  },[isOrder])
  const {
    loading: loading_products,
    error: error_products,
    data: data_products,
  } = useQuery(getProducts);
  const {
    loading: loading_users,
    error: error_users,
    data: data_users,
  } = useQuery(getUsers);

  const [isCreateCustomer, setIsCreateCustomer] = useState(false);
  useEffect(() => {
    if (data_users && selectedUserId != null) {
      let user = data_users.users.find((user) => user.id === selectedUserId);
      setSelectedUser(user);
    }
  }, [selectedUserId]);
  const showCart = () => {
    return (
      <>
        <span>&#128584;</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </>
    );
  };
  const handleIsCreate = () => {
    setIsCreateCustomer(!isCreateCustomer);
  };
  const CloseCart = () => {
    return (
      <>
        <span>&#128585;</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </>
    );
  };
  // console.log(isClose)
  return (
    <div className="container  text-white ">
       <h4 className="text-dark text-center border-bottom border-dark ">SALE</h4> 
      {isOrder && selectedUser && <Order user={selectedUser} />}
    
      <div className={clsx('alert alert-warning alert-dismissible fade  btnAlert',isOrder && !selectedUser&&!isClose?'show':'d-none')} role="alert">
    <strong>Vui Long Chon Khach Hang</strong> 
    <button  onClick={()=>setIsClose(true)} class="btn-close" >X</button>
    </div>
      
      {/* Cart-button */}
      <div>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className={clsx(
            "btn border border-light saleManagement__cart--btn text-light btnAoMaFloridaParent ",
            styles.buttonCart
          )}
        >
          {isCartOpen ? CloseCart() : showCart()}
          <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
            {carts.length}
            <span class="visually-hidden"></span>
          </span>
        </button>
        <button className="btn btnAoMaFloridaChild ">
          Check
          {isCartOpen && <Cart />}
        </button>
      </div>
      
      {/* taoKH vs Chon Khach Option */}
      <div className="row saleManagement__option--position">
      <button
        onClick={() => setIsCreateCustomer(!isCreateCustomer)}
        className="btn saleManagement__option--btn mx-2 border border-dark d-block col-5"
      >
        Tạo Khách Hàng Mới
      </button>
      <select className="btn d-block col-5 saleManagement__option--btn border border-dark" name="" id="" onChange={(e) => setSelectedUserId(e.target.value)}>

        <option value="">Chọn Khách </option>
        {data_users &&
          data_users.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      </div>
      {isCreateCustomer && <UserManagement handleIsCreate={handleIsCreate} />}
      
      
      {/* show Product List */}
      <div className="p-2 mt-2 cardList">
        {data_productsApp &&
          data_productsApp.products.map((product,index) => (
            <div
              key={index}
              className="cardItem p-2 border text-black"
            >
              <div className="imgContainer">
                <img
                  className="card-img"
                  src={product.img}
                  alt="Card image cap"
                />
              </div>
              <div className="cardContent">
                <div className="cardContent__Top">
                  {/* {product.name} */}
                  <p>
                    Tên Sản Phẩm:{" "}
                    <span className="fw-bold">{product.name}</span>
                  </p>
                  <p>
                    Gía :{" "}
                    <span className="fw-bold text-danger">
                      ${product.price}
                    </span>
                  </p>
                  <p>
                    Loại : <span className="fw-bold">{product.type}</span>
                  </p>
                  <p>
                    Hàng Còn : <span className="fw-bold ">{product.stock}</span>
                  </p>
                </div>
                <div className="cardContent__Bottom">
                  <button
                    className="btn border border-dark"
                    onClick={() => addToCart({id:uuidv4(),productId:product.id,name:product.name,img:product.img,price:parseFloat(product.price),type:product.type,stock:parseInt(1)})}
                  >
                    Them Vao Gio Hang
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SaleManagement;
