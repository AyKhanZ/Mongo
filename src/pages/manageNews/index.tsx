import { News } from "@/types";
import NewsModel from "../../../lib/models/NewsModel";
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
            setNews(news.filter((item) => item._id !== id));
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
                        news.map((news: News) => (
                            <div className={styles.horizontal} key={news._id}>
                                {news.imageFile == null ? (
                                    <div className={styles.imgContainer}>
                                        <Image
                                            className={styles.imgContainer}
                                            src={news.img as string}
                                            alt="News image"
                                            width={280}
                                            height={220}
                                        />
                                    </div>
                                ) : (
                                    <Image
                                        className={styles.imgContainer}
                                        src={news.img as string}
                                        alt="News image"
                                        width={280}
                                        height={220}
                                    />
                                )}

                                <div className={styles.productContent}>
                                    <div className={styles.productTitle}>
                                        <h2 className={styles.title}>
                                            {news.title}
                                        </h2>

                                        <div className={styles.btns}>
                                            <CreateBtn
                                                onClick={() =>
                                                    router.push(
                                                        `/manageNews/${news._id}`
                                                    )
                                                }
                                                symbol={pencil}
                                                title="Edit"
                                            />
                                            <CreateBtn
                                                onClick={() =>
                                                    showDelete(news._id)
                                                }
                                                symbol={trashCan}
                                                title="Delete"
                                            />
                                        </div>
                                    </div>

                                    <p className={styles.description}>
                                        {truncateText(news.description, 200)}
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