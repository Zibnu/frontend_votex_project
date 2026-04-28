import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";

function DeleteAllUser({isOpen, onClose, onDelete}) {
        useEffect(() => {
        if(isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen])
    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8}}
            animate={{scale : 1}}
            className="bg-white p-6 rounded-xl w-[420px] text-center relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer hover:scale-105 transition">
                    <FaRegWindowClose size={18}/>
                </button>

                <h2 className="text-xl font-bold mb-8">Remove All User?</h2>

                <p className="text-sm text-[#212121] font-semibold mb-8">
                    This Will delete all users permanently.
                </p>

                <div className="flex gap-3">
                    <button 
                    onClick={onClose}
                    className="flex-1 bg-gray-200 py-2 rounded hover:scale-105 hover:bg-gray-300 transition cursor-pointer">
                        Cancel
                    </button>

                    <button 
                    onClick={onDelete}
                    className="flex-1 bg-red-500 text-white hover:scale-105 hover:bg-red-600 transition py-2 rounded cursor-pointer">
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default DeleteAllUser