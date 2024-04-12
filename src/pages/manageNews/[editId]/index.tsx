import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Nunito } from "next/font/google";
import styles from "./EditId.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "@/components/UploadImage/UploadImage";

const nunito = Nunito({ subsets: ["latin"] });

const PostNews = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const { editId } = router.query;
        if (editId) {
            getNews(editId.toString());
        }
    }, [router.query]);

    const getNews = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/news/${id}`
            );
            const data = await response.json();

            setImg(data.img);
            setTitle(data.title);
            setDesc(data.description);
        } catch (error: any) {
            console.error(error);
        }
    };

    const edit = async () => {
        try {
            const newNews = {
                title,
                description: desc,
                img,
            };
            const response = await fetch(
                `http://localhost:3000/api/news/${router.query.editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newNews),
                }
            );

            if (!response.ok) {
                throw new Error("Error updating news");
            }

            router.push("/manageNews");
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <SideBarLayout>
            <div className={`${nunito.className} ${styles.container}`}>
                <div className={styles.products}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.heading}>Edit the news</h1>

                        <div className={styles.btns}>
                            <CreateBtn
                                onClick={edit}
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
                                value={title}
                                onChange={(ev) => setTitle(ev.target.value)}
                                placeholder="News title"
                                type="text"
                            />
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.inputDesc}
                                value={desc}
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
export default PostNews;
