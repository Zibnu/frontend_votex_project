import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Vote from '../pages/Vote';
import SuccessVote from '../pages/SuccessVote';
import AdminLayout from "../layouts/AdminLayout"
import DashboardPage from '../Admin/pages/DashboardPage';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/vote' element={<Vote/>} />
            <Route path='/success_voted' element={<SuccessVote/>} />

            <Route element={<AdminLayout/>}>
                <Route path='/admin/dashboard' element={<DashboardPage/>} />
            </Route>
        </Routes>
    )
}

export default AppRouter