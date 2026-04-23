import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan, FaPlus } from "react-icons/fa6";

function CandidateTable({data, onEdit, onDelete}) {
    return (
        <div className='bg-white p-4 rounded-xl shadow'>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-black font-bold text-lg border-b">
                            <th className="py-2">No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Vision and Mision</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id_candidate} className='border-b hover:bg-gray-100 transition'>
                                <td className="py-3">{index + 1}</td>
                                <td>
                                    <img 
                                        src={item.image}
                                        alt="Image Candidate"
                                        className="w-10 h-10 rounded-xl object-cover"
                                    />
                                </td>
                                <td>
                                    {item.ketua_name} & {item.wakil_name}
                                </td>
                                <td className="max-w-xs text-sm text-gray-600">
                                    {item.visi} - {item.misi}
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 rounded-lg transition hover:scale-105 cursor-pointer"
                                    style={{ backgroundColor : "#E3F2FD"}}
                                    >
                                        <FaPencilAlt/>
                                    </button>

                                    <button 
                                    onClick={() => onDelete(item)}
                                    className="p-2 rounded-lg transition hover:scale-105 cursor-pointer"
                                    style={{ backgroundColor : "#FFEBEE"}}
                                    >
                                        <FaRegTrashCan color='#F48CA3'/>
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

export default CandidateTable