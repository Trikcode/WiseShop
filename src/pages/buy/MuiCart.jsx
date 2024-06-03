import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from 'mdb-react-ui-kit'
import React, { useState, useEffect } from 'react'
import { useCart } from '../../components/state'
import { Button, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
// left icon
import { ArrowBack } from '@mui/icons-material'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '../../supabase'

export default function CartAndPayment() {
  const {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    calculateTotalAmount,
    handleRemoveItemFromCart,
  } = useCart()

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleViewCheckout = () => {
    window.location.href = '/buy/checkout'
  }

  return (
    <section className='h-100 gradient-custom'>
      <MDBContainer className='py-5 h-100'>
        {/* Go back to shopping */}
        <MDBRow className='justify-content-start mt-5'>
          <MDBCol md='12'>
            <Button
              onClick={() => {
                window.location.href = '/buy'
              }}
              variant='outlined'
            >
              <ArrowBack />
              Continue shopping
            </Button>
          </MDBCol>
        </MDBRow>
        {cartItems?.length === 0 ? <p>No items in cart.</p> : null}
        <MDBRow className='justify-content-center my-4'>
          <MDBCol md='8'>
            <MDBCard className='mb-4'>
              <MDBCardHeader className='py-3'>
                <MDBTypography tag='h5' className='mb-0'>
                  Cart - {cartItems?.length} items
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {cartItems?.map((item) => (
                  <MDBRow key={item.id}>
                    <MDBCol lg='3' md='12' className='mb-4 mb-lg-0'>
                      <MDBRipple
                        rippleTag='div'
                        rippleColor='light'
                        className='bg-image rounded hover-zoom hover-overlay'
                      >
                        <img src={item.image} className='w-100' />
                        <a href='#!'>
                          <div
                            className='mask'
                            style={{
                              backgroundColor: 'rgba(251, 251, 251, 0.2)',
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg='3' md='6' className='mb-4 mt-4 mb-lg-0'>
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                    </MDBCol>
                    <MDBCol lg='6' md='6' className='mb-4 mb-lg-0'>
                      <div className='d-flex justify-content-between'>
                        <div
                          className='d-flex flex-column justify-content-center'
                          style={{ maxWidth: '300px' }}
                        >
                          <div className='d-flex align-items-center me-3 mb-4'>
                            <button
                              className='px-3 me-2 btn btn-outline-danger btn-sm'
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <MDBIcon fas icon='minus' />
                            </button>

                            <div className='d-flex align-items-center'>
                              {item.amount}
                            </div>

                            <button
                              className='px-3 ms-2 btn btn-sm btn-primary'
                              onClick={() => handleAddToCart(item)}
                            >
                              <MDBIcon fas icon='plus' />
                            </button>
                          </div>
                          <div>
                            <p className='text-start '>
                              <strong>PRICE: £{item.price}</strong>
                            </p>
                          </div>
                        </div>
                        <div>
                          <Tooltip title='Remove item'>
                            <Button
                              onClick={() => handleRemoveItemFromCart(item.id)}
                              color='error'
                              variant='contained'
                              startIcon={<DeleteIcon />}
                            >
                              Remove
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                ))}

                <hr className='my-4' />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='4'>
            <MDBCard className='mb-4'>
              <MDBCardHeader>
                <MDBTypography tag='h5' className='mb-0'>
                  Summary
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
                      Shipping
                    </div>
                    <div>Free</div>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      <strong>Total amount</strong>
                      {/* <strong>
                        <p className='mb-0'>(including VAT)</p>
                      </strong> */}
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

                <button
                  onClick={() => handleViewCheckout()}
                  className='btn btn-primary btn-block waves-effect waves-light'
                >
                  Go to checkout
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
