import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './components/state'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import HomePage from './pages/buy/HomePage'
import CartAndPayment from './pages/buy/MuiCart'
import CheckOut from './pages/buy/CheckOut'
import Success from './pages/buy/Success'
import BuyDrawerAppBar from './components/BuyHeader'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <TawkMessengerReact
        propertyId='65e70fe39131ed19d9753c21'
        widgetId='1ho79c4fb'
      />
      <BrowserRouter>
        <AppProvider>
          <div>
            <Routes>
              {/* buy my phone pages */}
              <Route
                path='/buy'
                element={
                  <>
                    <BuyDrawerAppBar />
                    <HomePage />{' '}
                  </>
                }
              />
              <Route
                path='/buy/cart'
                element={
                  <>
                    {' '}
                    <BuyDrawerAppBar />
                    <CartAndPayment />{' '}
                  </>
                }
              />
              <Route
                path='/buy/checkout'
                element={
                  <>
                    {' '}
                    <BuyDrawerAppBar />
                    <CheckOut />{' '}
                  </>
                }
              />
              <Route
                path='/buy/checkout/success'
                element={
                  <>
                    {' '}
                    <BuyDrawerAppBar />
                    <Success />{' '}
                  </>
                }
              />

              <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App
