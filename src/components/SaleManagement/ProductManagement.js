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
      <h4>Welcome : Product Management Station</h4>
      <div className="bg-dark text-white py-5">
        <button
          onClick={() => setIsAddProduct(!isAddProduct)}
          className="btn bg-dark text-white border border-white my-2"
        >
          Add product
        </button>
        {isAddProduct && <FormAddProduct handleIsAdd={handleIsAdd} />}
        <div className="row">
          <div className="col-6">
            <table className={clsx(" ", styles.tableContainer)}>
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
                        "bg-light text-black"
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
                        {product.name}
                      </td>
                      <td>
                        {product.type}
                      </td>
                      <td>
                        {product.price}
                      </td>
                      <td className="col-2 w-25">
                        {product.stock}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-6 border">
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
