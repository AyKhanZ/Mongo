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

const PostPartner = () => {
  const [id1C, setId1C] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();
  const params = useParams();

  const getPartner = async (id: number) => {
    try {
      const response = await fetch(
        `https://localhost:7164/Partners/ById/${id}`
      );
      const data = await response.json();

      setImg(data.image);
      setId1C(data.id1C);
      setName(data.name);
      setDesc(data.description);
    } catch (error: any) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     getPartner(Number(params.editId));
  //   }, [params]);

  const edit = async (id: number) => {
    try {
      const partnerToEdit = {
        id: params.editId,
        id1C: id1C,
        name: name,
        description: desc,
        image: img,
      };

      await fetch(`https://localhost:7164/Partners/ById/${params.editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partnerToEdit),
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
            <h1 className={styles.heading}>Edit the partner</h1>

            <div className={styles.btns}>
              <CreateBtn
                onClick={() => edit(Number(params.editId))}
                symbol={pencil}
                title="Edit"
              />
              <CreateBtn
                onClick={() => router.push("/managePartners")}
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
                placeholder="Partners name"
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                defaultValue={desc}
                onChange={(ev) => setDesc(ev.target.value)}
                placeholder="Partners description"
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

export default PostPartner;
