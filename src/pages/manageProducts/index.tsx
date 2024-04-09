import { Product } from "@/types";
import { useEffect, useState } from "react";
import styles from "./ManageProduct.module.css";
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as trashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import { useRouter } from "next/router";

const nunito = Nunito({ subsets: ["latin"] });

const ManageProducts = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [products, setProducts] = useState([]);
  const [delProductId, setDelProductId] = useState(0);
  const [deleteShown, setDeleteShown] = useState(false);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async(id: number) => {
    await fetch(`api/products/${id}`, {
      method: 'DELETE'
    })
  }

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const showDelete = (pId: any) => {
    if (pId){
    console.log(pId);
    setDelProductId(pId);
    setDeleteShown((prev) => !prev);}
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
      <div
            className={
              deleteShown
                ? `${styles.deleteForm}`
                : `${styles.containerHidden}`
            }
          >
            <DeleteForm
              setDeleteShown = {setDeleteShown}
              deleteThisProduct = {() => deleteProduct(delProductId)}
              // deleteShown={deleteShown}
              // productId={p.id}
            />
          </div>
        <div className={deleteShown ? styles.containerHidden : styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Products CRUD</h1>
            <CreateBtn onClick={() => router.push('/postProduct')} symbol="+" title="Create" />
          </div>



          {products.length > 0 ? (
            products.map((p: Product) => (
    
                <div className={styles.horizontal} key={p.id}>
                  <div className={styles.imgContainer}></div>
                  


                  <div className={styles.productContent}>
                    <div className={styles.productTitle}>
                      <h2 className={styles.title}>{p.name}</h2>



                      <div className={styles.btns}>
                        <CreateBtn
                          onClick={() => router.push(`/manageProducts/${p.id}`)}
                          symbol={pencil}
                          title="Edit"
                        />
                        <CreateBtn
                          onClick={() => showDelete(p.id)}
                          symbol={trashCan}
                          title="Delete"
                        />
                        
                      </div>
                    </div>
                    


                    <h2 className={styles.id}>Id 1C: {p.id1C}</h2>
                    <p className={styles.desc}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry s
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
              
            ))
          ) : (
            <div className={styles.containerNone}>
              <p className={styles.noProductsText}>No products yet ƪ(˘⌣˘)ʃ</p>
            </div>
          )}
        </div>
      </div>
    </SideBarLayout>
  );
};

export default ManageProducts;

// const postProduct = async () => {
//   const productToPost = {
//     id: 30,
//     productType: productType,
//     productName: name,
//     productDesc: desc,
//     productImg: img,
//   };

//   const response = await fetch("/api/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(productToPost),
//   });

//   const data = await response.json();
//   console.log(data);
//   await fetchProducts();
// };

// const editProduct = async (id: number) => {
//   const productToEdit = {
//     id: id,
//     productType: productType,
//     productName: name,
//     productDesc: desc,
//     productImg: img,
//   };

//   const response = await fetch(`/api/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(productToEdit),
//   });

//   const data = await response.json();
//   await fetchProducts();
// };
