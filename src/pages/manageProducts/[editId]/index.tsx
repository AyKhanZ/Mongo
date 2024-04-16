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
import { productTypes } from "../../../../lib/productsOptions";

const nunito = Nunito({ subsets: ["latin"] });

const PostProduct = () => {
  const [product, setProduct] = useState({
    id1C: "",
    type: "",
    name: "",
    desc: "",
    img: "",
    isPublic: false,
  });

  const router = useRouter();
  const params = useParams();

  const getProduct = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7164/Product/ById/${id}`);
      const data = await response.json();

      setProduct({
        ...product,
        isPublic: data.isPublic,
        img: data.combinedImage,
        id1C: data.id1C,
        type: data.productType,
        name: data.name,
        desc: data.description,
      });
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (params && params.editId) {
      getProduct(Number(params.editId));
    }
  }, [params]);

  const handleTypeSelect = (productType: string) => {
    setProduct({ ...product, type: productType });
  };

  const edit = async (id: number) => {
    try {
      const productToEdit = {
        id: params.editId,
        id1C: product.id1C,
        name: product.name,
        description: product.desc,
        productType: product.type,
        isPublic: product.isPublic,
        image: product.img,
      };

      await fetch(`https://localhost:7164/Product/ById/${params.editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToEdit),
      });
    } catch (error: any) {
      console.error(error);
    }

    router.push("/manageProducts");
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Edit the product</h1>

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
                value={product.id1C}
                onChange={(ev) =>
                  setProduct({ ...product, id1C: ev.target.value })
                }
                placeholder="Id 1C"
                type="text"
              />
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                defaultValue={product.name}
                onChange={(ev) =>
                  setProduct({ ...product, name: ev.target.value })
                }
                placeholder="Product name"
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                defaultValue={product.desc}
                onChange={(ev) =>
                  setProduct({ ...product, desc: ev.target.value })
                }
                placeholder="Product description"
              />
              <label className={styles.label}>Product type</label>
              <ComboBox
                options={productTypes}
                onSelect={handleTypeSelect}
                defValue={product.type}
              />
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>

              <UploadImage
                setImg={(newImg: any) => {
                  if (newImg) {
                    setProduct({ ...product, img: newImg });
                  }
                }}
                img={product.img}
              />

              <CheckBox
                defaultValue={product.isPublic}
                title={
                  "Product is public ( it means than users can see this product )."
                }
                setCheck={() =>
                  setProduct({ ...product, isPublic: !product.isPublic })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default PostProduct;
