import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import { FaRegWindowClose } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";

function EditCandidateModal({onClose, onSuccess, candidate}) {
    const [form, setForm] = useState({
        ketua_name : candidate.ketua_name || "",
        wakil_name : candidate.wakil_name || "",
        visi : candidate.visi || "",
        misi : candidate.misi || "",
        image : null,
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
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
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("ketua_name", form.ketua_name);
            formData.append("wakil_name", form.wakil_name);
            formData.append("visi", form.visi);
            formData.append("misi", form.misi);

            if(form.image) {
                formData.append("image", form.image);
            }

            await apiServices.patch(`/candidate/candidate/${candidate.id_candidate}`, formData, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            toast.success("Edit Candidate Success");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Update Candidate");
        };
    }

    return (
    <AnimatePresence>
        <div className='fixed inset-0 bg-black/45 backdrop-blur-sm p-4 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.85, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            exit={{scale : 0.85, opacity : 0}}
            transition={{type : "spring", stiffness : 300, damping : 25}}
            className="bg-white p-6 rounded-xl w-100 relative overflow-y-auto">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer hover:scale-105 transition">
                    <FaRegWindowClose size={22}/>
                </button>

                <h2 className="text-xl font-bold text-center mb-4">
                    Edit Candidate
                </h2>

                <div className="space-y-3">
                    <input 
                    name='ketua_name'
                    type="text"
                    className="w-full p-2 bg-gray-100 rounded"
                    onChange={handleChange}
                    value={form.ketua_name}
                    />

                    <input 
                    name='wakil_name'
                    type="text" 
                    className="w-full p-2 bg-gray-100 rounded"
                    onChange={handleChange}
                    value={form.wakil_name}
                    />

                    <input 
                    type="file"
                    accept=".jpg,.jpeg,.png, image/jpeg, image/png"
                    onChange={handleImage} 
                    className='w-full p-2 bg-gray-100 rounded'
                    title='Upload New Image Candidat, Max Size 5Mb'
                    />

                    <textarea
                    name="visi"
                    value={form.visi}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-100 rounded"
                    rows={2}
                    />

                    <textarea
                    name="misi"
                    value={form.misi}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-100 rounded"
                    rows={4}
                    />

                    <button 
                    onClick={handleSubmit}
                    className="mt-4 w-full py-2 bg-yellow-400 text-[#1A3C28] hover:scale-105 hover:bg-yellow-500 transition duration-150 rounded font-semibold cursor-pointer">
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </div>
    </AnimatePresence>
    )
}

export default EditCandidateModal