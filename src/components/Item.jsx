import React from 'react'
import './Item.css'

const Item = ({ item, handleAddToCart }) => {
  return (
    <div className='product-card row'>
      <div className='col-md-6'>
        <div className='d-flex justify-content-center align-items-center'>
          <img src={item.image} alt={item.name} />
        </div>
      </div>
      <div className='col-md-6'>
        <p>Shoe</p>
        <h1>{item.name}</h1>
        <h2
          style={{
            fontFamily: 'Poppins',
          }}
        >
          ${item.price}
        </h2>

        <div className='addToCartBtn d-flex justify-content-center align-items-center'>
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
