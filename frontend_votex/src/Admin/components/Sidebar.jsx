import React, { useState } from 'react'

import { LuLayoutDashboard } from "react-icons/lu";
import { ImUserTie } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import logoSekolah from "../../assets/image/logoSekolah.png";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineLogout } from "react-icons/md";
import toast from 'react-hot-toast';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    // const location = useLocation();

    const menu = [
        {name : "Dashboard", icon : <LuLayoutDashboard/>, path : "/admin/dashboard"},
        {name : "Candidates", icon : <ImUserTie/>, path : "/admin/candidates"},
        {name : "Users", icon : <FaRegCircleUser/>, path : "/admin/users"},
        {name : "Setting", icon : <IoSettingsOutline/>, path : "/admin/setting"},
    ];

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout Success");
        navigate("/")
    }
    return (
        <motion.div
            animate={{width : isOpen ? 240 : 80}}
            transition={{duration : 0.3, type : "spring", damping : 15}}
            className='h-screen bg-[#1A3C28] text-white top-0 sticky flex flex-col p-4'
        >
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-6 bg-gray-200 text-black p-2 rounded-full shadow cursor-pointer">
                {isOpen ? (
                    <TbLayoutSidebarLeftCollapse size={20} />
                ) : (
                    <TbLayoutSidebarRightCollapse size={20} />
                )}
            </button>

            <div className="items-center mb-8 mt-4 px-2 flex flex-col">
                <img src={logoSekolah} alt="Logo Sekolah" className="w-23 mb-2 " />
                <span className="font-bold text-lg text-[#FFF9C4] ">
                    {isOpen && "Votex"}
                </span>
            </div>

            <nav className="flex flex-col gap-2">
                {menu.map((item, index) => {
                    // const Icon = item.icon;

                    return (
                        <NavLink
                        key={index}
                        to={item.path}
                        className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            isActive ? "font-bold text-[#FFC107]" : "text-[#A5B49D] hover:text-[#FFC107]"
                        }`}
                        >
                            <span className="text-xl">
                                {item.icon}
                            </span>
                            {isOpen && <span>{item.name}</span>}
                        </NavLink>
                    )
                })}
            </nav>
{/* 
            <div>
                <div className="flex flex-col items-center mb-6">
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
            </div> */}

            <button 
                onClick={handleLogout}
                className={`mt-auto flex items-center cursor-pointer ${
                    isOpen ? "gap-3 px-4 justify-start" : "justify-center"
                } py-3 rounded-md bg-[#e31313] text-[#f9f9f9] hover:bg-[#b50d0d] transition`}>
                    <MdOutlineLogout size={22}/>
                    {isOpen && <span>Logout</span>}
                </button>
        </motion.div>
    )
}

export default Sidebar