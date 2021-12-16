
   
import classNames from "classnames";
import React from "react";
import Header from "../../components/Header/Header";
import styles from "./DefaultTemplate.module.scss";

const DefaultTemplate = ({ children }: any) => (
  <>
    <Header />
    <main className={classNames(styles.Main, 'container')}>{children}</main>
  </>
);

export default DefaultTemplate;
