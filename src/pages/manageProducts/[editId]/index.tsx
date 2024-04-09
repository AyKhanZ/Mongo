import SideBarLayout from "@/components/SideBarLayout/SideBarLayout"
import { useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

const PostProduct = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const router = useRouter()
  const params = useParams()

  console.log(params)


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
        <input onChange={(ev) => setType(ev.target.value)} placeholder="productType"  type="text" />
        <input onChange={(ev) => setName(ev.target.value)} placeholder="productName"  type="text" />
        <input onChange={(ev) => setDesc(ev.target.value)} placeholder="productDesc"  type="text" />
        <input onChange={(ev) => setImg(ev.target.value)} placeholder="productImg" type="text" />
        <button onClick={() => editProduct(Number(params.editId))}>Create product</button>
      </div>
    </SideBarLayout>
  )
}

export default PostProduct