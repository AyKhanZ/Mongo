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
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageFile, setImageFile] = useState<File>();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!imageFile) {
          alert("Please select an image file");
          return;
      }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
            const base64Image = reader.result as string;

            try {
                const response = await fetch("http://localhost:3000/api/news", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description: desc,

                        img: base64Image,
                    }),
                });

                if (response.ok) {
                    router.push("/manageNews");
                } else {
                    const text = await response.text();
                    console.error(
                        `Request failed with status code ${response.status} and body: ${text}`
                    );
                    throw new Error("Error creating news");
                }
            } catch (error) {
                console.error(error);
                alert("Error creating news");
            }
        };
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
                            <CreateBtn
                                onClick={handleSubmit}
                                symbol="+"
                                title="Create"
                            />
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
                            <UploadImage setImg={setImageFile} />
                        </div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    );
};

export default PostNews;
