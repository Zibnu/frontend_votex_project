import React, { useState } from 'react'
import apiServices from '../utils/api'
import authHero from "../assets/image/icon_1_noBg.png"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { motion } from 'framer-motion';

function RegisterAdminAccount() {
    const [form, setForm] = useState({
        username : "",
        nisn : "",
        password : "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(!form.username || !form.nisn || !form.password) {
            return toast.error("Semua Fields Wajib diisi!!");
        }

        try {
            await apiServices.post("auth/regis", form);
            toast.success("Register Admin Success");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Register Gagal");
            console.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    if (error) return <div className="text-center text-red-500">{error}</div>

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#F5F7F5] px-4'>
            <motion.div 
                initial={{opacity : 0, y : 30}}
                animate={{opacity : 1, y : 0}}
                className="w-full max-w-4xl bg-[#FFFFFF] rounded-2xl shadow-lg flex overflow-hidden">
                    <div className="hidden md:flex w-1/2 bg-[#107065] text-[#FFF9C4] p-3 flex-col items-center justify-center gap-2 text-center">
                        <img 
                            src={authHero}
                            alt="Hero Auth"
                            className='w-full max-w-90 object-contain'
                        />
                        <p className="text-lg md:text-xl font-semibold leading-relaxed">
                            Create a secure administrator account
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input 
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                className='w-full px-4 py-2 rounded-lg border border-[#E0E0E0] placeholder-[#334155] focus:ring-2 focus:ring-[#107065] outline-none transition'
                                onChange={handleChange}
                                required
                            />

                            <input 
                                type="text"
                                name="nisn"
                                placeholder="NIS"
                                value={form.nisn}
                                className='w-full px-4 py-2 rounded-lg border border-[#E0E0E0] placeholder-[#334155] focus:ring-2 focus:ring-[#107065] outline-none transition'
                                onChange={handleChange}
                                required
                            />

                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder='Password'
                                    value={form.password}
                                    className='w-full px-4 py-2 rounded-lg border border-[#E0E0E0] placeholder-[#334155] focus:ring-2 focus:ring-[#107065] outline-none transition'
                                    onChange={handleChange}
                                    required
                                />

                                <motion.button
                                    whileTap={{scale : 0.8}}
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-700 cursor-pointer transition'
                                    >
                                        {showPassword ? <LuEye/> : <LuEyeClosed/>}
                                </motion.button>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                onClick={() => setShowPassword(false)}
                                className='mt-4 w-full bg-[#FFC107] hover:bg-[#e1aa07] text-white py-2  rounded-lg font-semibold transition disabled:opacity-70 cursor-pointer'
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>
                        </form>
                    </div>
            </motion.div>
        </div>
    )
}

export default RegisterAdminAccount