import classNames from "classnames";
import { truncate } from "lodash";
import React from "react";
import { Button } from "reactstrap";
import { IProducts } from "../../interface";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ id, image, title, description, price, category }: IProducts) => {
  function addToCart (id:number) {
    console.log(id)
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
          <Button color="primary" size="sm" onClick={() => addToCart(id)}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;