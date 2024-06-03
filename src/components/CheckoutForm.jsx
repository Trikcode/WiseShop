import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../components/state'
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CheckoutForm() {
  const { cartItems, calculateTotalAmount } = useCart()

  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          toast('Your payment was successful', {
            type: 'success',
            theme: 'light',
          })
          break
        case 'processing':
          toast('Your payment is processing.', {
            type: 'success',
            theme: 'light',
          })
          break
        case 'requires_payment_method':
          toast('Your payment was not successful, please try again.', {
            type: 'success',
            theme: 'light',
          })
          break
        default:
          toast('Something went wrong.', {
            type: 'success',
            theme: 'light',
          })
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:5173/buy/checkout/success',
      },
    })
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)

    // remove cart items from local storage
    localStorage.removeItem('cartItems')
  }

  const paymentElementOptions = {
    layout: 'tabs',
  }

  return (
    <>
      <div className='row pt-4 px-2'>
        <div className='col-md-6'>
          <MDBCard className='mb-4'>
            <MDBCardHeader>
              <MDBTypography tag='h5' className='mb-0'>
                Checkout
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Sub Total
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    £{calculateTotalAmount(cartItems)}
                  </span>
                </MDBListGroupItem>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center px-2'>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Number of items
                  </div>
                  <div>
                    {cartItems?.reduce((acc, item) => acc + item.amount, 0)}
                  </div>
                </MDBListGroupItem>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    <strong>Total amount</strong>
                  </div>
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    <strong>£{calculateTotalAmount(cartItems)}</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </div>

        <div className='col-md-6'>
          <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='payment_form'
          >
            <PaymentElement
              id='payment-element'
              options={paymentElementOptions}
            />
            <button
              className='pay_button'
              disabled={isLoading || !stripe || !elements}
              id='submit'
            >
              <span id='button-text'>
                {isLoading ? (
                  <div className='spinner' id='spinner'></div>
                ) : (
                  'Pay now'
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id='payment-message'>{message}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
