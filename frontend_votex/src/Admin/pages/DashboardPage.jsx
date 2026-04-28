import React from 'react'
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import { FaUsers } from "react-icons/fa";
import { ImUserCheck, ImUserTie } from "react-icons/im";
import { TbUserQuestion } from "react-icons/tb";
import { motion } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from '@tanstack/react-query';

function DashboardPage() {
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);

    // const fetchData = async () => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         const res = await apiServices.get("/dashboard/dashboard_data", {
    //             headers : {
    //                 Authorization : `Bearer ${token}`,
    //             },
    //         });
    //         setData(res.data.data);
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.response?.data?.message || "Gagal Mengambil Data Dashboard");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const { data, isLoading, isError, error} = useQuery({
        queryKey : ["dashboard"],
        queryFn : async () => {
            const token = localStorage.getItem("token");

            const res = await apiServices.get("/dashboard/dashboard_data", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            return res.data.data;
        },
        refetchInterval : 5000,
        refetchOnWindowFocus : true,
        retry : 2,
    });

    if(isLoading) return <div className="text-center text-gray-500 flex justify-center items-center h-screen">Loading....</div>
    if(isError) {
        toast.error(error?.response?.data?.message || "Gagal Mendapatkan Data Dashboard");
        return <div className="text-center text-red-500">Something Wrong...</div>
    }
    if(!data) return <div className="text-center text-red-400">No Data!!</div>

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
            id : 2,
            value : data.chartData.not_voted,
            label : "Total Not Voted",
            color : "#F57C00",
        },
    ];

    const barLabels = data.votesPerCandidate.map((item) => `${item.ketua_name}`);
    const barValues = data.votesPerCandidate.map((item) => item.total_votes);

    return (
        <div className='p-6 space-y-6'>
            <div className="bg-white p-5 rounded-xl shadow py-6">
                <h2 className="text-2xl font-semibold">Dashboard Page</h2>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <motion.div 
                whileHover={{scale : 1.03}}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <FaUsers size={40}/>
                    <div>
                        <p className="text-sm text-[#37474F]">Total Voters</p>
                        <h2 className="text-xl font-bold text-[#1E88E5]">
                            {data.totalUser}
                        </h2>
                    </div>
                </motion.div>

                <motion.div 
                whileHover={{scale : 1.03}}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <ImUserCheck size={40}/>
                    <div>
                        <p className="text-sm text-[#37474F]">Have Chosen</p>
                        <h2 className="text-xl font-bold text-[#2E7D32]">
                            {data.totalVoted}
                        </h2>
                    </div>
                </motion.div>

                <motion.div 
                whileHover={{scale : 1.03}}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <TbUserQuestion size={40}/>
                    <div>
                        <p className="text-sm text-[#37474F]">Not Voted</p>
                        <h2 className="text-xl font-bold text-[#F57C00]">
                            {data.totalNotVoted}
                        </h2>
                    </div>
                </motion.div>

                <motion.div 
                whileHover={{scale : 1.03}}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                    <ImUserTie size={40}/>
                    <div>
                        <p className="text-sm text-[#37474F]">Candidate</p>
                        <h2 className="text-xl font-bold text-[#673AB7]">
                            {data.totalCandidate}
                        </h2>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="mb-2 font-semibold">Voting Result</h2>

                    <PieChart
                        series={[
                            {
                                data : pieData
                            },
                        ]}
                        width={300}
                        height={200}
                    />
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-center items-center">
                    <h2 className="font-semibold text-[#37474F]">Percantage Have Voted</h2>

                    <h1 className="text-4xl font-bold text-[#2E7D32] mt-2">
                        {data.percentage}%
                    </h1>

                    <p className="text-[#37474F] text-sm"> 
                        from all voters
                    </p>
                </div>

            </div>

            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="mb-4 font-semibold">Votes Per Candidate</h2>

                <BarChart
                layout='horizontal'
                yAxis={[{ scaleType : "band", data : barLabels}]}
                series={[
                    {
                        data : barValues,
                        color : "#10B981"
                    }
                ]}
                width={500}
                height={300}
                />
            </div>
        </div>
    )
}

export default DashboardPage