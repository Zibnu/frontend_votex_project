import React from 'react'
import UserTable from '../components/UserTable'
import toast from 'react-hot-toast'
import apiServices from "../../utils/api"
import { useState } from 'react'
import { useEffect } from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import DeleteAllUser from '../components/DeleteAllUser'
import EditUserModal from '../components/EditUserModal'
import DeleteUserModal from '../components/DeleteUserModal'
import ImportUserModal from '../components/ImportUserModal'
import { useRef } from 'react'
import { RingLoader } from "react-spinners";

function ManageUserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage : 1,
        totalPages : 1,
        limit : 7,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const fileInputRef = useRef(null);
    const [importLoading, setImportLoading] = useState(false);

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

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleImportClick = () => {
        setShowImport(true);
    };

    const handleNextImport = () => {
        setShowImport(false);
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setImportLoading(true);

            const token = localStorage.getItem("token");
            const res = await apiServices.post("/users/import", formData, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
                responseType : "blob",
            });

            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement("a");

            const contentDisposition = res.headers["content-disposition"];
            let fileName = "import-result.xlsx";

            if(contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if(match) fileName = match[1];
            };

            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Import Success & File Downloaded");
            e.target.value = null;
            fetchUser();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Import User Data");
        } finally {
            setImportLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await apiServices.get("/users/export", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
                responseType : "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Export Success");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Export Data User");
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };
    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const handleSubmitEdit = async (form) => {
        try {
            const token = localStorage.getItem("token");

            await apiServices.patch(`/users/user/${selectedUser.id_user}`, form, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("User Updated");
            fetchUser();
            setShowEdit(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Update User");
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await apiServices.delete(`/users/user/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("User Deleted");
            fetchUser();
            setShowDelete(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Delete User");
        }
    }

    const handleDeleteAll = async () => {
        try {
            const token = localStorage.getItem("token");
            await apiServices.delete("/users/delete_all", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("Delete All User Success");
            fetchUser();
            setShowDeleteAll(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Delete All User");
        }
    }

    if (loading) return <div className="flex items-center justify-center h-screen text-gray-600">Loading....</div>
    return (
        <div className='p-6 space-y-6'>
            {importLoading && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-9999">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                        <RingLoader size={50} color='#107065'/>

                        <p className="text-sm text-gray-600 text-center">
                            Importing data, please wait.... <br />
                            This may take a few seconds
                        </p>
                    </div>
                </div>
            )}
                    <input 
                    type="file"
                    accept='.xlsx, .xls'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                    />
            <div className="bg-white p-4 py-8 rounded-xl shadow flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Users</h2>

                <div className="flex gap-2">
                    <button
                    onClick={handleExport}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:opacity-90 cursor-pointer transition">
                        Export Excel
                    </button>

                    <button 
                    onClick={handleImportClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 cursor-pointer transition">
                        Import Data
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <input 
                type="text" 
                className="border px-4 py-2 rounded-lg w-1/3" 
                placeholder='Search by Name or NISN'
                value={search}
                onChange={handleSearchInput}
                />

                <button 
                onClick={() => setShowDeleteAll(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 cursor-pointer">
                    Delete All
                </button>
            </div>

            <UserTable
            users={users}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />

            <div className="flex justify-center items-center gap-4">
                <button 
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                    <MdNavigateBefore/>
                </button>

                <span className="text-sm">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button 
                disabled={page === pagination.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                    <MdNavigateNext/>
                </button>
            </div>

            <EditUserModal
            isOpen={showEdit}
            user={selectedUser}
            onClose={() => setShowEdit(false)}
            onSubmit={handleSubmitEdit}
            />

            <DeleteUserModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            user={selectedUser}
            onDelete={handleDeleteUser}
            />

            <DeleteAllUser
            isOpen={showDeleteAll}
            onClose={() => setShowDeleteAll(false)}
            onDelete={handleDeleteAll}
            />

            <ImportUserModal
            isOpen={showImport}
            onClose={() => setShowImport(false)}
            onNext={handleNextImport}
            />
        </div>
    )
}

export default ManageUserPage