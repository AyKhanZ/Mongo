import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./PostProduct.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/types";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as trashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import Image from "next/image";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";
import CheckBox from "@/components/CheckBox/CheckBox";
import ComboBox from "@/components/ComboBox/ComboBox";

const nunito = Nunito({ subsets: ["latin"] });

const PostProduct = () => {
  const [id1C, setId1C] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState({});

  const [type, setType] = useState("");
  const productTypes = [
    "Флагманские продукты",
    "Услуги",
    "Пользовательские лицензии",
    "Серверные лицензии",
    "1С:ИТС",
  ];

  const [isPublic, setIsPublic] = useState(false);
  const [img, setImg] = useState("");

  const handleTypeSelect = (ProductType: string) => {
    setType(ProductType);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const router = useRouter();

  const postProduct = async () => {
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

    setData(productToPost);

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
