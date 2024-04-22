import { Products } from "../../../lib/data";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import ProductType from "@/components/ProductType/ProductType";
import styles from "./ProductPage.module.css";
import { Nunito } from "next/font/google";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { productTypes } from "../../../lib/data";
import { useRouter } from "next/router";

const nunito = Nunito({ subsets: ["latin"] });

const MenuCategoryDetails = ({ category, proTypes }: any) => {
  const [data, setData] = useState([]);

  const router = useRouter();

  const linksArr = [
    "Продукты",
    "Услуги",
    "Полезные материалы",
    "Наши клиенты",
    "О компании",
  ];

  const filterProducts = (arr: any) => {
    return arr.filter((p: any) => p.productType === category);
  };

  const fetchData = async () => {
    try {
      let response;

      response = await fetch("https://localhost:7164/Product");
      const res = await response.json();

      setData(filterProducts(res));
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className={`${styles.container} ${nunito.className}`}>
      <PositionRelative>
        {category == "Продукты"
          ? proTypes.map((p: any, i: number) => (
              <ProductType category={category} key={i} productType={p} />
            ))
          : data.map((p: any) => (
              <Product category={category} key={p.id} product={p} />
            ))}
      </PositionRelative>
    </div>
  );
};

export default MenuCategoryDetails;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          menuCategoryId: "Продукты",
        },
      },
      {
        params: {
          menuCategoryId: "Услуги",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  return {
    props: {
      category: params.menuCategoryId,
      proTypes: productTypes,
    },
  };
}
