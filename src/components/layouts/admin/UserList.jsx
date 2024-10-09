import React, { useEffect, useState } from "react";
import CommonTable from "../../common/CommonTable";
import { FetchUser, UpdateUserStatus } from "../../../services/admin/FetchUser";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchUser = await FetchUser();
                setUsers(fetchUser);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        loadUser();
    }, []);

    const handleBlockUser = async (user) => {
        try {
            const updatedUser = {
                userId: user._id, // Pass the user ID for the update
                isEnabled:!user.isEnabled
            };
            const response = await UpdateUserStatus(updatedUser);           
                setUsers(users.map((item) =>
                    item._id === user._id ? { ...item, isEnabled: updatedUser.isEnabled } : item
                ));
        } catch (error) {
            console.log('Error blocking/unblocking user:', error);
        }
    };

    const userColumns = [
        { id: 'userName', label: 'User Name' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
        { id: 'action', label: 'Actions', align: 'center' },
    ];

    return (
        <div>
            <CommonTable columns={userColumns} rows={users} onAllowClick={handleBlockUser} />
        </div>
    );
}
