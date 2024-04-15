import NavBar from "@/components/NavBar/NavBar";
import { Products } from "../../../../lib/data";
import { useRouter } from "next/navigation";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";


const MenuSubcategoryDetails = ({category}: any) => {
  const [data, setData] = useState([])

  const filterProducts = (arr: any) => {
    const newArr = arr.filter((p: any) => p.productType === category)
    return newArr
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://localhost:7164/Product");
      const res = await response.json();
      setData(filterProducts(res))
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/news');
      const res = await response.json();
      setData(res);
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (category !=='Новости'){
    fetchProducts()}
    if (category === 'Новости'){
      fetchNews()
      
    }
  }, [data])

  return ( 
    <>
      <NavBar />
      <PositionRelative>
        {data.map((p:any) => <Product category={category} key={p.id} product={p} />)}
      </PositionRelative>
    </>
  )
}

export default MenuSubcategoryDetails

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    menuCategoryId: 'Продукты',
                    menuSubcategoryId: 'BAIM: Комплексная Автоматизация'
                  }
            },
            {
                params: {
                    menuCategoryId: 'Продуктыs',
                    menuSubcategoryId: 'BAIM:Бухгалтерия для Азербайджана'
                  }
            }
        ],
        fallback: 'blocking',
    }
}

export async function getStaticProps(context: any) {
    const {params} = context;

    const productsData = Products.filter(p => p.productType === params.menuSubcategoryId)

    return {
        props: {
            category: params.menuSubcategoryId
        }
    }

}

