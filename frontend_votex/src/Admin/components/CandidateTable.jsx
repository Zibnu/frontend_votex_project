import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan, FaPlus } from "react-icons/fa6";

function CandidateTable({data, onEdit, onDelete}) {
    return (
        <div className='bg-white p-4 rounded-xl shadow'>
            <div className="overflow-x-auto">
                <table className="w-full text-left" style={{tableLayout : "fixed"}}>
                    <colgroup>
                        <col style={{ width : "48px"}}/>
                        <col style={{ width : "64px"}}/>
                        <col style={{ width : "220x"}}/>
                        <col />
                        <col style={{ width : "96px"}}/>
                    </colgroup>

                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]">No</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>Image</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>Name</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121]'>Vision and Mision</th>
                            <th className='px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#212121] text-center'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id_candidate} className='border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150'>
                                <td className="px-4 py-3 text-xs font-medium text-[#212121]">{String(index + 1).padStart( 2,"0")}</td>
                                <td className='px-4 py-3'>
                                    <img 
                                        src={item.image}
                                        alt="Image Candidate"
                                        className="w-9 h-9 rounded-lg object-cover border border-gray-100"
                                    />
                                </td>
                                <td className='px-4 py-3'>
                                    <span className="text-sm font-medium text-gray-800 leading-tight">
                                        {item.ketua_name} &amp; {item.wakil_name}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#1A3C28] mb-1">Visi</p>
                                    <p className="text-xs text-[#37474F] leading-relaxed line-clamp-2">
                                        {item.visi}
                                    </p>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#1A3C28] mb-1">Misi</p>
                                    <p className="text-xs text-[#37474F] leading-relaxed line-clamp-2">
                                        {item.misi}
                                    </p>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <button 
                                        onClick={() => onEdit(item)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-all duration-150 hover:scale-105 cursor-pointer"
                                        title='Edit'
                                        >
                                            <FaPencilAlt size={12} color='#185FA5'/>
                                        </button>

                                        <button 
                                        onClick={() => onDelete(item)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 transition-all duration-150 hover:scale-105 cursor-pointer"
                                        title='Delete'
                                        >
                                            <FaRegTrashCan size={12} color='#A32D2D'/>
                                        </button>
                                    </div>
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