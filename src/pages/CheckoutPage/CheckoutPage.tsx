import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { Container } from 'reactstrap'
import { MyRoutes } from '../../constants';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'

function CheckoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(MyRoutes.HOME)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <DefaultTemplate>
        <Container className="p-5 bg-light">
          <h2>Order Placed</h2>
          <p>Thank you for shopping with us</p>
        </Container>
      </DefaultTemplate>  
    </>
  )
}

export default CheckoutPage
