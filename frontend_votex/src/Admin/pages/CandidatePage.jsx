import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import CandidateTable from '../components/CandidateTable'
import { FaPlus } from "react-icons/fa6";
import AddCandidateModal from '../components/AddCandidateModal';
import EditCandidateModal from '../components/EditCandidateModal';
import DeleteCandidateModal from '../components/DeleteCandidateModal';

function CandidatePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(false);

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
                onClick={() => setShowAdd(true)}
                className="p-2 rounded-lg bg-[#BAE0BD] transition hover:scale-105 cursor-pointer">
                    <FaPlus color='#5E9C76'/>
                </button>
            </div>

            <CandidateTable 
            data={data}
            onEdit={(item) => {
                setSelectedCandidate(item);
                setShowEdit(true);
            }}
            onDelete={(item) => {
                setSelectedCandidate(item);
                setShowDelete(true);
            }}
            />

            {showAdd && (
                <AddCandidateModal
                onClose={() => setShowAdd(false)}
                onSuccess={fetchDataCandidate}
                />
            )}

            {showEdit && selectedCandidate && (
                <EditCandidateModal
                onClose={() => setShowEdit(false)}
                candidate={selectedCandidate}
                onSuccess={fetchDataCandidate}
                />
            )}

            {showDelete && selectedCandidate && (
                <DeleteCandidateModal
                onClose={() => setShowDelete(false)}
                candidate={selectedCandidate}
                onSuccess={fetchDataCandidate}
                />
            )}
        </div>
    )
}

export default CandidatePage