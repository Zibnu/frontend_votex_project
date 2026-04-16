import React, { useEffect, useState } from 'react'
import leftHero from "../assets/image/leftHeroUserPage.png"
import rightHero from "../assets/image/rightHeroUserPage.png"
import logoSekolah from "../assets/image/logoSekolah.png";
import apiServices from '../utils/api';
import { FiXSquare } from "react-icons/fi";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardHeader from "../components/CardHeader";
import Lottie from "react-lottie-player";
import catAnimation from "../assets/animation/Cat playing animation.json"


function Vote() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [candidate, setCandidate] = useState([]);
    const [selected, setSelected] = useState(null);
    const [detailModal, setDetailModal] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            setLoading(true);

            const profileRes = await apiServices.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = profileRes.data.data;
            setUser(userData);

            if (userData.has_voted) {
                toast.error("Kamu Sudah Pernah Voting");
                return navigate("/");
            }

            const settingRes = await apiServices.get("/setting/data_setting", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const open = settingRes.data.data.is_setting_open;
            setIsOpen(open);
            if (!open) return;

            const candidateRes = await apiServices.get("/candidate/candidates", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCandidate(candidateRes.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Profile, Candidate dan Info Setting");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleVote = async () => {
        if (!selected) {
            toast.error("Pilih Kandidat Terlebih dahulu!!");
            return
        }

        try {
            await apiServices.post("/vote/submit_vote",
                { candidate_id: selected },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success("Suara Telah Terkirim Terimakasih Sudah Memilih");
            navigate("/success");
        } catch (error) {
            const status = error.response?.status;

            if (status === 400) {
                toast.error("Sudah Melakukan Voted");
                navigate("/");
            } else if (status === 403) {
                setIsOpen(false);
            } else {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal Melakukan Vote")
            }
        }
    };

    // console.log(selected);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Berhasil")
        navigate("/");
    };

    if (loading) return <div className="text-center text-sm text-gray-500 flex justify-center items-center h-screen">Loading...</div>

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-linear-to-br from-[#F5F7F5] via-[#E8F5E9] to-[#F5F7F5] p-6 flex flex-col gap-6 items-center">
                <CardHeader user={user} leftHero={leftHero} rightHero={rightHero} logo={logoSekolah} />

                <div className="relative overflow-hidden bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full text-center max-w-5xl border border-white/40">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition duration-700 -skew-x-12"></div>

                    <div className="flex justify-center mb-4">
                        <Lottie
                            animationData={catAnimation}
                            loop
                            play
                            style={{width : 120, height : 120}}
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-[#B45309]">
                        Sesi Pemilihan Sedang di Tutup
                    </h2>

                    <p className="mt-3 text-[#37474F] text-sm leading-relaxed max-w-md mx-auto">
                        Saat ini panitia sedang menutup akses pemilihan. Silahkan tunggu intruksi lebih lanjut dari guru/panitia, dan silahkan logout!!
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-5xl flex items-center justify-center border border-white/30">
                    <button
                        onClick={handleLogout}
                        className="bg-[#D40D0D] text-[#F5F7F5] px-24 py-3 rounded-xl font-semibold cursor-pointer hover:scale-105 hover:shadow-lg transition duration-300">
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-[#F5F7F5] p-6 flex flex-col gap-6 items-center'>
            <CardHeader user={user} leftHero={leftHero} rightHero={rightHero} logo={logoSekolah} />

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-xl">
                {candidate.map((candidat, index) => (
                    <div 
                    key={candidat.id_candidate}
                    className={`bg-white p-4 rounded-xl shadow cursor-pointer border ${selected === candidat.id_candidate ? "border-green-500" : ""}`}
                    onClick={() => setSelected(candidat.id_candidate)}
                    >
                        <div className="text-[#2E7D32] font-bold">{index + 1}</div>

                        <img 
                        src={candidat.image} 
                        alt="Image Candidate" 
                        className="w-24 h-24 rounded-full mx-auto"/>

                        <h4 className="text-center font-semibold mt-2">
                            {candidat.ketua_name} & {candidat.wakil_name}
                        </h4>

                        <p className="text-lg text-[#212121] mt-5">
                            Visi & Misi
                        </p>

                        <p className="text-sm mt-2">
                            { candidat.visi.slice(0, 80)}
                        </p>

                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setDetailModal(candidat);
                        }}
                        className="text-blue-500 mt-2">
                            Lihat Detail
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow w-full max-w-5xl items-center grid text-center  sticky">
                <h5 className="mb-4 text-lg font-semibold">
                    Apakah Anda Yakin dengan Pilihan Anda?
                </h5>

                <button 
                onClick={handleVote}
                className="bg-[#FFC107] px-6 py-3 rounded-lg font-semibold text-[#1A3C28] cursor-pointer">
                    Kirim Suara Saya
                </button>
            </div>

            {/* Modal  */}
            {detailModal && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
                    <motion.div 
                    initial={{scale : 0.8}}
                    animate={{scale : 1}}
                    className="bg-white p-6 rounded-xl max-w-md relative">
                        <button 
                        onClick={() => setDetailModal(null)}
                        className="absolute top-2 right-2 cursor-pointer text-black hover:text-gray-400">
                            <FiXSquare size={15}/>
                        </button>

                        <img 
                        src={detailModal.image} 
                        alt="Image Candidate"
                        className="w-24 h-24 rounded-full mx-auto"
                        />

                        <h3 className="text-center font-semibold mt-2">
                            {detailModal.ketua_name} & {detailModal.wakil_name}
                        </h3>

                        <p className="text-lg text-[#212121] mt-5">
                            Visi & Misi
                        </p>

                        <p className="mt-2 text-sm text-[#37474F]">
                            {detailModal.visi}
                        </p>
                        <p className="mt-2 text-sm text-[#37474F]">
                            {detailModal.misi}
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Vote