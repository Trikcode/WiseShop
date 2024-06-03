import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from '../../components/CheckoutForm'
import { useCart } from '../../components/state'
import { Box } from '@mui/material'
import './Checkout.css'
import { DNA } from 'react-loader-spinner'

const stripePromise = loadStripe(
  'pk_test_51PNUxKIwYhRoPivFVGDLLdaHWi7o0iTrn1yAZtXgY9e09MVT5w9zQorlDz8joWU0g48dykgo0lkLHzuLtw0A03jx00lIQ0mnRN'
)

export default function CheckOut() {
  const { cartItems } = useCart()

  const [clientSecret, setClientSecret] = useState('')
  const [session, setSession] = useState(null)

  const url = 'http://localhost:5000/create-payment-intent'
  // const url =
  //   'https://stripe-payment-api-vzo8.onrender.com/create-payment-intent'

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Box component='main' sx={{ py: 8 }}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      {!clientSecret && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <DNA
            visible={true}
            height='80'
            width='80'
            ariaLabel='dna-loading'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper'
          />
          <p>Please wait a second...</p>
        </Box>
      )}
    </Box>
  )
}
