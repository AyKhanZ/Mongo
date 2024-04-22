import React, { useState } from "react";
import { Vacancy } from "@/types";
import { useRouter } from "next/router";
import styles from "./adminCreateVacancy.module.css";

const AdminCreateVacancy: React.FC = () => {
  const router = useRouter();

  const [newVacancy, setNewVacancy] = useState<Vacancy>({
    id: "",
    appointment: "",
    skills: "",
    salary: "",
    conditions: "",
    responsibilities: "",
    employmentType: "Full",
    minimumExperience: "Any",
    companyName: "",
    companyCity: "",
    createdDate: new Date(),
  });
  const [vacanciesList, setVacanciesList] = useState<Vacancy[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewVacancy((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmploymentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVacancy((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMinimumExperienceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVacancy((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vacanciesList.some((vacancy) => vacancy.id === newVacancy.id)) {
      return;
    }
    const newVacancyWithDate: Vacancy = {
      ...newVacancy,
      createdDate: new Date(),
    };
    const updatedVacancies = [...vacanciesList, newVacancyWithDate];
    localStorage.setItem("vacanciesList", JSON.stringify(updatedVacancies));
    setVacanciesList(updatedVacancies);
    router.push({
      pathname: "/",
      query: { newVacancy: JSON.stringify(newVacancyWithDate) },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>ID 1C:</label>
          <input
            type="text"
            name="id"
            value={newVacancy.id}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Appointment:</label>
          <input
            type="text"
            name="appointment"
            value={newVacancy.appointment}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Skills:</label>
          <textarea
            name="skills"
            value={newVacancy.skills}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Salary:</label>
          <input
            type="text"
            name="salary"
            value={newVacancy.salary}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Conditions:</label>
          <textarea
            name="conditions"
            value={newVacancy.conditions}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Responsibilities:</label>
          <textarea
            name="responsibilities"
            value={newVacancy.responsibilities}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Type of employment:</label>
          <select
            name="employmentType"
            value={newVacancy.employmentType}
            onChange={handleEmploymentTypeChange}
            className={styles.input}
          >
            <option value="Full">Full</option>
            <option value="Temporary">Temporary</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
        <div className={styles.inputWrapper}>
          <label>Minimum work experience:</label>
          <select
            name="minimumExperience"
            value={newVacancy.minimumExperience}
            onChange={handleMinimumExperienceChange}
            className={styles.input}
          >
            <option value="Any">Any</option>
            <option value="Internship">Internship</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={newVacancy.companyName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel}>Company City:</label>
          <input
            type="text"
            name="companyCity"
            value={newVacancy.companyCity}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.createButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminCreateVacancy;
