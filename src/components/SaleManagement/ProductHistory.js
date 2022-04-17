import React, { useState, useEffect } from "react";
import moment from 'moment';
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
    data: product_data,refetch:product_refetch
  } = useQuery(getProductWithOrders, {
    variables: { productId: selectProductId },
  });
  useEffect(() => {
  if(setSelectProductId){
  product_refetch({variables:{productId:selectProductId}})
  }
  },[selectProductId])
   
  // refetch({  variables: {
  //   userId:selectedUserId
  //  }})  
   
  return (
    <div className="">
        <h4 className="text-center text-dark border-bottom border-dark">History</h4>
      <div className="row">
              
      <div className="accordion-item overflow-auto max-height100vh col-xs-12 col-md-6 p-2 border-end ">
        <h2 className="accordion-header sticky-0" id="panelsStayOpen-headingTwo">
          <button className="accordion-button collapsed accordion__btn" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-six" aria-expanded="true" aria-controls="panelsStayOpen-six">
            List Product By Order
          </button>
        </h2>
        <div id="panelsStayOpen-six" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="">
            <table className="table table-striped">
              <thead>
              
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>SO LUONG</th>
              </tr>
              </thead>
        <tbody>
        
        {products_data &&
          products_data.products.map((product,index) => (
            <tr className={selectProductId==product.id &&'table-active'} key={product.id} onClick={setSelectProductId.bind(this,product.id)}>
            <td>{++index}</td>          
            <td>{product.name}</td>          
            <td>{product.type}</td>          
            <td className="text-center">{product.price}</td>          
            <td className="text-center">{product.stock}</td>          
            </tr>
          ))
      }
        </tbody>
            </table>
            </div>
        </div>
      </div>
        <div className="col-xs-12 col-md-6 p-2">
          {product_loading && (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          {selectProductId && product_data && (
            <div className="vh-100 overflow-auto">
            
             {/*  */}
             <div className="accordion-item">
        <h2 className="accordion-header sticky-0" id="panelsStayOpen-headingTwo">
          <button className="accordion-button collapsed accordion__btn" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-five" aria-expanded="false" aria-controls="panelsStayOpen-five">
            Product Infomation
          </button>
        </h2>
        <div id="panelsStayOpen-five" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="accordion-body">
            <div className="border-bottom bg-light shadow productHistoryInfo">
              <p className=" border-bottom  text-dark fw-bold">Product Infomation</p>
             <p className=""><span className="text-dark fw-bold">TÊN SP :</span> <span className="mx-2 p-2 border-end">{product_data.product.name} </span>  <span className="text-dark fw-bold">GÍA :</span> <span className=""><span className="fs-4"></span>{product_data.product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span> </p>
             <p> <span className="text-dark fw-bold">SỐ LƯỢNG</span> <span className="border-end mx-2 px-2">{product_data.product.stock}</span>  <span className="text-dark fw-bold">  Loại:</span> {product_data.product.type}</p>
             </div>
          </div>
        </div>
      </div>
              <p><span className="text-dark text-center fw-bold border-bottom border-dark my-2 ">Sản Phẩm Được Bán Trong Những Đơn Này: </span></p>
              {product_data.product.orders.map(order=>(
                  <div key={order.id} className="bg-light text-dark m-2 p-2 shadow border border-top border-dark">
                    <div className="border-bottom border-dark"> <span className="fw-bold">OrderId :</span> {order.id}</div> <div> <span className="fw-bold">Ngày Tạo:</span>  {moment(order.createdAt).format('DD-MM-YYYY :LT')}</div>  
                    <div className=""> <span className="fw-bold">Khach Hang :</span><span className="text-decoration-underline">{order.user.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</span> </div>
                    <table className="table ">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>So Luong</th>
                    
                    </tr>
                    </thead>
                      <tbody>
                    {order.products.map((product,index)=>(
                        <tr key={product.id}>
                        <td>{++index}</td>
                        <td>{product.name}</td>
                        <td>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                        <td className="text-center">{product.stock}</td>
                        {/* <td>{ parseInt(product.price)}</td> */}
                        </tr>
                    ))}
                      </tbody>
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
            
           
             
                      
