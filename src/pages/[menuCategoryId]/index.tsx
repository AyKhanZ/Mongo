import NavBar from "@/components/NavBar/NavBar";
import { Products } from "../../../lib/data";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import ProductType from "@/components/ProductType/ProductType";
import styles from "./ProductPage.module.css" 
import { Nunito } from "next/font/google";
import Product from "@/components/Product/Product"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const nunito = Nunito({subsets: ["latin"]});

const MenuCategoryDetails = ({info, category}: any) => {
  
  const [data, setData] = useState([]);

  const filterProducts = (arr: any) => {
    return arr.filter((p: any) => p.productType === category)
  }
 
  const fetchData = async () => {
    try {
      let response;
      
      response = await fetch('https://localhost:7164/Product');
      const res = await response.json();
      
      setData(filterProducts(res))
      
      
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [data]) 


  const productTypes = [
    {
      name: 'Флагманские продукты',
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur. \n
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur.`,
      img: '/бухгалтерия.png'
    }, 
    {
      name: 'Пользовательские лицензии',
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur. \n
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur.`,
      img: '/комплексная автоматизация.png'
    }, 
    {
      name: 'Серверные лицензии',
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur. \n
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur.`,
      img: '/зарплата и управление персоналом.png'
    }, 
    {
      name: '1С:ИТС',
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur. \n
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fuga nam corporis, at tenetur laborum? Aliquam nesciunt minima ex excepturi consequatur vel sequi commodi, tempora similique voluptate odit animi consectetur.`,
      img: '/итс.png'
    }
  ]

 

  return (
    <div className={`${styles.container} ${nunito.className}`}>
      <PositionRelative>

        {category=='Продукты' ? productTypes.map((p: any, i: number) => <ProductType category={category} key={i} productType={p} />) : data.map((p:any) => <Product key={p.id} product={p} />)}
         
      </PositionRelative>
    </div>
  )
}

export default MenuCategoryDetails

export async function getStaticPaths() {
  return {
      paths: [
          { 
              params: {
                menuCategoryId: 'Продукты'
              }
          },
          {
              params: {
                menuCategoryId: 'Услуги'
              }
          }
      ],
      fallback: 'blocking',
  } 
}

export async function getStaticProps(context: any) {
  const {params} = context
  const productsData = Products.filter(p => p.productType !== 'Услуги')
  const servicesData = Products.filter(p => p.productType === 'Услуги')
  return {
    props: {
      info: params.menuCategoryId === 'Продукты' ? productsData : servicesData,
      category: params.menuCategoryId
    }
  }
}


