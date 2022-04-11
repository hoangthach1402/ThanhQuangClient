import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getProducts } from "../../graphql-client/queries";
import { editProduct } from "../../graphql-client/mutations";
import styles from "./Cart.module.scss";
import FormAddProduct from './FormAddProduct';
import clsx from "clsx";
const ProductManagement = () => {
  const [isAddProduct,setIsAddProduct] = useState(false);
  const { loading, error, data } = useQuery(getProducts);
  const [editProductValue, editProductMutate] = useMutation(editProduct);
  const [productSelected, setProductSelected] = useState(null);
  const [selectedProductId, setselectedProductId] = useState(null);
  const [listProducts, setListProducts] = useState(null);
  const handleChangeProduct = (changes, product) => {};
console.log(isAddProduct);

  const handleChange = (changes) => {
    // console.log(changes)
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

  useEffect(() => {
    data && setListProducts(data.books);
  }, []);

  //  console.log(listProducts)
  let n = 1;
  return (
    <div>
      <h4>Welcome : Product Management Station</h4>
      <div className=" py-5">
        <button onClick={()=>setIsAddProduct(!isAddProduct)} className="btn btn-success">Add product</button>
        {isAddProduct && <FormAddProduct />
        
        }
        <table
          className={clsx(
            "table table-bordered table-hover",
            styles.tableContainer
          )}
        >
          <thead>
            <tr>
              <th scope="col-1">#</th>
              <th scope="col-2">Img</th>
              <th scope="col-2">Name</th>
              <th scope="col-1">Type</th>
              <th scope="col-1">Price</th>
              <th scope="col-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.products.map((product) => (
                <tr
                  className={selectedProductId === product.id && "bg-dark"}
                  key={product.id}
                  onClick={setselectedProductId.bind(this, product.id)}
                >
                  <th value={product.id} scope="row">
                    {n++}
                  </th>

                  <td className="d-flex ">
                    {selectedProductId === product.id && (
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleUpdate(e)}
                      >
                        Update
                      </button>
                    )}

                    <img
                      className={clsx(styles.imgProductManagement)}
                      src={product.img}
                      alt=""
                    />
                    <input
                      type="text"
                      value={
                        productSelected && selectedProductId === product.id
                          ? productSelected.img
                          : product.img
                      }
                      onInput={(e) => handleChange({ img: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={
                        productSelected && selectedProductId === product.id
                          ? productSelected.name
                          : product.name
                      }
                      onInput={(e) => handleChange({ name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="w-120"
                      type="text"
                      value={
                        productSelected && selectedProductId === product.id
                          ? productSelected.type
                          : product.type
                      }
                      onInput={(e) => handleChange({ type: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onInput={(e) => handleChange({ price: e.target.value })}
                      value={
                        productSelected && selectedProductId === product.id
                          ? productSelected.price
                          : product.price
                      }
                    />
                  </td>
                  <td className="col-2 w-25">
                    <input
                      type="number"
                      value={
                        productSelected && selectedProductId === product.id
                          ? productSelected.stock
                          : product.stock
                      }
                      onInput={(e) => handleChange({ stock: e.target.value })}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
