import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import { FaUsers } from "react-icons/fa";
import { ImUserCheck, ImUserTie } from "react-icons/im";
import { TbUserQuestion } from "react-icons/tb";
import { motion } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await apiServices.get("/dashboard/dashboard_data", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            setData(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mengambil Data Dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(loading) return <div className="text-center text-gray-500 flex justify-center items-center h-screen">Loading....</div>
    if(!data) return <div className="text-center text-red-400 justify-center">No Data!!</div>

    const pieData = [
        {
            id : 0,
            value : data.chartData.total,
            label : "total voters",
            color : "#1E88E5"
        },
        {
            id : 1,
            value : data.chartData.voted,
            label : "Total Voted",
            color : "#2E7D32",
        },
        {
            id : 1,
            value : data.chartData.not_voted,
            label : "Total Not Voted",
            color : "#F57C00",
        },
    ];

    const barLabels = data.votesPerCandidate.map((item) => `${item.ketua_name}`);
    const barValues = data.votesPerCandidate.map((item) => `${item.total_votes}`);
    return (
        <div>DashboardPage</div>
    )
}

export default DashboardPage