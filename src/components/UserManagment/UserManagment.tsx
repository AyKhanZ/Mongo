import React, { useEffect, useState } from "react";
import styles from "./UserManagment.module.css";
import Users from "@/icons/Users";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import Table from "@/components/Table/Table";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/router";
import {Console} from "inspector";

const UserManagement: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalUsersCount, setTotalUsersCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState(
    `https://localhost:7164/GetUsers?Page=1&PageSize=${pageSize}`
  );

  const [selectedOption, setSelectedOption] = useState("");

  const filtersList = [
    { value: "A", label: "Option A" },
    { value: "B", label: "Option B" },
    { value: "C", label: "Option C" },
    { value: "D", label: "Option D" },
  ];

  const fetchUsers = async () => {
    try {
      if(searchText == ""){
        const response = await fetch(
            `https://localhost:7164/GetUsers?Page=${currentPage}&PageSize=${pageSize}`
        );
        const data = await response.json();
        setUsers(data.users);
        setTotalUsersCount(data.totalUsersCount);
      }
      else{
        const encodedSearchText = encodeURIComponent(searchText.trim());
        // Предполагаем, что ваш API поддерживает фильтрацию по нескольким полям через разделитель |
        const filterQuery = encodedSearchText ? `&orFilter=userName%40%3D${encodedSearchText}%7Cemail%40%3D${encodedSearchText}%7ClastName%40%3D${encodedSearchText}` : '';
        const response = await fetch(
            `https://localhost:7164/GetUsers?${filterQuery}`
        );
        const data = await response.json();
        setUsers(data.users);
        setTotalUsersCount(data.totalUsersCount);
      }

    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 100); // Задержка в 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, currentPage, pageSize]);

  useEffect(() => {
    if (searchText !== "") setCurrentPage(1);
  }, [searchText]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const handleInputChange = () => {};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstSection}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <Users />
            <h3 className={styles.titleText}>All Users</h3>
          </div>
          <h4 className={styles.subText}>View, search for and add new user</h4>
        </div>
        <div className={styles.account}>
          <div className={styles.imgContainer}>
            <Image
              src="/account-icon.svg"
              alt="image"
              width={40}
              height={40}
              layout="fixed"
              objectFit="cover"
              objectPosition="center"
              className={styles.img}
            />
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.name}>Medina Abasova</h4>
          </div>
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.firstLevel}>
          <div className={styles.leftPart}>
            <div className={styles.searchPart}>
              <h4 className={styles.subText}>Quick search a user</h4>
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
              <h4 className={styles.subText}>Filter users</h4>

              <div>
                <select
                  value={selectedOption}
                  // onChange={handleSelectChange}
                  className={styles.filterBtn}
                >
                  <option className={styles.subText} value="">
                    All users
                  </option>
                  {/* {filtersList.map((filter) => (
                    <option
                      className={styles.subText}
                      key={filter.value}
                      value={filter.value}
                    >
                      {filter.label}
                    </option>
                  ))} */}
                </select>
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
              {searchText == "" ?
                  <>
                    <div className={styles.tableContainer}>
                      <Table users={users} />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalUsersCount / pageSize)}
                      paginate={paginate}
                    />
                  </>
                  :
                  <>
                    <div className={styles.tableContainer}>
                      <Table users={currentUsers} />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(users.length / pageSize)}
                        paginate={paginate}/>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserManagement;
