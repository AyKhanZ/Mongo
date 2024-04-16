import React, { useState } from "react";
import styles from "./ComboBox.module.css";

interface ComboboxProps {
  options: string[];
  onSelect: (value: string) => void;
  defValue: string;
}

const Combobox: React.FC<ComboboxProps> = ({ options, onSelect, defValue }) => {
  const handleSelect = (option: string) => {
    onSelect(option);
  };

  return (
    <>
      {defValue ? (
        <select
          required
          className={styles.select}
          value={defValue ? defValue : options[0]}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option disabled hidden>
            Select an option
          </option>
          {options.map((option, index) => (
            <option selected key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <select
          required
          className={styles.select}
          defaultValue={defValue ? defValue : options[0]}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option disabled hidden>
            Select an option
          </option>
          {options.map((option, index) => (
            <option selected key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Combobox;
