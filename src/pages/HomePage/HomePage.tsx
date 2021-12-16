import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { debounce } from 'lodash-es';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "./Filters/Filters";
import styles from './HomePage.module.scss';
import { IProducts } from "../../interface";
import DefaultTemplate from "../../templates/DefaultTemplate/DefaultTemplate";
import { addItems, addCategories } from "../../redux/productSlice";
import { AppDispatch } from "../../redux/store";

interface RootState {
  product: {
    items: IProducts[],
    categories: string[]
  }
}

const HomePage = () => {
  // const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState<IProducts[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[] | []>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const products = useSelector((state: RootState) => {
    // console.log('state', state)
    return state.product.items
  });
  const categories = useSelector((state: RootState) => state.product.categories);

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      if(!categories.length) {
        await getCategories();
      }
      if(!products.length) {
        await getProducts();
      }
      setLoading(false);
    }
    getData();
  }, []);

  async function getCategories() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/products/categories`
      );
      const categoriesResponse = await response.json();
      // setCategories(categoriesResponse);
      dispatch(addCategories(categoriesResponse))
    } catch {
      console.log("Something went wrong. Please try again");
    }
  }

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/products?limit=20`
      );
      const productResponse = await response.json();

      // setProducts(productResponse);
      setFilteredProducts(productResponse);
      dispatch(addItems(productResponse))
    } catch {
      console.log("Something went wrong. Please try again");
    }
  }

  function onChangeCategories(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    let tempFilters = filters.slice();

    if (tempFilters.includes(value)) {
      tempFilters = filters.filter((ele) => ele !== value);
    } else {
      tempFilters.push(value);
    }

    setFilters(tempFilters);
  }

  const onSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      let updatedProducts = products.filter(({ title }) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts(products);
    }
  }, 500);

  useEffect(() => {
    if (filters.length) {
      let updatedProducts = products.filter(({ category }) =>
        filters.includes(category)
      );
      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [filters, products]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <DefaultTemplate>
        <div>
          <div className={classNames(styles.TopBar, "d-flex align-items-center justify-content-between")}>
            <div>
              Products
            </div>
            <div>
              <input className={classNames(styles.Search, 'my-input')} type="text" placeholder="Search" onChange={onSearch} />
            </div>
          </div>

          {loading ? (
            <div className="Loading">Loading ...</div>
          ) : (
            <div className="d-flex">
              <Filters
                categories={categories}
                onChangeCategories={onChangeCategories}
              />

              <div className={styles.ProductsContainer}>
                {filteredProducts.length === 0 ? (
                  "No data Found"
                ) : (
                  <>
                    {filteredProducts.map(
                      ({ id, image, title, description, price, category }: IProducts) => (
                        <Fragment key={id}>
                          <ProductCard
                            id={id}
                            image={image}
                            title={title}
                            description={description}
                            price={price}
                            category={category}
                          />
                        </Fragment>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </DefaultTemplate>
     
    </>
  );
};

export default HomePage;
