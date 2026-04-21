import React, { useState } from 'react'

import { LuLayoutDashboard } from "react-icons/lu";
import { ImUserTie } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import logoSekolah from "../../assets/image/logoSekolah.png";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineLogout } from "react-icons/md";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        {name : "Dashboard", icon : <LuLayoutDashboard/>, path : "/admin/dashboard"},
        {name : "Candidates", icon : <ImUserTie/>, path : "/admin/candidates"},
        {name : "Users", icon : <FaRegCircleUser/>, path : "/admin/users"},
        {name : "Setting", icon : <IoSettingsOutline/>, path : "/admin/setting"},
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <motion.div
            animate={{width : isOpen ? 240 : 80}}
            transition={{duration : 0.3, type : "spring", damping : 15}}
            className='h-screen bg-[#1A3C28] text-white top-0 sticky flex flex-col justify-between p-4'
        >
            <div>
                <div className="flex flex-col items-center mb-6">
                    <img src={logoSekolah} alt="Logo Sekolah" className="w-12 mb-2" />
                    {isOpen && (
                        <p className="text-sm text-[#FFF9C4]">
                            Welcome Admin
                        </p>
                    )}
                </div>

                <div 
                className="cursor-pointer mb-6 flex justify-end"
                onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <TbLayoutSidebarLeftCollapse size={22} />
                    ) : (
                        <TbLayoutSidebarRightCollapse size={22} />
                    ) }
                </div>

                <div className="flex flex-col gap-3">
                    {menu.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <div 
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`
                                    flex items-center gap-3 rounded-lg cursor-pointer
                                    transition-all duration-300
                                    ${isActive ? 
                                        "font-bold text-[#FFC107]" 
                                            : 
                                        "text-[#A5B49D] hover:bg-white/30 hover:text-white"
                                    }
                                `}
                            >
                                <div className="text-lg">{item.icon}</div>

                                {isOpen &&(
                                    <span className="text-sm font-medium">
                                        {item.name}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div 
                onClick={handleLogout}
                className="flex items-center gap-3 bg-red-600 p-3 rounded-lg cursor-pointer hover:bg-red-700 transition">
                    <MdOutlineLogout/>
                    {isOpen && <span>Logout</span>}
                </div>
        </motion.div>
    )
}

export default Sidebar