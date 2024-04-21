import NavBar from "@/components/NavBar/NavBar";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { productTypes } from "../../../../lib/data";
import NoInfo from "@/components/NoInfo/NoInfo";
import Error from "@/components/ErrorPage/ErrorPage";


const MenuSubcategoryDetails = ({category,subcategory,news}: any) => {
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(true);

  const types = productTypes.map(p => p.name)

  const filterProducts = (arr: any) => {
    const newArr = arr.filter((p: any) => p.productType === subcategory)
    return newArr
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://localhost:7164/Product");
      const res = await response.json();
      setData(filterProducts(res))
    } catch (error: any) {
      console.error(error)
    }
  };


  useEffect(() => {
    if (types.some(p => p==subcategory)){
    fetchProducts()}
    if (subcategory === 'Новости'){
      setData(news)
    } console.log(data)
  }, [data]) 


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data.length == 0) {
        setIsLoaded(false);
        console.log('hey')
      }
    }, 5000); 
 
    return () => clearTimeout(timeout);
  }, [data]);

  return ( 
    <>{isLoaded ? 
    <>
      <PositionRelative>
        {data.length > 0 ? data.map((p:any) => <Product category={category} subcategory={subcategory} key={p.id} product={p} />) : <NoInfo/>}
      </PositionRelative>
    </> :
    <Error />
    }</>
  )
}

export default MenuSubcategoryDetails

export async function getServerSideProps(context: any) {
    const {params} = context;
  
    const news = await fetch('http://localhost:3000/api/news')
    const newsData = await news.json()
    
    return {
        props: {
            subcategory: params.menuSubcategoryId,
            category: params.menuCategoryId,
            news: newsData
        }
    }
}
