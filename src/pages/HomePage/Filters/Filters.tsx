import React from "react";
// import PropTypes from "prop-types";
// import { FilterContainer, Title } from "./Filter.styles";
// import { CheckBoxWithLabel } from "../../../styled-components/FormElements";
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

// Filter.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onChangeCategories: PropTypes.func.isRequired,
// };

Filters.defaultProps = {};

export default Filters;
