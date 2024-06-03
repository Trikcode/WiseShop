import React from 'react'
import TickIcon from '../../components/TickIcon'

function Success() {
  setTimeout(() => {
    window.location.href = '/buy'
  }, 8000)

  // remove cartitems from local storage
  localStorage.removeItem('cartItems')

  return (
    <div
      style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '50px' }}
    >
      <div>
        <TickIcon />
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h3>Payment was successful</h3>
          <p>
            We have received your payment. Your order will be processed and
            shipped soon.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Success
