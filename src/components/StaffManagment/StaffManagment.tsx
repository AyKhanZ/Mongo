import React, { useEffect, useState } from "react";
import styles from "./StaffManagment.module.css";
import { FaSearch } from "react-icons/fa";
import TableStaff from "@/components/TableStaff/TableStaff";
import Pagination from "@/components/Pagination/Pagination";
import { employer } from "@/types";
import { positionsList } from "../../../lib/data";
import StaffIcon from "@/icons/Staff";

const StaffManagment: React.FC = () => {
  const [staff, setStaff] = useState<employer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalStaffCount, setTotalStaffCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [positionEdited, setPositionEdited] = useState("");
  const [selectedOption, setSelectedOption] = useState("All staff");
  const [activeStates, setActiveStates] = useState<{ [id: number]: boolean }>(
    {}
  );

  const fetchStaff = async () => {
    try {
      let response;
      if (searchText == "" && selectedOption == "All staff") {
        response = await fetch(
          `https://localhost:7164/Employer/GetStaff?Page=${currentPage}&PageSize=${pageSize}`
        );
      } else if (searchText == "" && selectedOption != "All staff") {
        response = await fetch(
          `https://localhost:7164/Employer/GetStaff?onFilter=${selectedOption}`
        );
      } else if (searchText != "" && selectedOption != "All staff") {
        const encodedSearchText = encodeURIComponent(searchText.trim());
        const filterQuery = encodedSearchText
          ? `&onSearch=userName%40%3D${encodedSearchText}%7Cemail%40%3D${encodedSearchText}%7ClastName%40%3D${encodedSearchText}`
          : "";

        response = await fetch(
          `https://localhost:7164/Employer/GetStaff?${filterQuery}&onFilter=${selectedOption}`
        );
      } else if (searchText != "" && selectedOption == "All staff") {
        const encodedSearchText = encodeURIComponent(searchText.trim());
        const filterQuery = encodedSearchText
          ? `&onSearch=userName%40%3D${encodedSearchText}%7Cemail%40%3D${encodedSearchText}%7ClastName%40%3D${encodedSearchText}`
          : "";

        response = await fetch(
          `https://localhost:7164/Employer/GetStaff?${filterQuery}`
        );
      }
      if (response) {
        const data = await response.json();

        setStaff(data.users);
        setTotalStaffCount(data.totalStaffCount);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStaff();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [
    searchText,
    currentPage,
    pageSize,
    activeStates,
    selectedOption,
    positionEdited,
  ]);

  useEffect(() => {
    if (searchText !== "") setCurrentPage(1);
  }, [searchText, selectedOption]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastStaff = currentPage * pageSize;
  const indexOfFirstStaff = indexOfLastStaff - pageSize;
  const currentStaffs = staff.slice(indexOfFirstStaff, indexOfLastStaff);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstSection}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <StaffIcon size={30} color={"#3071f1"} />
            <h3 className={styles.titleText}>All Staff</h3>
          </div>
          <h4 className={styles.subText}>
            View, search for, filter and add new staff
          </h4>
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.firstLevel}>
          <div className={styles.leftPart}>
            <div className={styles.searchPart}>
              <h4 className={styles.subText}>Quick search a staff</h4>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(ev) => setSearchText(ev.target.value)}
                  className={styles.input}
                />
                <FaSearch
                  width={1}
                  color="grey"
                  className={styles.searchIcon}
                />
              </div>
            </div>
            <div className={styles.searchPart}>
              <h4 className={styles.subText}>Filter staff</h4>

              <select
                onChange={handleSelectChange}
                value={selectedOption}
                className={styles.filterBtn}
              >
                {positionsList.map((filter) => (
                  <option
                    className={styles.subText}
                    key={filter.value}
                    value={filter.value}
                  >
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.secondLevel}>
          <div className={styles.listContainer}>
            {staff.length > 0 ? (
              <div className={styles.table}>
                {searchText == "" && selectedOption == "All staff" ? (
                  <>
                    <div className={styles.tableContainer}>
                      <TableStaff
                        positionEdited={positionEdited}
                        setPositionEdited={setPositionEdited}
                        staff={staff}
                        activeStates={activeStates}
                        setActiveStates={setActiveStates}
                      />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalStaffCount / pageSize)}
                      paginate={paginate}
                    />
                  </>
                ) : (
                  <>
                    <div className={styles.tableContainer}>
                      <TableStaff
                        positionEdited={positionEdited}
                        setPositionEdited={setPositionEdited}
                        staff={currentStaffs}
                        activeStates={activeStates}
                        setActiveStates={setActiveStates}
                      />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(staff.length / pageSize)}
                      paginate={paginate}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className={styles.containerNone}>
                <p className={styles.noProductsText}>No staff yet ƪ(˘⌣˘)ʃ</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffManagment;
