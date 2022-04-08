import React,{useContext} from 'react'
import clsx from 'clsx';
import {ThanhQuangContext} from '../../App'
import styles from './Cart.module.scss';
const Order = () => {
    const {handleOrder} = useContext(ThanhQuangContext)
  return (
    <div className={clsx('bg-dark text-white p-5',styles.containerOrder)}>Order customer
    <div className={clsx('bg-white text-dark text-center',styles.formOrder)}>
    <h4>Hoa don ban hang</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, provident.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, pariatur.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, pariatur.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, pariatur.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, pariatur.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, pariatur.</p>
    </div>
    <button className="btn btn-danger" onClick={()=>handleOrder()}>X</button>
    </div>
  )
}

export default Order