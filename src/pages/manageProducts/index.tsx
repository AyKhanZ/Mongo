import { Product } from "@/types";
import { useEffect, useState } from "react";
import styles from "./ManageProduct.module.css";
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as trashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import { useRouter } from "next/router";
import Image from "next/image";
import { Nunito } from "next/font/google";
import ProductFilters from "@/components/ProductFilters/ProductFilters";

const nunito = Nunito({ subsets: ["latin"] });
 
const ManageProducts = () => {
  const [url, setUrl] = useState("https://localhost:7164/Product");
  const [products, setProducts] = useState([]);
  const [delProductId, setDelProductId] = useState(0);
  const [deleteShown, setDeleteShown] = useState(false);

  const router = useRouter();
 
  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`https://localhost:7164/Product/ById/${id}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products, url]);

  const showDelete = (pId: any) => {
    setDelProductId(pId);
    setDeleteShown((prev) => !prev);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div
          className={
            deleteShown ? `${styles.deleteForm}` : `${styles.containerHidden}`
          }
        >
          <DeleteForm
            setDeleteShown={setDeleteShown}
            deleteThis={() => deleteProduct(delProductId)}
          />
        </div>
        <div
          className={
            deleteShown ? styles.containerHidden : styles.containerHeader
          }
        >
          <div className={styles.containerTitle}>
            <div className={styles.iconContainer}>
              <h1 className={styles.heading}>All products</h1>
              <Image
                src="/product-delivery-icon.svg"
                alt="Products icon"
                height={40}
                width={40}
              />
            </div>
            <CreateBtn
              onClick={() => router.push("/postProduct")}
              symbol="+"
              title="Create"
            />
          </div>
        </div>
        <div className={deleteShown ? styles.containerHidden : styles.filters}>
          <ProductFilters setUrl={setUrl} />
        </div>
        <div className={deleteShown ? styles.containerHidden : styles.products}>
          {products.length > 0 ? (
            products.map((p: Product) => (
              <div className={styles.horizontal} key={p.id}>
                {p.combinedImage == null ? (
                  <div className={styles.imgContainer}></div>
                ) : (
                  <Image
                    className={styles.imgContainer}
                    src={p.combinedImage}
                    alt="Product image"
                    width={280}
                    height={220}
                  />
                )}

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
                  <h6 className={styles.title}>
                    Is public: {Boolean(p.isPublic).toString()}
                  </h6>
                  <p className={styles.desc}>
                    {truncateText(p.description, 550)}
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
