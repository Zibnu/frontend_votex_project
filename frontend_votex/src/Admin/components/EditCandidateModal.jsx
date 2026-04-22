import React, { useState } from 'react'
import { motion } from 'framer-motion'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import { FaRegWindowClose } from "react-icons/fa";

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
    return (
        <div>EditCandidateModal</div>
    )
}

export default EditCandidateModal