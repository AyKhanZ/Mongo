import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./PostProduct.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";
import CheckBox from "@/components/CheckBox/CheckBox";
import ComboBox from "@/components/ComboBox/ComboBox";
 
const nunito = Nunito({ subsets: ["latin"] });

const PostProduct = () => {
  const [id1C, setId1C] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [img, setImg] = useState("");

  const productTypes = [
    "Флагманские продукты",
    "Услуги",
    "Пользовательские лицензии",
    "Серверные лицензии",
    "1С:ИТС",
  ];

  const handleTypeSelect = (ProductType: string) => {
    setType(ProductType);
  };

  const router = useRouter();

  const postProduct = async () => {
    try {
      const productToPost = {
        id1C: id1C,
        name: name,
        description: desc,
        productType: type,
        isPublic: isPublic,
        image: img,
      };
      await fetch("https://localhost:7164/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToPost),
      });
    } catch (error: any) {
      throw new Error(error);
    }
    router.push("/manageProducts");
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Add new product</h1>
            <div className={styles.btns}>
              <CreateBtn
                onClick={() => router.push("/manageProducts")}
                symbol={back}
                title="Back"
              />
              <CreateBtn onClick={postProduct} symbol="+" title="Create" />
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.inputs}>
              <label className={styles.label}>Id 1C</label>
              <input
                onChange={(ev) => setId1C(ev.target.value)}
                placeholder="Id 1C"
                className={styles.input}
                type="text"
              />
              <label className={styles.label}>Name</label>
              <input
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Name"
                className={styles.input}
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                onChange={(ev) => setDesc(ev.target.value)}
                placeholder="Description"
              />
              <label className={styles.label}>Product type</label>
              <ComboBox options={productTypes} onSelect={handleTypeSelect} />
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>
              <UploadImage setImg={setImg} />

              <CheckBox
                defaultValue={false}
                title={
                  "Product is public ( it means than users can see this product )."
                }
                setCheck={setIsPublic}
              />
            </div>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default PostProduct;
