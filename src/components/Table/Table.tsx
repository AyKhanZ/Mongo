import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import {
  faPencil as pencil,
  faTrashCan as trashCan,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "@/types";

interface TableProps {
  users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>ID 1C</th>
            <th className={styles.header}>ИФО</th>
            <th className={styles.header}>Email</th>
            <th className={styles.header}>Роль</th>
            <th className={styles.headerActions}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className={styles.cell}>{user.id1C}</td>
              <td className={styles.cell}>
                {user.userName} {user.lastName}
              </td>
              <td className={styles.cell}>{user.email}</td>
              <td className={styles.cell}>{user.role}</td>
              <td className={styles.cellActions}>
                <div className={styles.btns}>
                  <CreateBtn onClick={() => {}} symbol={pencil} title="Edit" />
                  <CreateBtn
                    onClick={() => {}}
                    symbol={trashCan}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
