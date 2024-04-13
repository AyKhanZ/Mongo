import React from 'react';
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";
import UserManagement from "@/components/UserManagment/UserManagment";

const ManageUsersPage: React.FC = () => {
    return (
        <SideBarLayout>
            <UserManagement />
        </SideBarLayout>
    );
};

export default ManageUsersPage;