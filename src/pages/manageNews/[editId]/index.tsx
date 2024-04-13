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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();
  const params = useParams();

  const getNews = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7164/News/ById/${id}`);
      const data = await response.json();

      setImg(data.image);
      setTitle(data.title);
      setDesc(data.description);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews(Number(params.editId));
  }, [params]);

  const edit = async (id: number) => {
    try {
      const productToEdit = {
        id: params.editId,
        title: title,
        description: desc,
        image: img,
      };

      await fetch(`https://localhost:7164/News/ById/${params.editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToEdit),
      });
    } catch (error: any) {
      throw new Error(error);
    }

    router.push("/manageNews");
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
                onClick={() => router.push("/manageNews")}
                symbol={back}
                title="Back"
              />
            </div>
          </div>

          <div className={styles.form}>
            <div className={styles.inputs}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                defaultValue={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="News title"
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                defaultValue={desc}
                onChange={(ev) => setDesc(ev.target.value)}
                placeholder="News description"
              />
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>
              <UploadImage setImg={setImg} img={img} />
            </div>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};
export default PostProduct;
