import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Vote from '../pages/Vote';
import SuccessVote from '../pages/SuccessVote';
import AdminLayout from "../layouts/AdminLayout"
import DashboardPage from '../Admin/pages/DashboardPage';
import CandidatePage from '../Admin/pages/CandidatePage';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/vote' element={<Vote/>} />
            <Route path='/success_voted' element={<SuccessVote/>} />

            <Route element={<AdminLayout/>}>
                <Route path='/admin/dashboard' element={<DashboardPage/>} />
                <Route path='/admin/candidates' element={<CandidatePage/>} />
            </Route>
        </Routes>
    )
}

export default AppRouter