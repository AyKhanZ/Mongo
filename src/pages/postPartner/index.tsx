import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import styles from "./PostPartner.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Nunito } from "next/font/google";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";

const nunito = Nunito({ subsets: ["latin"] });

const PostPartner = () => {
  const [id1C, setId1C] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();

  const postProduct = async () => {
    try {
      const partnerToPost = {
        id1C: id1C,
        name: name,
        typeOfActivity: type,
        description: desc,
        image: img,
      };
      await fetch("https://localhost:7164/Partner/AddPartner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partnerToPost),
      });
    } catch (error: any) {
      console.error(error);
    }
    router.push("/managePartners");
  };

  return (
    <SideBarLayout>
      <div className={`${nunito.className} ${styles.container}`}>
        <div className={styles.products}>
          <div className={styles.containerTitle}>
            <h1 className={styles.heading}>Add new partner</h1>
            <div className={styles.btns}>
              <CreateBtn
                onClick={() => router.push("/managePartners")}
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
              <label className={styles.label}>Type of activity</label>
              <input
                onChange={(ev) => setType(ev.target.value)}
                placeholder="Type of activity"
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

export default PostPartner;
