import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { TrendingFlat } from '@mui/icons-material'
import supabase from '../supabase'

const drawerWidth = 240

export default function BuyDrawerAppBar(props) {
  const navigate = useNavigate()

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        WiseShop
      </Typography>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            navigate('/buy')
          }}
        >
          <ListItemText primary='Home' />
        </ListItem>
        {/* <ListItem
          button
          onClick={() => {
            navigate('/buy/login')
          }}
        >
          <ListItemText primary='Login' />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate('/buy/signup')
          }}
        >
          <ListItemText primary='Sign Up' />
        </ListItem> */}
        {!session && (
          <ListItem
            button
            onClick={() => {
              navigate('/buy/authenticate')
            }}
          >
            <ListItemText primary='Login' />
          </ListItem>
        )}
        {session && (
          <ListItem
            button
            onClick={() => {
              supabase.auth.signOut()
              navigate('/buy')
            }}
          >
            <ListItemText primary='Logout' />
          </ListItem>
        )}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component='nav'
        style={{
          backgroundColor: '#0056B3',
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, cursor: 'pointer' }}
          >
            WiseShop
          </Typography>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/buy')
            }}
          >
            WiseShop
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              sx={{ color: '#fff' }}
              onClick={() => {
                navigate('/buy')
              }}
            >
              Home
            </Button>
            {!session && (
              <Button
                sx={{ color: '#fff' }}
                onClick={() => {
                  navigate('/buy/authenticate')
                }}
              >
                Login
              </Button>
            )}
            {session && (
              <Button
                sx={{ color: '#fff' }}
                onClick={() => {
                  supabase.auth.signOut()
                  navigate('/buy')
                }}
              >
                Logout
              </Button>
            )}
          </Box>

          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <TrendingFlat />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
