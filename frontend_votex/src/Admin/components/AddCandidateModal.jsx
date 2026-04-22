import React, { useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { MdDriveFolderUpload } from "react-icons/md";

function AddCandidateModal({onClose, onSuccess}) {
    const [form, setForm] = useState({
        ketua_name : "",
        wakil_name : "",
        visi : "",
        misi : "",
        image : null
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];

        if(!allowedTypes.includes(file.type)) {
            toast.error("Format File Hanya Mendukung JPG, JPEG dan PNG");
            e.target.value = null; //for reset input image
            return
        };

        if(file.size > 5 * 1024 * 1024) {
            toast.error("Size File Max 5 Mb")
            return;
        };

        setForm({...form, image : file});
    }

    const handleSubmit = async () => {
        // e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("ketua_name", form.ketua_name);
            formData.append("wakil_name", form.wakil_name);
            formData.append("visi", form.visi);
            formData.append("misi", form.misi);
            formData.append("image", form.image);

            await apiServices.post("/candidate/create_candidate", formData, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("Add Candidate Success");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Post Candidat");
        }
    };
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            className="bg-white p-6 rounded-xl w-100 relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3">
                    <FaRegWindowClose size={22}/>
                </button>

                <h2 className="text-xl font-bold text-center mb-4">Add New Candidate</h2>

                <div className="space-y-3">
                    <input 
                    type="text" 
                    className="w-full p-2 bg-gray-100 rounded" 
                    onChange={handleChange}
                    placeholder='Name Ketua'
                    name="ketua_name"
                    />

                    <input 
                    type="text" 
                    className="w-full p-2 bg-gray-100 rounded" 
                    onChange={handleChange}
                    placeholder='Wakil Name'
                    name="wakil_name"
                    />

                    <label className="w-full mb-6 flex items-center gap-3 p-4 cursor-pointer rounded-lg ">
                        <MdDriveFolderUpload/>
                        <span>
                            Image Candidate <span className="text-red-500 text-xs">(JPG/PNG/JPEG Max 5 Mb)</span>
                        </span>
                        <input 
                        type="file"
                        onChange={handleImage} 
                        className='w-full p-2 bg-gray-100 rounded'
                        />
                    </label>

                    <textarea 
                    className="w-full p-2 bg-gray-100 rounded" 
                    onChange={handleChange}
                    placeholder='Vision'
                    name="visi"
                    />

                    <textarea 
                    className="w-full p-2 bg-gray-100 rounded" 
                    onChange={handleChange}
                    placeholder='Mision'
                    name="misi"
                    />
                </div>

                <button 
                onClick={handleSubmit}
                className="mt-4 w-full py-2 bg-yellow-300 rounded font-semibold">
                    Save Candidate
                </button>
            </motion.div>
        </div>
    )
}

export default AddCandidateModal