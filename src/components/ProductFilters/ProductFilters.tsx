import React, { useState } from "react";
import styles from "./ProductFilters.module.css";
import FilterBtn from "../FilterBtn/FilterBtn";

interface Props {
  setUrl: any;
}

const ProductFilters = ({ setUrl }: Props) => {
  const [active, setActive] = useState("");

  const filtersLst = [
    "Флагманские продукты",
    "Услуги",
    "Пользовательские лицензии",
    "Серверные лицензии",
    "1С:ИТС",
    "",
  ];

  const drawFilters = () => {
    return filtersLst.map((f, i) => (
      <FilterBtn
        title={f}
        key={i}
        setUrl={setUrl}
        active={active}
        setActive={setActive}
      />
    ));
  };

  return <div className={styles.containerFilter}>{drawFilters()}</div>;
};

export default ProductFilters;
