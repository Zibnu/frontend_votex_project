import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";

function EditUserModal({isOpen, onClose, user, onSubmit}) {
    const [form, setForm] = useState({
        nisn : "",
        username : "",
    });

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
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            className="bg-white p-6 rounded-xl w-[400px] relative">
                <button 
                onClick={onClose}
                className="absolute top-3 right-3">
                    <FaRegWindowClose size={20}/>
                </button>

                <h2 className="text-xl font-bold text-center mb-4">Edit User</h2>

                <input 
                type="text" 
                value={form.nisn}
                onChange={(e) => setForm({...form, nisn : e.target.value})}
                className="w-full p-2 mb-2 bg-gray-100 rounded" 
                />

                <input 
                type="text" 
                value={form.username}
                onChange={(e) => setForm({...form, username : e.target.value})}
                className="w-full p-2 mb-2 bg-gray-100 rounded" 
                />

                <button 
                onClick={() => onSubmit(form)}
                className="w-full bg-yellow-400 py-2 rounded font-semibold">
                    Save Changes
                </button>
            </motion.div>
        </div>
    )
}

export default EditUserModal