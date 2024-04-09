import { Product } from "@/types";
import { useEffect, useState } from "react";
import styles from "./ManageProduct.module.css";
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as trashCan } from "@fortawesome/free-solid-svg-icons";

const nunito = Nunito({ subsets: ["latin"] });

const ManageProducts = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [productType, setProductType] = useState("");
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://localhost:7164/Product");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const postProduct = async () => {
    const productToPost = {
      id: 30,
      productType: productType,
      productName: name,
      productDesc: desc,
      productImg: img,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToPost),
    });

    const data = await response.json();
    console.log(data);
    await fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await fetch(`https://localhost:7164/Product/ById/${id}`, {
      method: "DELETE",
    });
  };

  const editProduct = async (id: number) => {
    const productToEdit = {
      id: id,
      productType: productType,
      productName: name,
      productDesc: desc,
      productImg: img,
    };

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToEdit),
    });

    const data = await response.json();
    await fetchProducts();
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Products CRUD</h1>
            <CreateBtn onClick={() => 0} symbol="+" title="Create" />
          </div>

          {products.length > 0 ? (
            products.map((p: Product) => (
              <>
                <div className={styles.horizontal} key={p.id}>
                  <div className={styles.imgContainer}></div>

                  <div className={styles.productContent}>
                    <div className={styles.productTitle}>
                      <h2 className={styles.title}>{p.name}</h2>
                      <div className={styles.btns}>
                        <CreateBtn
                          onClick={() => 0}
                          symbol={pencil}
                          title="Edit"
                        />
                        <CreateBtn
                          onClick={() => deleteProduct(p.id)}
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
                {/* <div className={styles.show}>
                  <p>{p.img}</p>
                  <p>{p.productType}</p>
                  <p>{p.desc}</p>
                </div> */}
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </SideBarLayout>
  );
};

export default ManageProducts;
{
  /* <div className={styles.formContainer}>
          <h1 className={styles.heading}>Manage product</h1>
          <div className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
              type="text"
              name="name"
            />
            <input
              className={styles.input}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="desc"
              type="text"
              name="desc"
            />
            <input
              className={styles.input}
              onChange={(e) => setImg(e.target.value)}
              value={img}
              placeholder="img"
              type="text"
              name="img"
            />
            <input
              className={styles.input}
              onChange={(e) => setProductType(e.target.value)}
              value={productType}
              placeholder="productType"
              type="text"
              name="productType"
            />
          </div>
          <button onClick={postProduct}>Post products</button>
        </div>
        <hr className={styles.hr}></hr> */
}
