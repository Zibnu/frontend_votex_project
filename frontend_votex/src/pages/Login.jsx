import React, { useState } from 'react'
import authHero from "../assets/image/authHero.png";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import apiServices from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [form , setForm] = useState({
        nisn : "",
        password : "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(!form.nisn || !form.password) {
            return toast.error("Semua Fields Wajib di Isi");
        }

        try {
            const res = await apiServices.post("/auth/login", form);
            console.log(res);

            const token = res.data.token;
            const user = res.data.user.id_user;
            const role = res.data.user.role;

            if(!token) {
                console.error("Token Not Found in Response");
                toast.error("Login Gagal : Token Not Found");
                return
            };

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user);
            localStorage.setItem("role", role);

            toast.success("Berhasil Login");

            if(role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/voted");
            }
        } catch (error) {
            const status = error.status;
            const messageError = error.response.data.message;

            if(status === 404) {
                toast.error("Akun Belum Terdaftar");
            } else if(status === 401) {
                toast.error("Password Salah");
            } else {
                toast.error(messageError || "Internal Server Error");
            }
        } finally {
            setLoading(false)
        }
    }

    if(error) return <div className="text-center text-red-500">{error}</div>

    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-[#F5F7F5]'>
            <motion.div 
            initial={{ opacity : 0, y : 30}}
            animate={{ opacity : 1, y : 0}}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex"
            >
                {/* Left */}
                <div className="hidden md:flex w-1/2 bg-[#107065] text-[#FFF9C4] p-8 flex-col items-center justify-center gap-6 text-center">
                    <img 
                    src={authHero}
                    alt="Hero Auth"
                    className="w-full max-w-[240px] object-contain"
                    />
                    <p className="text-lg md:text-xl font-semibold leading-relaxed">
                        Pilih Kandidat Ketua dan Wakil Ketua Osis Terbaik Menurut Versi Kamu Sendiri
                    </p>
                </div>

                {/* Right */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                        type="text"
                        name='nisn'
                        placeholder='NISN'
                        value={form.nisn}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] placeholder-[#334155] focus:ring-2 focus:ring-[#107065] outline-none transition"
                        />

                        <input 
                        type="password"
                        name='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] placeholder-[#334155] focus:ring-2 focus:ring-[#107065] outline-none transition"
                        />

                        <button 
                        type='submit'
                        disabled={loading}
                        className="w-full bg-[#FFC107] hover:bg-[#e1aa07] text-white py-2 rounded-lg font-semibold transition disabled:opacity-70">
                            {loading ? "Loading...." : "Login"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Login