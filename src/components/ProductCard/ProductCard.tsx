import React from "react";
import classNames from "classnames";
import { truncate } from "lodash";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { IProducts } from "../../interface";
import styles from "./ProductCard.module.scss";
import { addToCart } from "../../redux/cartSlice";
import { AppDispatch } from "../../redux/store";

const ProductCard = ({ id, image, title, description, price, category }: IProducts) => {
  const dispatch: AppDispatch = useDispatch()

  function addToCartFun () {
    dispatch(addToCart({
      id,
      image,
      title,
      price
    }))
  }
  return (
    <div className={styles.Card}>
      <div className={styles.ImageContainer}>
        <img src={image} alt={title} />
      </div>

      <div className="p-2">
        <div>
          <p className={classNames(styles.Title, 'm-0')}>{title}</p>
          <p className={classNames(styles.Description, 'mt-1 mb-0')}>
            {truncate(description, {
              length: 100
            })}
          </p>
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
            <p className={styles.Price}>Price: {price}</p>
            <div className={styles.Category}>{category}</div>
          </div>
          <Button color="primary" size="sm" onClick={() => addToCartFun()}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;