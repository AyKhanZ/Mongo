import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./PostProduct.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const PostProduct = () => {
  const [id1C, setId1C] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();

  const postProduct = async () => {
    const productToPost = {
      id1C: id1C,
      productType: type,
      name: name,
      description: desc,
      image: img,
    };

    await fetch("https://localhost:7164/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToPost),
    });

    router.push("/manageProducts");
  };

  return (
    <SideBarLayout>
      <div className="form">
        <input
          onChange={(ev) => setId1C(ev.target.value)}
          placeholder="Id 1C"
          className={styles.input}
          type="text"
        />
        <input
          onChange={(ev) => setType(ev.target.value)}
          placeholder="productType"
          className={styles.input}
          type="text"
        />
        <input
          onChange={(ev) => setName(ev.target.value)}
          placeholder="productName"
          className={styles.input}
          type="text"
        />
        <input
          onChange={(ev) => setDesc(ev.target.value)}
          placeholder="productDesc"
          className={styles.input}
          type="text"
        />
        <input
          onChange={(ev) => setImg(ev.target.value)}
          placeholder="productImg"
          className={styles.input}
          type="text"
        />
        <button onClick={postProduct}>Create product</button>
      </div>
    </SideBarLayout>
  );
};

export default PostProduct;
