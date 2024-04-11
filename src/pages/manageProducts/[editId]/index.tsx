import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Nunito } from "next/font/google";
import styles from "./EditId.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";
import CheckBox from "@/components/CheckBox/CheckBox";
import ComboBox from "@/components/ComboBox/ComboBox";

const nunito = Nunito({ subsets: ["latin"] });

const PostProduct = () => {
  const [id1C, setId1C] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const productTypes = [
    "Флагманские продукты",
    "Услуги",
    "Пользовательские лицензии",
    "Серверные лицензии",
    "1С:ИТС",
  ];

  const router = useRouter();
  const params = useParams();

  const getProduct = async (id: number) => {
    const response = await fetch(`https://localhost:7164/Product/ById/${id}`);
    const data = await response.json();

    setIsPublic(data.isPublic);
    setImg(data.image);
    setId1C(data.id1C);
    setType(data.productType);
    setName(data.name);
    setDesc(data.description);
    console.log(isPublic);
  };

  useEffect(() => {
    getProduct(Number(params.editId));
  }, [params]);

  const handleTypeSelect = (ProductType: string) => {
    setType(ProductType);
  };

  const edit = async (id: number) => {
    const productToEdit = {
      id: params.editId,
      id1C: id1C,
      name: name,
      description: desc,
      productType: type,
      isPublic: isPublic,
      image: img,
    };

    await fetch(`https://localhost:7164/Product/ById/${params.editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToEdit),
    });

    router.push("/manageProducts");
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Edit the roduct</h1>

            <div className={styles.btns}>
              <CreateBtn
                onClick={() => edit(Number(params.editId))}
                symbol={pencil}
                title="Edit"
              />
              <CreateBtn
                onClick={() => router.push("/manageProducts")}
                symbol={back}
                title="Back"
              />
            </div>
          </div>

          <div className={styles.form}>
            <div className={styles.inputs}>
              <label className={styles.label}>Id 1C</label>
              <input
                className={styles.input}
                defaultValue={id1C}
                onChange={(ev) => setId1C(ev.target.value)}
                placeholder="Id 1C"
                type="text"
              />
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                defaultValue={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Product name"
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                defaultValue={desc}
                onChange={(ev) => setDesc(ev.target.value)}
                placeholder="Product description"
              />
              <label className={styles.label}>Product type</label>
              <ComboBox options={productTypes} onSelect={handleTypeSelect} />
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>
              <UploadImage setImg={setImg} />

              {isPublic ? (
                <CheckBox
                  defaultValue={true}
                  title={
                    "Product is public ( it means than users can see this product )."
                  }
                  setCheck={setIsPublic}
                />
              ) : (
                <CheckBox
                  defaultValue={false}
                  title={
                    "Product is public ( it means than users can see this product )."
                  }
                  setCheck={setIsPublic}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default PostProduct;

{
  /* <button onClick={() => editProduct(Number(params.editId))}>
  Edit product
</button> */
}
{
  /* <input
  className={styles.input}
  onChange={(ev) => setImg(ev.target.value)}
  placeholder="productImg"
  type="file"
/> */
}
