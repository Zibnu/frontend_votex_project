import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";

function ResetVotingModal({isOpen, onClose, onReset}) {
    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
            <motion.div
            initial={{scale : 0.8, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            className="bg-white rounded-2xl p-6 w-[400px] relative">
                <button 
                onClick={onClose}
                className="absolute right-3 top-3 p-1 hover:scale-105 transition cursor-pointer">
                    <FaRegWindowClose size={18}/>
                </button>

                <h2 className="text-xl font-bold text-center mb-3">
                    Reset Data Voted
                </h2>

                <p className="text-center text-[#212121] text-sm mb-6">
                    Are you sure want to reset all data voted? this action cannot be undone and their data will be permanently remove from the system
                </p>

                <div className="flex justify-between gap-3">
                    <button 
                    onClick={onClose}
                    className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-105 transition cursor-pointer">
                        Cancel
                    </button>

                    <button 
                    onClick={onReset}
                    className="w-full py-2 bg-[#EF4444] text-[#F5F7F5] rounded-lg hover:bg-[#c72f2f] hover:scale-105 transition cursor-pointer">
                        Reset
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default ResetVotingModal