import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./PostNews.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";

const nunito = Nunito({ subsets: ["latin"] });

const PostNews = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();

  const postNews = async () => {
    const newsToPost = {
      title: title,
      description: desc,
      image: img,
    };

    try {
      await fetch("https://localhost:7164/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsToPost),
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
            <h1 className={styles.heading}>Add news</h1>
            <div className={styles.btns}>
              <CreateBtn
                onClick={() => router.push("/manageNews")}
                symbol={back}
                title="Back"
              />
              <CreateBtn onClick={postNews} symbol="+" title="Create" />
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.inputs}>
              <label className={styles.label}>Title</label>
              <input
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Title"
                className={styles.input}
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                onChange={(ev) => setDesc(ev.target.value)}
                placeholder="Description"
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

export default PostNews;
