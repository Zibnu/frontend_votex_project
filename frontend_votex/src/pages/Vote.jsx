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
            navigate("/success_voted");
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
        localStorage.clear();
        toast.success("Logout Berhasil")
        navigate("/");
    };

    useEffect(() => {
        if(detailModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    },[detailModal]);

    if (loading) return <div className="text-center text-sm text-gray-500 flex justify-center items-center h-screen">Loading...</div>

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F5F7F5] via-[#E8F5E9] to-[#F5F7F5] p-6 flex flex-col gap-6 items-center">
                <CardHeader user={user} leftHero={leftHero} rightHero={rightHero} logo={logoSekolah} />

                <div className="relative overflow-hidden bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full text-center max-w-5xl border border-white/40 hover:scale-[1.01] transition duration-300">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition duration-700 -skew-x-12"></div>

                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="flex justify-center mb-4">
                            <Lottie
                                animationData={catAnimation}
                                loop
                                play
                                className='w-90'
                            />
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#B45309] mb-3">
                                Sesi Pemilihan Sedang di Tutup
                            </h2>

                            <p className="mt-3 text-[#37474F] text-sm leading-relaxed max-w-md mx-auto">
                                Saat ini panitia sedang menutup akses pemilihan. Silahkan tunggu intruksi lebih lanjut dari guru/panitia, dan silahkan logout!!
                            </p>
                        </div>
                    </div>
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

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
                {candidate.map((candidat, index) => (
                    <div 
                    key={candidat.id_candidate}
                    className={`
                        relative overflow-hidden cursor-pointer bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md
                        border transition-all duration-300 h-full flex flex-col justify-between
                        ${selected === candidat.id_candidate
                            ? "border-[#107065] ring-2 ring-[#107065]/90 scale-[1.02]"
                            : "border-white/40 hover:shadow-xl hover:scale-[1.02]"
                        }
                        `
                    }
                    onClick={() => setSelected(candidat.id_candidate)}
                    >
                        <div className="flex-1">
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
                        </div>

                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setDetailModal(candidat);
                        }}
                        className="text-[#212121] mt-3 font-medium hover:underline">
                            Lihat Detail
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow w-full max-w-5xl items-center grid text-center bottom-4 sticky">
                <h5 className="mb-4 text-lg font-semibold">
                    Apakah Anda Yakin dengan Pilihan Anda?
                </h5>

                <button 
                disabled={!selected}
                onClick={handleVote}
                className={`
                    relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-[#1A3C28] transition duration-300
                    hover:scale-[1.02] hover:shadow-xl ${selected ? "bg-[#FFC107] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}
                `}>
                    <span className="relative z-10">Kirim Suara Saya</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition duration-700 -skew-12"></div>
                </button>
            </div>

            {/* Modal  */}
            {detailModal && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <motion.div 
                    initial={{scale : 0.8}}
                    animate={{scale : 1}}
                    className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] flex flex-col shadow-xl relative">
                        <button 
                        onClick={() => setDetailModal(null)}
                        className="absolute top-2 right-2 cursor-pointer text-black hover:scale-105 transition">
                            <FiXSquare size={21}/>
                        </button>

                    <div className="shrink-0">
                        <img
                        src={detailModal.image} 
                        alt="Image Candidate"
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-200"
                        />

                        <h3 className="text-center font-semibold text-xl mt-4">
                            {detailModal.ketua_name} & {detailModal.wakil_name}
                        </h3>
                        <div className="h-px bg-gray-100 w-full mt-4"></div>
                    </div>

                    <div className="overflow-y-auto pr-2 mt-4">
                        <p className="text-lg font-semibold text-[#212121] mb-2">
                            Visi & Misi
                        </p>
                        <div className="text-sm text-[#37474F] space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-700">Visi :</h4>
                                <p className='leading-relaxed'>
                                    {detailModal.visi}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium to-gray-700">Misi :</h4>
                                <p className="leading-relaxed whitespace-pre-line">
                                    {detailModal.misi}
                                </p>
                            </div>
                        </div>
                    </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Vote