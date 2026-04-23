import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function DeleteCandidateModal({onClose, candidate, onSuccess}) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            await apiServices.delete(`/candidate/candidate/${candidate.id_candidate}`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("Delete Candidate Success");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Delete Candidate Failed");
        }
    }
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8}}
            animate={{scale : 1}}
            className="bg-white p-6 rounded-xl w-100 relative text-center">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer">
                    <FaRegWindowClose size={22}/>
                </button>

                <h2 className="text-xl font-bold mb-3">
                    Remove Candidate?
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Are you sure want to delete <strong>{candidate.ketua_name}</strong>?
                    This action cannot be undone.
                </p>

                <div className="flex gap-3">
                    <button 
                    onClick={onClose}
                    className="flex-1 py-2 bg-gray-200 rounded cursor-pointer">
                        Cancel
                    </button>

                    <button 
                    onClick={handleDelete}
                    className="flex-1 py-2 bg-red-500 text-white rounded cursor-pointer">
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default DeleteCandidateModal