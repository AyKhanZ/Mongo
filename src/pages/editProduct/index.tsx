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

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.error(err);
    }

  };

  const editProduct = async (id: number) => {
    const productToEdit = {
      id: id,
      productType: type,
      productName: name,
      productDesc: desc,
      productImg: img,
    };
  
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToEdit),
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
        <button onClick={() => 0}>Create product</button>
      </div>
    </SideBarLayout>
  )
}

export default PostProduct