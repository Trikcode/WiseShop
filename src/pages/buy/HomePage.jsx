import React, { useState } from 'react'
import { Box, Button, Badge, Drawer, Grid, LinearProgress } from '@mui/material'
import Item from '../../components/Item'
import { AddShoppingCart } from '@mui/icons-material'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../components/state'

import { shoes } from '../../assets/shoeData'

export default function HomePage() {
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getTotalItems = (items) =>
    items?.reduce((acc, item) => acc + item.amount, 0)

  const handleViewCart = () => {
    window.location.href = '/buy/cart'
  }

  return (
    <Box component='main' sx={{ py: 8, pl: 3 }}>
      <Button
        onClick={() => handleViewCart()}
        sx={{
          position: 'fixed',
          top: '70px',
          right: '10px',
          zIndex: 100,
        }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </Button>
      <Grid
        container
        spacing={3}
        sx={{
          py: 3,
        }}
      >
        {shoes?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
