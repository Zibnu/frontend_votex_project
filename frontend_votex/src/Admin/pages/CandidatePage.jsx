import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import CandidateTable from '../components/CandidateTable'
import { FaPlus } from "react-icons/fa6";

function CandidatePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDataCandidate = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await apiServices.get("/candidate/candidates", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            setData(res.data.data)
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed Get Data Candidate");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataCandidate();
    }, []);

    if(loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

    return (
        <div className='p-6 space-y-6'>
            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Candidate</h2>

                <button 
                onClick={() => console.log("add candidate")}
                className="p-2 rounded-lg bg-[#BAE0BD] transition hover:scale-105">
                    <FaPlus color='#5E9C76'/>
                </button>
            </div>

            <CandidateTable data={data}/>
        </div>
    )
}

export default CandidatePage