import React from 'react'
import styles from'../Styles/Creatprod.css'
import Products from './Products'
const Creatprod = () => {

  return (<>
  
    <div className='container'>
    <h1>Add product</h1>
        <p>Product name: <input className='inputfield'type='text'></input></p>
        <p>Price : <input className='inputfield'type='number'></input></p>
        <p>Available quantity: <input className='inputfield' type='number'></input></p>
        <p>Product picture: <input className='inputpic' type='file'></input></p>
        <button className='button'>ADD</button>
      </div>
      {/* <Products></Products> */}
      </>
  )
}

export default Creatprod