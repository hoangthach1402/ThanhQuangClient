import React from 'react'
import styles from './Cart.module.scss';
import clsx from 'clsx'
const FormAddProduct = () => {
  return (
    <div className="bg-dark text-white">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default FormAddProduct