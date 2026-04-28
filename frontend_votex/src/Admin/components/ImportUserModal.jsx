import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";
import imageFieldData from "../../assets/image/image 7.jpg";

function ImportUserModal({ isOpen, onClose, onNext }) {
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

    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white p-6 rounded-xl w-130 text-center relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 hover:scale-125 transition cursor-pointer">
                    <FaRegWindowClose />
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">
                    Important Before Import Data User
                </h2>

                <p className="text-sm font-semibold text-[#37474F] mb-3">The Excel File data must be containt the following :</p>

                <div className="flex items-start gap-4 mb-6">
                    <img
                        src={imageFieldData}
                        alt="Contoh Colomn Data Excel where import data user"
                        className="w-55 flex-shrink-0 rounded border border-gray-200" />

                    <p className="text-sm text-red-500 leading-relaxed pt-20 font-medium">
                        Note : After Upload, file with password will be downloaded
                    </p>
                </div>

                <button
                    onClick={onNext}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 hover:scale-105 transition text-[#1A3C28] py-2 rounded cursor-pointer">
                    Next
                </button>
            </motion.div>
        </div>
    )
}

export default ImportUserModal