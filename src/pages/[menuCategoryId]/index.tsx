import NavBar from "@/components/NavBar/NavBar";
import { Products } from "../../../lib/data";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";

const menuCategoryDetails = ({data}: any) => {
  console.log(data)
  return (
    <>
      <NavBar />
      <PositionRelative>
        {data.map((p: any) => <h2 key={p.id}>{p.name}</h2>)}
      </PositionRelative>
    </>
  )
}

export default menuCategoryDetails

export async function getStaticPaths() {
  return {
      paths: [
          { 
              params: {
                menuCategoryId: 'products'
              }
          },
          {
              params: {
                menuCategoryId: 'services'
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
      data: params.menuCategoryId === 'products' ? productsData : servicesData
    }
  }
}


