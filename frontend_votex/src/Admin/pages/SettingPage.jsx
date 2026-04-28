import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import ResetVotingModal from '../components/ResetVotingModal'

function SettingPage() {
    const [setting, setSetting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showResetModal, setShowResetModal] = useState(false);
    const token = localStorage.getItem("token");

    const fetchSetting = async () => {
        try {
            const res = await apiServices.get("/setting/data_setting", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            setSetting(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Fetch Data Setting Information");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetting();
    }, []);

    const handleToogle = async () => {
        try {
            const res = await apiServices.patch("/setting/toogle_setting", 
                {}, 
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });

                toast.success(res.data.message);
                fetchSetting();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Toogle Setting ERROR");
        }
    }

    const handleResetVoting = async () => {
        try {
            await apiServices.delete("/setting/reset", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            toast.success("Voting Reset Success");
            setShowResetModal(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Reset Voting Error");
        }
    }

    if (loading) return <div className="items-center flex justify-center text-gray-700 h-screen">Loading...</div>
    return (
        <div className='p-6 space-y-6'>
            <div className="bg-white p-7 py-8 rounded-xl shadow flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#1A3C28]">System Setting</h2>

                <div className="flex items-center gap-2">
                    <span 
                    className={`w-3 h-3 rounded-full ${
                        setting.is_setting_open ? "bg-green-500" : "bg-red-500"
                    }`}></span>

                    <span className="font-semibold">
                        Status : {" "}
                        <span className={`${setting.is_setting_open ? "text-green-500" : "text-red-500"}`}>
                            {setting.is_setting_open ? "Active" : "Not Active"}
                        </span>
                    </span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-[#1A3C28]">Voting Access</h3>
                    <p className="text-sm text-gray-500">
                        Open or close application access for all students. When closed, students cannot submit their choices
                    </p>
                </div>

                <motion.div 
                onClick={handleToogle}
                whileTap={{scale : 0.9}}
                className={`px-4 py-2 rounded-full text-white cursor-pointer font-semibold transition ${
                    setting.is_setting_open ? "bg-[#2E7D32]" : "bg-[#EF4444]"
                }`}>
                    {setting.is_setting_open ? "ON" : "OFF"}
                </motion.div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-[#1A3C28]">Reset All Votes</h3>
                    <p className="text-sm text-gray-500">
                        Permanently delete all incoming vote data. User for simulation or starting a new vote
                    </p>
                </div>

                <button 
                onClick={() => setShowResetModal(true)}
                className="bg-[#EF4444] text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-80">
                    Reset
                </button>
            </div>

            <ResetVotingModal
            isOpen={showResetModal}
            onClose={() => setShowResetModal(false)}
            onReset={handleResetVoting}
            />
        </div>
    )
}

export default SettingPage