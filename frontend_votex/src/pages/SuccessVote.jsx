import React from 'react'
import successAnimation from "../assets/animation/Businessman flies up with rocket.json";
import Lottie from "react-lottie-player";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SuccessVote() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout Berhasil");
        navigate("/")
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-[#F5F7F5] via-[#E8F5E9] to-[#F5F7F5] flex flex-col items-center justify-center p-6'>
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-xl text-center border border-white/40">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition duration-700 -skew-x-12"></div>

            <div className="flex justify-center mb-6">
                <Lottie 
                    animationData={successAnimation}
                    loop
                    play
                    className='w-40'
                />
            </div>

            <h2 className="text-2xl font-semibold text-[#212121] leading-relaxed">
                Terimakasih Sudah Memilih <br />
                Semoga Pilihanmu yang Terbaik
            </h2>
            </div>

            <div className="mt-6 w-full max-w-xl">
                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex justify-center border border-white/30">
                    <button 
                        onClick={handleLogout}
                        className="
                        relative overflow-hidden bg-[#D40D0D] text-white px-20 py-3 rounded-xl font-semibold cursor-pointer transition duration-300
                        hover:scale-105 hover:shadow-lg
                        ">
                            <span className="relative z-10">Logout</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition duration-700 -skew-12"></div>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessVote