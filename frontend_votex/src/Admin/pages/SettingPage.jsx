import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import ResetVotingModal from '../components/ResetVotingModal'
import { CgToggleSquareOff, CgToggleSquare } from "react-icons/cg";

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
        <div className='p-4 space-y-3'>
            <div className="bg-white p-4 py-8 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <h2 className="text-3xl font-semibold ">System Setting</h2>

                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <span 
                    className={`w-2.5 h-2.5 rounded-full ${
                        setting.is_setting_open ? "bg-green-500" : "bg-red-500"
                    }`}></span>

                    <span className="text-sm font-semibold text-gray-700">
                        Status : {" "}
                        <span className={`${setting.is_setting_open ? "text-green-500" : "text-red-500"}`}>
                            {setting.is_setting_open ? "Active" : "Not Active"}
                        </span>
                    </span>
                </div>
            </div>

            <div className="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center gap-4">
                <div>
                    <h3 className="font-semibold text-[#212121] text-base mb-0.5">Voting Access</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Open or close application access for all students. When closed, students cannot submit their choices
                    </p>
                </div>

                <motion.div 
                onClick={handleToogle}
                whileTap={{scale : 0.9}}
                title={setting.is_setting_open ? "Click to turn OFF" : "Click to turn ON"}
                className="cursor-pointer flex shrink-0">
                    {setting.is_setting_open ? (
                        <CgToggleSquare size={52} color='#2E7D32'/>
                        ): (
                            <CgToggleSquareOff size={52} color='#D1D5DB' />
                        )}
                </motion.div>
            </div>

            <div className="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center gap-4">
                <div>
                    <h3 className="font-semibold text-[#212121] mb-0.5">Reset All Votes</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Permanently delete all incoming vote data. User for simulation or starting a new vote
                    </p>
                </div>

                <button 
                onClick={() => setShowResetModal(true)}
                className="bg-[#EF4444] hover:bg-red-600 text-white text-sm px-5 py-2 rounded-lg cursor-pointer hover:opacity-80 transition-colors duration-150 flex-shrink-0">
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