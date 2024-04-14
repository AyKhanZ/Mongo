import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Nunito } from "next/font/google";
import styles from "./InfoId.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import {ClientWrapper} from "@/types";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"] });


const InfoId = () => {
    const [client, setClient] = useState<ClientWrapper | null>();
    const router = useRouter();
    const params = useParams();

    const getClient = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7164/Client/ById/${id}`);
            const data = await response.json();
            setClient(data)
            console.log(data);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(params) getClient(Number(params.InfoId));
    }, [params]);

    return (
        <SideBarLayout>

            <div className={`${nunito.className} ${styles.container}`}>
                <div className={styles.products}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.heading}>Client</h1>
                        <div className={styles.btns}>
                            <CreateBtn
                                onClick={() => router.push("/manageUsers")}
                                symbol={back}
                                title="Back" />
                        </div>
                    </div>
                    {client ? (
                        <div className={styles.form}>
                            <div className={styles.column}>
                                {/* Используйте optional chaining для безопасного доступа к свойствам */}
                                <label className={styles.label}>{client?.user?.userName}</label>
                                <label className={styles.label}>{client?.user?.lastName}</label>
                                <label className={styles.label}>{client?.user?.patronimic}</label>
                                <label className={styles.label}>{client?.user?.phoneNumber}</label>
                                <label className={styles.label}>{client?.user?.email}</label>
                                <label className={styles.label}>{client?.businessPhoneNumber}</label>
                                <label className={styles.label}>{client?.personalEmail}</label>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src="/account-icon.svg"
                                        alt="image"
                                        width={300}
                                        height={300}
                                        layout="fixed"
                                        objectFit="cover"
                                        objectPosition="center"
                                        className={styles.img}
                                    />
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className={styles.containerNone}>
                            <p className={styles.noProductsText}>Client not found ƪ(˘⌣˘)ʃ</p>
                        </div>
                    )}
                </div>
            </div>

        </SideBarLayout>
    );
};
export default InfoId;
