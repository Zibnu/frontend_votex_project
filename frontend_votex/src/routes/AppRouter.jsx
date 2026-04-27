import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Vote from '../pages/Vote';
import SuccessVote from '../pages/SuccessVote';
import AdminLayout from "../layouts/AdminLayout"
import DashboardPage from '../Admin/pages/DashboardPage';
import CandidatePage from '../Admin/pages/CandidatePage';
import ManageUserPage from '../Admin/pages/ManageUserPage';
import SettingPage from "../Admin/pages/SettingPage";

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/vote' element={<Vote/>} />
            <Route path='/success_voted' element={<SuccessVote/>} />

            <Route element={<AdminLayout/>}>
                <Route path='/admin/dashboard' element={<DashboardPage/>} />
                <Route path='/admin/candidates' element={<CandidatePage/>} />
                <Route path='/admin/users' element={<ManageUserPage/>} />
                <Route path='/admin/setting' element={<SettingPage/>} />
            </Route>
        </Routes>
    )
}

export default AppRouter