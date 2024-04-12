import { News, Product } from "@/types";
import { useEffect, useState } from "react";
import styles from "./ManageNews.module.css";
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as trashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "@/components/DeleteForm/DeleteForm";
import { useRouter } from "next/router";
import Image from "next/image";
import { Nunito } from "next/font/google";
import { useParams } from "next/navigation";

const nunito = Nunito({ subsets: ["latin"] });

const ManageNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [delNewsId, setDelNewsId] = useState<string>("");
    const [deleteShown, setDeleteShown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/news");
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                } else {
                    console.error("Error fetching news");
                }
            } catch (error: any) {
                console.error(error);
            }
        };
        fetchNews();
    }, []);

    const deleteNews = async (id: string) => {
        try {
            await fetch(`http://localhost:3000/api/news/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            // Update the state after successful deletion
            setNews(news.filter((item) => item.id !== id));
        } catch (error: any) {
            console.error(error);
        }
    };

    const edit = async (id: string) => {
        try {
            const newNews: News = {
                title,
                description: desc,
                img,
            };
            const response = await fetch(
                `http://localhost:3000/api/news/${id}`,
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

            const updatedNews = await response.json();

            // Here you can update your local state or fetch the updated news
            // For example:
            // setNews(updatedNews);
        } catch (error: any) {
            console.error(error);
        }
    };

    const showDelete = (pId: any) => {
        setDelNewsId(pId);
        setDeleteShown((prev) => !prev);
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <SideBarLayout>
            <div className={`${nunito.className} ${styles.container}`}>
                <div
                    className={
                        deleteShown
                            ? `${styles.deleteForm}`
                            : `${styles.containerHidden}`
                    }
                >
                    <DeleteForm
                        setDeleteShown={setDeleteShown}
                        deleteThis={() => deleteNews(delNewsId)}
                    />
                </div>
                <div
                    className={
                        deleteShown
                            ? styles.containerHidden
                            : styles.containerHeader
                    }
                >
                    <div className={styles.containerTitle}>
                        <div className={styles.iconContainer}>
                            <h1 className={styles.heading}>All news</h1>
                            <Image
                                src="/news.svg"
                                alt="News icon"
                                height={40}
                                width={40}
                            />
                        </div>
                        <CreateBtn
                            onClick={() => router.push("/postNews")}
                            symbol="+"
                            title="Create"
                        />
                    </div>
                </div>
                <div
                    className={
                        deleteShown ? styles.containerHidden : styles.news
                    }
                >
                    {news.length > 0 ? (
                        news.map((p: News) => (
                            <div className={styles.horizontal} key={p.id}>
                                {p.imageFile == null ? (
                                    <div className={styles.imgContainer}></div>
                                ) : (
                                    <Image
                                        className={styles.imgContainer}
                                        src={`data:image/jpeg;base64,${p.imageFile}`}
                                        alt="News image"
                                        width={280}
                                        height={220}
                                    />
                                )}

                                <div className={styles.productContent}>
                                    <div className={styles.productTitle}>
                                        <h2 className={styles.title}>
                                            {p.title}
                                        </h2>

                                        <div className={styles.btns}>
                                            <CreateBtn
                                                onClick={() =>
                                                    router.push(
                                                        `/manageNews/${p.id}`
                                                    )
                                                }
                                                symbol={pencil}
                                                title="Edit"
                                            />
                                            <CreateBtn
                                                onClick={() => showDelete(p.id)}
                                                symbol={trashCan}
                                                title="Delete"
                                            />
                                        </div>
                                    </div>

                                    <p className={styles.description}>
                                        {truncateText(p.description, 200)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.containerNone}>
                            <p className={styles.nonewsText}>
                                No news yet ƪ(˘⌣˘)ʃ
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </SideBarLayout>
    );
};
export default ManageNews;
