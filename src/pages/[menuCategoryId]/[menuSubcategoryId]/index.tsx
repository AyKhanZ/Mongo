import NavBar from "@/components/NavBar/NavBar";
import { Products } from "../../../../lib/data";
import { useRouter } from "next/navigation";
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";

const MenuSubcategoryDetails = ({productsData}: any) => {


  return (
    <>
      <NavBar />
      <PositionRelative>
        {productsData.map((p:any) => <h2 key={p.id}>{p.name}</h2>)}
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
                    menuCategoryId: 'products',
                    menuSubcategoryId: 'BAIM: Комплексная Автоматизация'
                  }
            },
            {
                params: {
                    menuCategoryId: 'products',
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
    console.log(productsData)

    return {
        props: {
            productsData
        }
    }

}

