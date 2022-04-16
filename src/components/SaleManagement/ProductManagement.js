import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getProducts } from "../../graphql-client/queries";
import { editProduct, deleteProduct } from "../../graphql-client/mutations";
import styles from "./Cart.module.scss";
import FormAddProduct from "./FormAddProduct";
import clsx from "clsx";
const ProductManagement = () => {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const { loading, error, data } = useQuery(getProducts);
  const [editProductValue, editProductMutate] = useMutation(editProduct);
  const [productSelected, setProductSelected] = useState(null);
  const [selectedProductId, setselectedProductId] = useState(null);
  const [listProducts, setListProducts] = useState(null);
  const [productDeleteId, productDeleteMutate] = useMutation(deleteProduct);

  const handleChange = (changes) => {
    setProductSelected({ ...productSelected, ...changes });
  };

  const handleUpdate = () => {
    console.log(productSelected);
    editProductValue({
      variables: {
        editProductId: productSelected.id,
        name: productSelected.name,
        stock: parseInt(productSelected.stock),
        type: productSelected.type,
        img: productSelected.img,
        price: parseInt(productSelected.price),
      },
      refetchQueries: [{ query: getProducts }],
    });
  };

  useEffect(() => {
    if (data) {
      setProductSelected(
        data.products.find((product) => product.id === selectedProductId)
      );
    }
  }, [selectedProductId]);
  const handleIsAdd = () => {
    setIsAddProduct(!isAddProduct);
  };
  useEffect(() => {
    data && setListProducts(data.books);
  }, []);
  const handleDelete = (id) => {
    productDeleteId({
      variables: {
        deleteProductId: id,
      },
      refetchQueries: [{ query: getProducts }],
    });
  };
  let n = 1;
  return (
    <div>
      <h4 className='text-dark text-center border-bottom border-dark'>Products</h4>
      <div className="bg-light text-dark ">
        <button
          onClick={() => setIsAddProduct(!isAddProduct)}
          className="btn bg-dark text-light border border-white my-2"
        >
          Add product
        </button>
        {isAddProduct && <FormAddProduct handleIsAdd={handleIsAdd} />}
        <div className="row">
        <div className="accordion-item max-height-100 overflow-auto col-xs-12 col-md-6">
        <h2 className="accordion-header sticky-0" id="panelsStayOpen-headingTwo">
          <button className="accordion-button collapsed accordion__btn" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-6" aria-expanded="true" aria-controls="panelsStayOpen-6">
            List Product
          </button>
        </h2>
        <div id="panelsStayOpen-6" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="accordion-body">
            <div className="">
              <table className={clsx("table  table-striped", styles.tableContainer)}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Img</th>
                    <th>Tên</th>
                    <th>Loại</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.products.map((product) => (
                      <tr
                        className={
                          selectedProductId === product.id &&
                          "table-active"
                        }
                        key={product.id}
                        onClick={setselectedProductId.bind(this, product.id)}
                      >
                        <th value={product.id} scope="row">
                          {n++}
                        </th>
  
                        <td className="d-flex ">
                          <img
                            className={clsx(styles.imgProductManagement)}
                            src={product.img}
                            alt=""
                          />
                        </td>
                        <td>
                          {product.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                        </td>
                        <td>
                          {product.type}
                        </td>
                        <td className="text-center">
                          {product.price}
                        </td>
                        <td className="col-2 w-25 text-center">
                          {product.stock}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          
          </div>
        </div>
      </div>
          <div className="col-xs-12 border col-md-6 col-lg-6 col-xl-6 ">
            {!productSelected && <p>Please Select you want to Edit ^^</p>}
            {productSelected && (
              <div>
                <h3>Form Update</h3>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Img URL
                  </span>
                  <input
                    type="text"
                    value={productSelected.img}
                    onInput={(e) => handleChange({ img: e.target.value })}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Name
                  </span>
                  <input
                    type="text"
                    value={productSelected.name}
                    onInput={(e) => handleChange({ name: e.target.value })}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Loai
                  </span>
                  <input
                    type="text"
                    value={productSelected.type}
                    onInput={(e) => handleChange({ type: e.target.value })}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Price
                  </span>
                  <input
                    type="text"
                    value={productSelected.price}
                    onInput={(e) => handleChange({ price: e.target.value })}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Stock
                  </span>
                  <input
                    type="text"
                    value={productSelected.stock}
                    onInput={(e) => handleChange({ stock: e.target.value })}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(productSelected.id)}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
