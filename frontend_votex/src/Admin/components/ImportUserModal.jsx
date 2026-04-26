import React from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";
import imageFieldData from "../../assets/image/image 7.jpg";

function ImportUserModal({isOpen, onClose, onNext}) {
    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8}}
            animate={{scale : 1}}
            className="bg-white p-6 rounded-xl w-150 text-center relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer">
                    <FaRegWindowClose/>
                </button>

                <h2 className="text-xl font-bold mb-4">
                    Important Before Import Data User
                </h2>

                <p className="text-base font-semibold text-[#37474F] mb-3">The Excel File data must be containt the following :</p>

                <img 
                src={imageFieldData}
                alt="Contoh Colomn Data Excel where import data user"
                className="mx-auto mb-4" />

                <p className="text-red-500 text-lg mb-4">
                    Note : After Upload, file with password will be downloaded
                </p>

                <button 
                onClick={onNext}
                className="bg-yellow-400 px-4 py-2 rounded cursor-pointer">
                    Next
                </button>
            </motion.div>
        </div>
    )
}

export default ImportUserModal