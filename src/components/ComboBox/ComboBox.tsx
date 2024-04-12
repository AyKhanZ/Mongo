import React, { useState } from "react";
import styles from "./ComboBox.module.css";

interface ComboboxProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <select
      className={styles.select}
      value={selectedOption || ""}
      onChange={(e) => handleSelect(e.target.value)}
    >
      <option value="" disabled hidden>
        Select an option
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Combobox;
