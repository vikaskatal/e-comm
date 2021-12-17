import React, { Fragment, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames'
import { Button, Row, Col } from "reactstrap";
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import styles from './CartPage.module.scss';
import { MyRoutes } from '../../constants';
import { ICardSlice } from '../../interface';
import { AppDispatch } from '../../redux/store';
import { clearCart } from "../../redux/cartSlice";
import useAuth from '../../hooks/useAuth';
import CartItem from '../../components/CartItem/CartItem';

const discountPercent = 10;
const shippingCharges = 5;

function CartPage() {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const cartItems = useSelector((state: ICardSlice) => {
    return state.cart.items
  });

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, curr) => {
      return acc + (curr.price * (curr.quantity ? curr.quantity : 1))
    }, 0)
  }, [cartItems]);

  const finalAmount = useMemo(() => {
    let val =  totalAmount - ( totalAmount*discountPercent/100 )
    if(shippingCharges) {
      val = val + shippingCharges
    }
    return val;
  }, [totalAmount]);

  function proceedToCheckout () {
    if(isAuthenticated) {
      navigate(MyRoutes.CHECKOUT)
      dispatch(clearCart())
    } else {
      localStorage.setItem('loginFromRoute', MyRoutes.CART);
      navigate(MyRoutes.LOGIN)
    }
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <DefaultTemplate>
        <div>
            <div className={classNames(styles.TopBar, "d-flex align-items-center justify-content-between")}>
              <div>
                <Link to={MyRoutes.HOME}> Home </Link> / Cart
              </div>
            </div>
        </div>

        {cartItems.length > 0 ? (
          <Row>
            <Col lg="8">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="bg-light text-uppercase">
                        <div className="p-3">Product</div>
                      </th>
                      <th scope="col" className="bg-light text-uppercase text-center">
                        <div className="p-3">Price</div>
                      </th>
                      <th scope="col" className="bg-light">
                        <div className="p-3 text-uppercase text-center">Quantity</div>
                      </th>
                      <th scope="col" className="bg-light">
                        <div className="p-3 text-uppercase text-center">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {cartItems.map(({ id, image, title, price, quantity }) => (
                      <Fragment key={id}>
                        <CartItem id={id} image={image} title={title} price={price} quantity={quantity} />
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div> 
            </Col>

            <Col lg="4">
              <p className="bg-light px-4 py-3 text-uppercase mb-0 mt-4 mt-lg-0"><strong>Order summary</strong></p>
              
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Order Subtotal </span>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </li>
                <li className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Discount</span>
                  <strong>{discountPercent}%</strong>
                </li>
                <li className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Shipping and handling</span>
                  <strong>${shippingCharges}</strong>
                </li>
                <li className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">Total</span>
                  <strong>${finalAmount.toFixed(2)}</strong>
                </li>
              </ul>
              <div className="d-flex justify-content-end">
                <Button color="primary" onClick={proceedToCheckout}>Proceed to checkout</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="p-5 bg-light">Empty Cart</div>
        )}

      </DefaultTemplate>  
    </>
  )
}

export default CartPage
