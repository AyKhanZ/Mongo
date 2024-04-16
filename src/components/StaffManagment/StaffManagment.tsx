import React, { useEffect, useState } from "react";
import styles from "./StaffManagment.module.css";
import Users from "@/icons/Users";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import TableStaff from "@/components/TableStaff/TableStaff";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/router";
import { employer } from "@/types";
import Staff from "@/icons/Staff";
import StaffIcon from "@/icons/Staff";

const StaffManagment: React.FC = () => {
  const router = useRouter();
  const [staff, setStaff] = useState<employer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalStaffCount, setTotalStaffCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [activeStates, setActiveStates] = useState<{ [id: number]: boolean }>(
    {}
  );

  const fetchStaff = async () => {
    try {
      if (searchText == "") {
        const response = await fetch(
          `https://localhost:7164/GetStaff?Page=${currentPage}&PageSize=${pageSize}`
        );
        const data = await response.json();

        setStaff(data.users);
        setTotalStaffCount(data.totalStaffCount);
      } else {
        const encodedSearchText = encodeURIComponent(searchText.trim());
        const filterQuery = encodedSearchText
          ? `&orFilter=userName%40%3D${encodedSearchText}%7Cemail%40%3D${encodedSearchText}%7ClastName%40%3D${encodedSearchText}`
          : "";
        const response = await fetch(
          `https://localhost:7164/GetStaff?${filterQuery}`
        );
        const data = await response.json();

        setStaff(data.users);
        setTotalStaffCount(data.totalStaffCount);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStaff();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, currentPage, pageSize, activeStates]);

  useEffect(() => {
    if (searchText !== "") setCurrentPage(1);
  }, [searchText]);

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
          </div>
          <div>
            <CreateBtn
              title={"Create"}
              symbol={"+"}
              onClick={() => router.push("/registerUser")}
            />
          </div>
        </div>
        <div className={styles.secondLevel}>
          <div className={styles.listContainer}>
            <div className={styles.table}>
              {searchText == "" ? (
                <>
                  <div className={styles.tableContainer}>
                    <TableStaff
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffManagment;
