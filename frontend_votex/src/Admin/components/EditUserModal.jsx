import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";

function EditUserModal({isOpen, onClose, user, onSubmit}) {
    const [form, setForm] = useState({
        nisn : "",
        username : "",
    });

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

    useEffect(() => {
        if(user) {
            setForm({
                nisn : user.nisn,
                username : user.username,
            });
        }
    }, [user]);

    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            className="bg-white p-6 rounded-xl w-[400px] relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3 cursor-pointer hover:scale-105 transition">
                    <FaRegWindowClose size={20}/>
                </button>

                <h2 className="text-xl font-bold text-center mb-4 ">Edit User</h2>

                <input 
                type="text" 
                value={form.nisn}
                onChange={(e) => setForm({...form, nisn : e.target.value})}
                className="w-full p-2 px-3.5 mb-4 bg-gray-100 outline-black/40 rounded" 
                />

                <input 
                type="text" 
                value={form.username}
                onChange={(e) => setForm({...form, username : e.target.value})}
                className="w-full p-2 px-3.5 mb-4 bg-gray-100 outline-black/40 rounded" 
                />

                <button 
                onClick={() => onSubmit(form)}
                className="w-full bg-[#FFC107] text-[#1A3C28] hover:scale-105 hover:bg-yellow-500 transition py-2 rounded font-semibold cursor-pointer mt-5">
                    Save Changes
                </button>
            </motion.div>
        </div>
    )
}

export default EditUserModal