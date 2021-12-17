import classNames from 'classnames'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { CountActions } from '../../constants';
import { iCartItem } from '../../interface'
import { removeFromCart, updateCartCount } from '../../redux/cartSlice';
import { AppDispatch } from '../../redux/store';
import styles from './CartItem.module.scss';

function CartItem({id, title, image, price, quantity}: iCartItem) {
  const dispatch: AppDispatch = useDispatch();
  function removeFromCartFun (id: number) {
    if (id) {
      dispatch(removeFromCart(id))
    }
  }

  function updateCountFun(id:number, type:string) {
    console.log({id, type})
    dispatch(updateCartCount({id, type}))
  }

  return (
    <tr>
      <th>
        <div className="py-3 d-flex align-items-center">
          <div className={classNames(styles.CartImg, 'shadow-sm')}>
            <img src={image} alt={title} className={'rounded'} />
          </div>
          <div className="ms-3 d-inline-block align-middle">
            <p className="mb-0"> {title} </p>
          </div>
        </div>
      </th>
      <td className="align-middle text-center">
        <strong>${price}</strong>
      </td>
      <td className="align-middle text-center">
        <div className="d-flex align-items-center justify-content-center">
          <Button color="light" size="sm" onClick={() => updateCountFun(id, CountActions.SUBTRACT)}>
            <strong>-</strong>
          </Button>
          <strong className="px-2">{quantity}</strong>
          <Button color="light" size="sm" onClick={() => updateCountFun(id, CountActions.ADD)}>
            <strong>+</strong>
          </Button>
        </div>
      </td>
      <td className="align-middle text-center">
        <Button
          onClick={() => removeFromCartFun(id)}
          close
        />
      </td>
    </tr> 
  )
}

export default CartItem
