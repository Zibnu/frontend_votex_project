import React from 'react'
import UserTable from '../components/UserTable'
import toast from 'react-hot-toast'
import apiServices from "../../utils/api"
import { useState } from 'react'
import { useEffect } from 'react'

function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage : 1,
        totalPages : 1,
        limit : 7,
    });

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await apiServices.get(`/users/users_data?page=${page}&search=${search}`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            setUsers(res.data.data.users);
            setPagination(res.data.data.pagination)
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Fetch Data User");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [page, search]);

    if (loading) return <div className="flex items-center justify-center h-screen text-gray-600">Loading....</div>
    return (
        <div>UserPage</div>
    )
}

export default UserPage