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

const nunito = Nunito({ subsets: ["latin"] });

const PostProduct = () => {
  const [id1C, setId1C] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    console.log(img);
  }, [img]);

  const getProduct = async (id: number) => {
    const response = await fetch(`https://localhost:7164/Product/ById/${id}`);
    const data = await response.json();

    setId1C(data.id1C);
    setType(data.productType);
    setName(data.name);
    setDesc(data.description);
  };

  useEffect(() => {
    getProduct(Number(params.editId));
  }, [params]);

  const editProduct = async (id: number) => {
    const productToEdit = {
      id: params.editId,
      id1C: id1C,
      productType: type,
      name: name,
      description: desc,
      image: img,
    };

    const byteArray = new Uint8Array([
      /* ваш массив байтов */
    ]);

    const formData = new FormData();
    formData.append("productToEdit", JSON.stringify(productToEdit));
    formData.append("image", new Blob([byteArray]));

    fetch("https://localhost:7164/Product/ById/146513", {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the PUT request:", error);
      });

    // router.push("/manageProducts");
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Edit the roduct</h1>

            <div className={styles.btns}>
              <CreateBtn
                onClick={() => editProduct(Number(params.editId))}
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
              <label className={styles.label}>Product type</label>
              <input
                className={styles.input}
                defaultValue={type}
                onChange={(ev) => setType(ev.target.value)}
                placeholder="Product type"
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
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>
              <UploadImage setImg={setImg} />
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
