// state.js

import { createContext, useContext, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AppStateContext = createContext({})
export const CartContext = createContext()

export function AppProvider({ children }) {
  const value = useState({})
  const [cartItems, setCartItems] = useLocalStorageState('cartItems', [])

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev = []) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
    toast('Item added to cart', {
      type: 'success',
      theme: 'light',
    })
  }

  const handleRemoveFromCart = (id) => {
    setCartItems((prev = []) => {
      return prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc
          return [...acc, { ...item, amount: item.amount - 1 }]
        } else {
          return [...acc, item]
        }
      }, [])
    })
  }

  // remove item from cart no matter the amount
  const handleRemoveItemFromCart = (id) => {
    setCartItems((prev = []) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  const calculateTotalAmount = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2)
  }

  return (
    <AppStateContext.Provider value={value}>
      <CartContext.Provider
        value={{
          cartItems,
          handleAddToCart,
          handleRemoveFromCart,
          calculateTotalAmount,
          handleRemoveItemFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppProvider')
  }
  return context
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within the AppProvider')
  }
  return context
}
