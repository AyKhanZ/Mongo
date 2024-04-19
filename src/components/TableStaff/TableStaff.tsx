import React, { useState } from "react";
import styles from "./TableStaff.module.css";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import {
  faPen as edit,
  faCheck as check,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { employer } from "@/types";
import DisActiveBtn from "@/components/DisActiveBtn/DisActiveBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableProps {
  staff: employer[];
  activeStates: { [id: number]: boolean };
  setActiveStates: React.Dispatch<
    React.SetStateAction<{ [id: number]: boolean }>
  >;
  positionEdited: string;
  setPositionEdited: (email: string) => void;
}

const TableStaff: React.FC<TableProps> = ({
  staff,
  activeStates,
  setActiveStates,
  positionEdited,
  setPositionEdited,
}) => {
  const [position, setPosition] = useState("Intern");

  const handleDisable = async (id: number) => {
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

    try {
      await fetch(
        `https://localhost:7164/Employer/Dismiss/${id}?isDismissed=${!activeStates[
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

  const handleEdit = (email: string) => {
    setPositionEdited(email);
  };

  const changePosition = (e: any) => {
    setPosition(e.target.value);
  };

  const handlePosition = async (email: string, position: string) => {
    try {
      await fetch(
        `https://localhost:7164/Employer/ChangePosition/${email}?position=${position}`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      console.error(error);
    }
    setPositionEdited("");
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
            <td className={styles.cell}>
              <>
                {positionEdited == staffMember.employer.user.email ? (
                  <input
                    placeholder="Set position"
                    className={styles.input}
                    onChange={changePosition}
                  />
                ) : (
                  <p className={styles.position}>
                    {staffMember.employer.position}
                  </p>
                )}
              </>
            </td>
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
                <>
                  {positionEdited == staffMember.employer.user.email ? (
                    <>
                      <button
                        onClick={() =>
                          handlePosition(
                            staffMember.employer.user.email,
                            position
                          )
                        }
                        className={styles.btnCheck}
                      >
                        <FontAwesomeIcon
                          icon={check}
                          style={{ fontSize: 22 }}
                        />
                      </button>
                      <button
                        onClick={() => handleEdit("")}
                        className={styles.btnCansel}
                      >
                        <FontAwesomeIcon icon={faX} style={{ fontSize: 20 }} />
                      </button>
                    </>
                  ) : (
                    <CreateBtn
                      onClick={() =>
                        handleEdit(staffMember.employer.user.email)
                      }
                      symbol={edit}
                      title="Edit"
                    />
                  )}
                </>
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
