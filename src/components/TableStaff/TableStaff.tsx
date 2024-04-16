import React, { useState } from "react";
import styles from "./TableStaff.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import { faPen as edit } from "@fortawesome/free-solid-svg-icons";
import { employer } from "@/types";
import DisActiveBtn from "@/components/DisActiveBtn/DisActiveBtn";
import { useRouter } from "next/router";

interface TableProps {
  staff: employer[];
  activeStates: { [id: number]: boolean };
  setActiveStates: React.Dispatch<
    React.SetStateAction<{ [id: number]: boolean }>
  >;
}

const TableStaff: React.FC<TableProps> = ({
  staff,
  activeStates,
  setActiveStates,
}) => {
  const router = useRouter();

  const handleDisable = async (id: number) => {
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

    console.log(`${id} + ${activeStates[id]}`);
    try {
      await fetch(
        `https://localhost:7164/Client/DismissEmployer/${id}?isDismissed=${!activeStates[
          id
        ]}`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.header}>ID 1C</th>
          <th className={styles.header}>ИФО</th>
          <th className={styles.header}>Email</th>
          <th className={styles.header}>Мобильный</th>
          <th className={styles.header}>Должность</th>
          <th className={styles.header}>Опыт</th>
          <th className={styles.header}>Почта</th>
          <th className={styles.header}>isDismissed</th>
          <th className={styles.headerActions}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {staff.map((staffMember) => (
          <tr key={staffMember.employer.user.email}>
            <td className={styles.cell}>{staffMember.employer.user.id1C}</td>
            <td className={styles.cell}>
              {`${staffMember.employer.user.userName} ${staffMember.employer.user.lastName}`}
              {staffMember.employer.user.patronimic
                ? ` ${staffMember.employer.user.patronimic}`
                : "..."}
            </td>
            <td className={styles.cell}>{staffMember.employer.user.email}</td>
            <td className={styles.cell}>
              {staffMember.employer.user.phoneNumber
                ? staffMember.employer.user.phoneNumber
                : "..."}
            </td>
            <td className={styles.cell}>{staffMember.employer.position}</td>
            <td className={styles.cell}>
              {staffMember.employer.Experience
                ? staffMember.employer.Experience
                : "Маленький"}
            </td>
            <td className={styles.cell}>
              {staffMember.employer.user.emailConfirmed
                ? "Confirmed"
                : "Not yet"}
            </td>
            <td className={styles.cell}>
              {staffMember.employer.isDismissed ? "Уволен(а)" : "Работает"}
            </td>
            <td className={styles.cellActions}>
              <div className={styles.btns}>
                {/* Раскомментируйте и реализуйте логику кнопок, когда будете готовы */}
                <CreateBtn
                  onClick={() =>
                    router.push(`/manageStaff/${staffMember.employer.id}`)
                  }
                  symbol={edit}
                  title="Edit"
                />
                <DisActiveBtn
                  onClick={() => handleDisable(staffMember.employer.id)}
                  isActive={
                    activeStates[staffMember.employer.id] ??
                    staffMember.employer.isDismissed
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStaff;
