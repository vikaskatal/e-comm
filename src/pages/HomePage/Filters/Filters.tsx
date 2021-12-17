import React from "react";
import styles from './Filters.module.scss';

interface IProps {
  categories: string[],
  onChangeCategories: any,
}

const Filters = ({ categories, onChangeCategories }: IProps) => {
  return (
    <div className={styles.FilterContainer}>
      <div className={styles.Title}>Categories</div>
      {categories.map((ele) => (
        <label className="d-flex check-box-with-label" key={ele.replace(/\s/g, "")}>
          <input
            type="checkbox"
            value={ele}
            defaultChecked={false}
            onChange={onChangeCategories}
          />
          <span>{ele}</span>
        </label>
      ))}
    </div>
  );
};

Filters.defaultProps = {};

export default Filters;
