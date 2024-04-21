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
  const [partner, setPartner] = useState({
    id1C: "",
    name: "",
    type: "",
    desc: "",
    img: "",
  });
  const router = useRouter();
  const params = useParams();

  const getPartner = async (id: number) => {
    try {
      const response = await fetch(
        `https://localhost:7164/Partner/GetPartnerById/${id}`
      );
      const data = await response.json();

      setPartner({
        ...partner,
        img: data.combinedImage,
        id1C: data.id1C,
        type: data.productType,
        name: data.name,
        desc: data.description,
      });
      console.log(partner);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPartner(Number(params.editId));
  }, [params]);

  const edit = async (id: number) => {
    try {
      const partnerToEdit = {
        id: params.editId,
        id1C: partner.id1C,
        name: partner.name,
        typeOfActivity: partner.type,
        description: partner.desc,
        image: partner.img,
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
                defaultValue={partner.id1C}
                onChange={(ev) =>
                  setPartner({ ...partner, id1C: ev.target.value })
                }
                placeholder="Id 1C"
                type="text"
              />
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                defaultValue={partner.name}
                onChange={(ev) =>
                  setPartner({ ...partner, name: ev.target.value })
                }
                placeholder="Partners name"
                type="text"
              />
              <label className={styles.label}>Type of activity</label>
              <input
                className={styles.input}
                defaultValue={partner.type}
                onChange={(ev) =>
                  setPartner({ ...partner, type: ev.target.value })
                }
                placeholder="Partners type of activity"
                type="text"
              />
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.inputDesc}
                defaultValue={partner.desc}
                onChange={(ev) =>
                  setPartner({ ...partner, desc: ev.target.value })
                }
                placeholder="Partners description"
              />
            </div>
            <div className={styles.imageContainer}>
              <label className={styles.label}>Image</label>
              <UploadImage
                setImg={(newImg: any) => {
                  if (newImg) {
                    setPartner({ ...partner, img: newImg });
                  }
                }}
                img={partner.img}
              />
            </div>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default PostPartner;
