import React,{useState} from 'react'
import {useMutation} from '@apollo/client'
import {createProduct} from '../../graphql-client/mutations';
import {getProducts} from '../../graphql-client/queries'
const FormAddProduct = () => {
 const [product,setProduct] = useState({
 name:"",
 type:"",
 img:"",
  price:"",
  stock:"" ,
})
const handleChange =(changes)=>{
  setProduct({ ...product, ...changes})
}
const handleSubmit =()=>{
  addProduct({
    variables:{

      name:product.name,
      stock:parseInt(product.stock),
      type:product.type,
      img:product.img,
      price:parseInt(product.price),
    },
    refetchQueries: [{ query:getProducts}]
  }
  )
}
  
  
  
  
  const [addProduct,productMutate] = useMutation(createProduct)
  
 return (
    <div className="form bg-info text-white p-2">
  <div class="form-group">
    <label for="exampleInputName1">Name Product: </label>
    <input type="text" value={product.name} onInput={(e)=>handleChange({name:e.target.value})} class="form-control" id="exampleInputName1" aria-describedby="NameHelp" placeholder="Enter Name" />
  </div>
  <div class="form-group">
    <label for="exampleInputImg"> Img: </label>
    <input type="text" value={product.img} onInput={e=>handleChange({img:e.target.value})} class="form-control" id="exampleInputImg" aria-describedby="NameHelp" placeholder="Enter Img Url" />
  </div>
  <div class="form-group">
    <label for="type">Type: </label>
    <input type="text" class="form-control" value={product.type} onInput={e=>handleChange({type: e.target.value})} id="type" aria-describedby="NameHelp" placeholder="Enter Type" />
  </div>
  <div class="form-group">
    <label for="stock"> Stock: </label>
    <input type="number" class="form-control" value={product.stock} onInput={e=>handleChange({stock:e.target.value})} id="stock" aria-describedby="NameHelp" placeholder="Enter Stock" />
  </div>
  <div class="form-group">
    <label for="exampleInputPrice">Price Product: </label>
    <input type="number" class="form-control" id="exampleInputPrice" value={product.value} onInput={e=>handleChange({price:e.target.value})} aria-describedby="NameHelp" placeholder="Enter Price" />
  </div>
  <button onClick={()=>handleSubmit()}  class="btn btn-primary">Submit</button>

    </div>
  )
}

export default FormAddProduct