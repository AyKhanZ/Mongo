import React, { useEffect, useState } from "react";
import styles from "./UserManagment.module.css";
import Users from "@/icons/Users";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import CreateBtn from "@/components/CreateBtn/CreateBtn";
import Table from "@/components/Table/Table";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/router";
import {ClientWrapper} from "@/types";

const UserManagement: React.FC = () => {
  const router = useRouter();
  const [clients, setClients] = useState<ClientWrapper[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalClientsCount, setTotalClientsCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeStates, setActiveStates] = useState<{ [id: number]: boolean }>({});

  const fetchClients = async () => {
    try {
      if(searchText == ""){
        const response = await fetch(
            `https://localhost:7164/GetClients?Page=${currentPage}&PageSize=${pageSize}`
        );
        const data = await response.json();
        setClients(data.users);
        setTotalClientsCount(data.totalClientsCount);
      }
      else{
        const encodedSearchText = encodeURIComponent(searchText.trim());
        const filterQuery = encodedSearchText ? `&orFilter=userName%40%3D${encodedSearchText}%7Cemail%40%3D${encodedSearchText}%7ClastName%40%3D${encodedSearchText}` : '';
        const response = await fetch(
            `https://localhost:7164/GetClients?${filterQuery}`
        );
        const data = await response.json();
        setClients(data.users);
        setTotalClientsCount(data.totalClientsCount);
      }

    } catch (error: any) {
      console.error(error);
    }
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients();
    }, 100); // Задержка в 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, currentPage, pageSize,activeStates]);


  useEffect(() => {
    if (searchText !== "") setCurrentPage(1);
  }, [searchText]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentClients = clients.slice(indexOfFirstUser, indexOfLastUser);

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
      </div>
      <div className={styles.secondSection}>
        <div className={styles.firstLevel}>
          <div className={styles.leftPart}>
            <div className={styles.searchPart}>
              <h4 className={styles.subText}>Quick search a user</h4>
              <div className={styles.searchContainer}>
                <input
                  type="text" placeholder="Search..."
                  value={searchText}
                  onChange={(ev) => setSearchText(ev.target.value)}
                  className={styles.input}
                />
                <FaSearch
                  width={1} color="grey"
                  className={styles.searchIcon}
                />
              </div>
            </div>
          </div>
          <div>
            <CreateBtn title={"Create"} symbol={"+"}
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
                      <Table clients={clients} activeStates={activeStates} setActiveStates={setActiveStates} />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalClientsCount / pageSize)}
                      paginate={paginate}
                    />
                  </>
                  :
                  <>
                    <div className={styles.tableContainer}>
                      <Table clients={currentClients} activeStates={activeStates} setActiveStates={setActiveStates} />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(clients.length / pageSize)}
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