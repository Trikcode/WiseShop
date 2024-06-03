import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import bannerImage from '../../assets/banner.jpg'
import { Box } from '@mui/material'

function AboutUsPage() {
  return (
    <Box component='main' sx={{ py: 2 }}>
      <div className='banner py-4'>
        <Image src={bannerImage} fluid />
        <div className='banner-text'>
          <h1>About Us</h1>
        </div>
      </div>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>About WiseShop</h2>
            <p>
              WiseShop is a fast and convenient way to sell your unwanted Apple
              devices for cash. We offer competitive prices and a hassle-free
              selling process, making it easy to get rid of your old devices and
              get some money back.
            </p>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h3>What We Do</h3>
            <p>We buy a wide range of Apple devices, including:</p>
            <ul>
              <li>iPhones</li>
              <li>iPads</li>
              <li>MacBooks</li>
              <li>Apple Watches</li>
              <li>AirPods</li>
            </ul>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h3>How It Works</h3>
            <p>
              <strong>Get a quote:</strong> Visit our website and enter the
              details of your device, including the model, condition, and
              storage capacity. We will then provide you with an instant quote.
            </p>
            <p>
              <strong>Send your device:</strong> If you accept our quote, you
              can simply package up your device and send it to us using our
              freepost label.
            </p>
            <p>
              <strong>Get paid:</strong> Once we receive your device and verify
              its condition, we will send you your payment via bank transfer or
              PayPal.
            </p>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h3>Why Choose Us</h3>
            <ul>
              <li>
                <strong>Competitive prices:</strong> We offer some of the best
                prices for unwanted Apple devices in the UK.
              </li>
              <li>
                <strong>Fast and easy:</strong> Our selling process is quick and
                simple, and you can get a quote and sell your device in minutes.
              </li>
              <li>
                <strong>Safe and secure:</strong> We use a secure online
                platform and guarantee the safety of your device throughout the
                selling process.
              </li>
              <li>
                <strong>Free shipping:</strong> We offer free shipping on all
                devices sold through our website.
              </li>
              <li>
                <strong>Environmentally friendly:</strong> By selling your
                unwanted devices, you are helping to reduce electronic waste and
                protect the environment.
              </li>
            </ul>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <p>
              We are committed to providing our customers with a quick, easy,
              and reliable way to sell their unwanted Apple devices. If you have
              any questions, please don't hesitate to{' '}
              <a href='mailto:info@simplysellphone.com'>contact us</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </Box>
  )
}

export default AboutUsPage
