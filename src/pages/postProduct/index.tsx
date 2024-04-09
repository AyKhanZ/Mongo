import SideBarLayout from "@/components/SideBarLayout/SideBarLayout"
import styles from './PostProduct.module.css'
import { useState } from "react";
import { useRouter } from "next/router";

const PostProduct = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const router = useRouter()

  const postProduct = async () => {
    const productToPost = {
      id: 30,
      productType: type,
      productName: name,
      productDesc: desc,
      productImg: img,
    };

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToPost),
    });

    router.push('/manageProducts')
  };

  return (
    <SideBarLayout>
      <div className="form">
        <input onChange={(ev) => setType(ev.target.value)} placeholder="productType" className={styles.input} type="text" />
        <input onChange={(ev) => setName(ev.target.value)} placeholder="productName" className={styles.input} type="text" />
        <input onChange={(ev) => setDesc(ev.target.value)} placeholder="productDesc" className={styles.input} type="text" />
        <input onChange={(ev) => setImg(ev.target.value)} placeholder="productImg" className={styles.input} type="text" />
        <button onClick={postProduct}>Create product</button>
      </div>
    </SideBarLayout>
  )
}

export default PostProduct