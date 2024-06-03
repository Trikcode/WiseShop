import { Box } from '@mui/material'
import React from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import bannerImage from '../../assets/banner.jpg'

function ContactUsPage() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here (e.g., send an email)
    alert('Your message has been sent!')
  }

  return (
    <Box component='main' sx={{ py: 2 }}>
      <div className='banner py-4'>
        <Image src={bannerImage} fluid />
        <div className='banner-text'>
          <h1>Contact Us</h1>
        </div>
      </div>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>Contact Us</h2>
            <p>
              We're here to help! Whether you have questions about selling your
              device, the selling process, or anything else, please don't
              hesitate to contact us.
            </p>
            <p>Here are the ways you can reach us:</p>
            <ul>
              <li>
                Email:{' '}
                <a href='mailto:simplysellyourphone@gmail.com'>
                  simplysellyourphone@gmail.com
                </a>
              </li>
              <li>
                Phone: <a href='tel:+447917498923'>+44 7917 498923</a>{' '}
                (Monday-Friday, 9:00 AM - 5:00 PM)
              </li>
              <li>
                Live Chat: Click the chat icon in the bottom right corner of our
                website during business hours.
              </li>
            </ul>
            <p>You can also find us on social media:</p>
            <ul>
              <li>
                Facebook:{' '}
                <a href='[link to Facebook page]'>[link to Facebook page]</a>
              </li>
              <li>
                Twitter:{' '}
                <a href='[link to Twitter page]'>[link to Twitter page]</a>
              </li>
            </ul>
            <p>We aim to respond to all inquiries within 24 hours.</p>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h3>Send Us a Message</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  required
                />
              </Form.Group>

              <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  required
                />
              </Form.Group>

              <Form.Group controlId='formMessage'>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  placeholder='Enter your message'
                  required
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <p>We appreciate your business!</p>
          </Col>
        </Row>
      </Container>
    </Box>
  )
}

export default ContactUsPage
