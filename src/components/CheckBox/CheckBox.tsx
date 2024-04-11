import React, { useEffect, useReducer, useState } from "react";
import styles from "./CheckBox.module.css";

interface Props {
  title: string;
  setCheck: any;
  defaultValue: boolean;
}

const CheckBox = ({ title, setCheck, defaultValue }: Props) => {
  const changeCheckBox = () => {
    setCheck((prev: boolean) => !prev);
  };
  return (
    <div className={styles.checkboxWrapper}>
      <input
        defaultChecked={defaultValue}
        type="checkbox"
        className={styles.check}
        id="check1-61"
        onChange={changeCheckBox}
      />
      <label htmlFor="check1-61" className={styles.label}>
        <svg width="45" height="45" viewBox="0 0 95 95">
          <rect
            x="30"
            y="20"
            width="50"
            height="50"
            stroke="black"
            fill="none"
          ></rect>
          <g transform="translate(0,-952.36222)">
            <path
              d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
              stroke="black"
              stroke-width="3"
              fill="none"
              className={styles.path1}
            ></path>
          </g>
        </svg>
        <span>{title}</span>
      </label>
    </div>
  );
};

export default CheckBox;
