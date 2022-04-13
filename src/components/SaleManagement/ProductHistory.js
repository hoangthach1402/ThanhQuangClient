import React, { useState, useEffect } from "react";
import {
  getProducts,
  getProductWithOrders,
} from "../../graphql-client/queries";
import { useQuery } from "@apollo/client";
const ProductHistory = () => {
  const {
    loading: products_loading,
    error: products_error,
    data: products_data,
  } = useQuery(getProducts);

  const [selectProductId, setSelectProductId] = useState(null);
  const {
    loading: product_loading,
    error: product_error,
    data: product_data,
  } = useQuery(getProductWithOrders, {
    variables: { productId: selectProductId },
  });
  // useEffect(() => {
  //    selectProductId &&
  //    getProductWithOrders({variables:{
  //        productId: selectProductId
  //    }})
  // },[selectProductId])
  return (
    <div className="bg-dark text-light">
      <div className="row">
        <div className="col-xs-12 col-md-6 p-2 border-end border-light p-4">
          {products_data &&
            products_data.products.map((product,index) => (
              <div
                key={product.id}
                onClick={setSelectProductId.bind(this, product.id)}
                className={selectProductId===product.id?'bg-light text-dark':'bg-dark text-white'}
              >
                <p> <span className="fs-5 text-warning">#{++index}</span> <span className=""><ins>Name:</ins></span> <span className="">{product.name}</span></p>
              </div>
            ))}
        </div>
        <div className="col-xs-12 col-md-6 p-2">
          {product_loading && (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          {selectProductId && product_data && (
            <div>
              <div className="border-bottom mb-2">
               <p className=" border-bottom fs-2 text-primary fw-bold">Product In4:</p>
              <p className=""><span className="text-warning">TÊN SP :</span> <span className="mx-2 p-2 border-end">{product_data.product.name} </span>  <span className="text-warning">GÍA :</span> <span className="text-success fw-bold"><span className="fs-3">$</span>{product_data.product.price}</span> </p>
             
              <p> <span className="text-warning">SỐ LƯỢNG</span> <span className="border-end mx-2 px-2">{product_data.product.stock}</span>  <span className="text-warning">  Loại:</span> {product_data.product.type}</p>
            
              </div>
              <p><span className="text-light fw-bold border-bottom my-2 blockquote">Sản Phẩm Được Bán Trong Những Đơn Này: </span></p>
              {product_data.product.orders.map(order=>(
                  <div className="bg-light text-dark m-2 p-2">
                    <p>OrderId :{order.id}</p>  
                    <p>Khach Hang :{order.user.name}</p>
                    <table>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>So Luong</th>
                    </tr>
                    {order.products.map((product,index)=>(
                        <tr>
                        <td>{++index}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td className="text-center">{product.stock}</td>
                        </tr>
                    ))}  
                    </table>
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductHistory;
