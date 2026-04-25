import React from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";

function DeleteAllUser({isOpen, onClose, onDelete}) {
    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8}}
            animate={{scale : 1}}
            className="bg-white p-6 rounded-xl w-[420px] text-center relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3">
                    <FaRegWindowClose/>
                </button>

                <h2 className="text-xl font-bold mb-4">Remove All User?</h2>

                <p className="text-sm text-gray-600 mb-6">
                    This Will delete all users permanently.
                </p>

                <div className="flex gap-3">
                    <button 
                    onClick={onClose}
                    className="flex-1 bg-gray-200 py-2 rounded">
                        Cancel
                    </button>

                    <button 
                    onClick={onDelete}
                    className="flex-1 bg-red-500 text-white py-2 rounded">
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default DeleteAllUser