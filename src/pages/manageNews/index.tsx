import { News } from "@/types";
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
    const [news, setNews] = useState([]);
    const [delNewsId, setDelNewsId] = useState(0);
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

    const deleteNews = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/api/news/${id}`, {
                method: "DELETE",
            });
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
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
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
                            <div className={styles.horizontal} key={p._id}>
                                {p.img == null ? (
                                    <></>
                                ) : (
                                    <Image
                                        className={styles.imgContainer}
                                        src={p.img}
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
                                                        `/manageNews/${p._id}`
                                                    )
                                                }
                                                symbol={pencil}
                                                title="Edit"
                                            />
                                            <CreateBtn
                                                onClick={() => showDelete(p._id)}
                                                symbol={trashCan}
                                                title="Delete"
                                            />
                                        </div>
                                    </div>

                                    <h2 className={styles.id}>
                                        Id 1C: {p._id1C}
                                    </h2>
                                    <h6 className={styles.title}>
                                        Is public:{" "}
                                        {Boolean(p.isPublic).toString()}
                                    </h6>
                                    <p className={styles.desc}>
                                        {truncateText(p.description, 550)}
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
