import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

function UserTable({users, currentPage, itemsPerPage , onEdit, onDelete}) {
    return (
        <div className='bg-white p-4 rounded-xl shadow'>
            <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ tableLayout : "fixed"}}>
                    {/* <colgroup>
                        <col style={{ width : "48px"}}/>
                        <col style={{ width : "64px"}}/>
                        <col style={{ width : ""}}/>
                        <col style={{width : "64px"}} />
                        <col style={{ width : "96px"}}/>
                    </colgroup> */}

                    <thead>
                        <tr className="bg-gray-200 border-b border-gray-100">
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>No</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>NISN</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>Name</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>Status</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121] text-center'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr 
                                key={user.id_user}
                                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-4 py-3 text-xs font-medium text-[#212121]">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
    
                                    <td className='py-4 px-3'>
                                        <span className="text-sm font-medium text-gray-800 leading-tight">
                                            {user.nisn}
                                        </span>
                                    </td>
                                    <td className='py-4 px-3'>
                                        <span className="text-sm font-medium text-gray-800 leading-tight">
                                        {user.username}
                                        </span>
                                    </td>
                                    <td className='py-4 px-3'>
                                        <div className="flex items-center gap-2">
                                            <span 
                                            className={`w-3 h-3 rounded-full ${
                                                user.has_voted ? "bg-green-500" : "bg-red-500"
                                            }`}></span>
    
                                            <span className="text-sm font-medium text-gray-800 leading-tight">
                                                {user.has_voted ? "Have Chosen" : "Haven't Chosen Yet"}
                                            </span>
                                        </div>
                                    </td>
    
                                    <td className="py-4 px-3">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                            onClick={() => onEdit(user)}
                                            title='Edit'
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 hover:scale-105 cursor-pointer">
                                                <FaPencilAlt size={12} color='#185FA5'/>
                                            </button>
    
                                            <button 
                                            onClick={() => onDelete(user)}
                                            title='Delete'
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 transition-all duration-150 hover:scale-105 cursor-pointer">
                                                <FaRegTrashCan size={12} color='#A32D2D'/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td 
                                colSpan={5}
                                className="text-center text-gray-500 p-4">
                                    Please add a new user to pupulate this table
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTable