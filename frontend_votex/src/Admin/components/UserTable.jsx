import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

function UserTable({users, currentPage, limit }) {
    return (
        <div className='bg-white p-4 rounded-xl shadow'>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-black font-bold border-b">
                            <th className='py-2'>No</th>
                            <th>NISN</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr 
                            key={user.id_user}
                            className="border-b hover:bg-gray-100 transition">
                                <td className="py-3">
                                    {(currentPage - 1) * limit + (index + 1)}
                                </td>

                                <td>{user.nisn}</td>
                                <td>{user.username}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span 
                                        className={`w-3 h-3 rounded-full ${
                                            user.has_voted ? "bg-green-500" : "bg-red-500"
                                        }`}></span>

                                        <span className="text-sm text-gray-600">
                                            {user.has_voted ? "Have Chosen" : "Haven't Chosen Yet"}
                                        </span>
                                    </div>
                                </td>

                                <td className="flex gap-2">
                                    <button 
                                    onClick={() => toast.success("Edit Clicked")}
                                    className="p-2 rounded-lg hover:scale-105 bg-[#E3F2FD] transition">
                                        <FaPencilAlt/>
                                    </button>

                                    <button 
                                    onClick={() => toast.success("Delete Clicked")}
                                    className="p-2 rounded-lg hover:scale-105 bg-[#FF2444] transition">
                                        <FaRegTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTable