import React, {useState} from "react";
import styles from "./Table.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faRightLong as moreDetails } from "@fortawesome/free-solid-svg-icons";
import {ClientWrapper} from "@/types";
import DisActiveBtn from "@/components/DisActiveBtn/DisActiveBtn";
import {useRouter} from "next/router";
import {useParams} from "next/navigation"; // Предполагается, что тип ClientWrapper правильно описывает структуру данных


interface TableProps {
    clients: ClientWrapper[];
    activeStates: { [id: number]: boolean };
    setActiveStates: React.Dispatch<React.SetStateAction<{ [id: number]: boolean }>>;
}

const Table: React.FC<TableProps> = ({ clients, activeStates, setActiveStates }) => {
  function formatCompanyName(companyName: string, maxLength: number = 10): string {
      if (!companyName) return companyName;
      return companyName.length <= maxLength ? companyName : `${companyName.substring(0, maxLength)}...`;
  }

  const handleDisable = async (id: number) => {
      // Переключение состояния активности для конкретного клиента
      setActiveStates(prev => ({ ...prev, [id]: !prev[id] }));

      console.log(`${id} + ${activeStates[id]}`);
      try {
          await fetch(`https://localhost:7164/ById/${id}?isActive=${!activeStates[id]}`, {
              method: "PUT",
          });
      }
      catch (error) {
          console.error(error);
      }
  };

  const router = useRouter();

  return (
      <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.header}>ID 1C</th>
          <th className={styles.header}>ИФО</th>
          <th className={styles.header}>Email</th>
          <th className={styles.header}>Мобильный</th>
          <th className={styles.header}>Рабочий</th>
          <th className={styles.header}>Компания</th>
          <th className={styles.header}>Почта</th>
          <th className={styles.header}>Активен</th>
          <th className={styles.headerActions}>Действие</th>
        </tr>
        </thead>
        <tbody className={styles.tbody}>
        {clients.map(({client}:any) => (
            <tr key={client.id}>
              <td className={styles.cell}>{client.user.id1C}</td>
              <td className={styles.cell}>{`${client.user.userName} ${client.user.lastName}`}{client.user.patronimic != null ? client.user.patronimic : "..."}</td>
              <td className={styles.cell}>{client.user.email}</td>
              <td className={styles.cell}>{client.user.phoneNumber != null ? client.user.phoneNumber : "..." } </td>
              <td className={styles.cell}>{client.businessPhoneNumber != "" ? client.businessPhoneNumber : "..." }</td>
              <td className={styles.cell}>{client.company != null ? formatCompanyName(client.company.companyName ?? "") : "None"}</td>
              <td className={styles.cell}>{client.user.emailConfirmed ? "Confirmed" : "No yet"}</td>
              <td className={styles.cell}>{client.isPublic ? "Active" : "No active"}</td>
              <td className={styles.cellActions}>
                <div className={styles.btns}>
                  <CreateBtn onClick={() => router.push(`/manageUsers/${client.id}`)} symbol={moreDetails} title="Info" />
                  <DisActiveBtn onClick={() => handleDisable(client.id)} isActive={activeStates[client.id] ?? client.isPublic}/>
                </div>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  );
};

export default Table;