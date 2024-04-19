import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Nunito } from "next/font/google";
import styles from "./InfoId.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faLeftLong as back } from "@fortawesome/free-solid-svg-icons";
import {ClientWrapper} from "@/types";
import ClientIcon from "@/components/ClientIcon/ClientIcon";
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
                </div>
                <div className={styles.products}>
                    {client ? (
                        <div className={styles.form}>
                            <div className={styles.column}>
                                <div className={styles.content}>
                                    <label className={styles.label}>Name: </label>
                                    <label className={styles.labelContent}>{client?.user?.userName}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Surname: </label>
                                    <label className={styles.labelContent}>{client?.user?.lastName}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Patronimic: </label>
                                    <label className={styles.labelContent}>{!client?.user?.patronimic ? "Not set" : client?.user?.patronimic}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Phone number: </label>
                                    <label className={styles.labelContent}>{!client?.user?.phoneNumber ? "Not set" :client?.user?.phoneNumber}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Business phone number: </label>
                                    <label className={styles.labelContent}>{!client?.businessPhoneNumber ? "Not set" : client?.businessPhoneNumber}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Email: </label>
                                    <label className={styles.labelContent}>{client?.user?.email}</label>
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.label}>Personal email: </label>
                                    <label className={styles.labelContent}>{!client?.personalEmail ? "Not set" : client?.personalEmail}</label>
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.imageContainer}>
                                    <div className={!client.user.image? `${styles.borderContainer}` : ``}>
                                        {!client.user.image ?
                                            <ClientIcon className="icon-class" style={{ width: '300px', height: '300px', fill: 'grey' }} />:<Image className={styles.img} src={""} alt={"Photo"} height={300} width={300}/>

                                        }
                                    </div>

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
