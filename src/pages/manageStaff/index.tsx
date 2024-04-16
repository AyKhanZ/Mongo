import React, {useState} from 'react';
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import StaffManagment from "@/components/StaffManagment/StaffManagment";

const ManageUsersPage: React.FC = () => {
    return (
        <SideBarLayout>
            <StaffManagment />
        </SideBarLayout>
    );
};

export default ManageUsersPage;