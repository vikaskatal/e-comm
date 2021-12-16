import React from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import styles from './CartPage.module.scss';
import { MyRoutes } from '../../constants';

function CartPage() {
  return (
    <DefaultTemplate>
      <div>
          <div className={classNames(styles.TopBar, "d-flex align-items-center justify-content-between")}>
            <div>
              <Link to={MyRoutes.HOME}> Home </Link> / Cart
            </div>
          </div>
      </div>
    </DefaultTemplate>
  )
}

export default CartPage
