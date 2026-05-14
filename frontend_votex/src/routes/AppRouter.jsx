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
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import ProtectLoginRoute from './ProtectLoginRoute';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={
                <ProtectLoginRoute>
                    <Login />
                </ProtectLoginRoute>
            } />

            <Route path='/vote' element={
                <UserRoute>
                    <Vote/>
                </UserRoute>
            } />
            <Route path='/success_voted' element={
                <UserRoute>
                    <SuccessVote/>
                </UserRoute>
                } />

            <Route element={<AdminLayout/>}>
                <Route path='/admin/dashboard' element={
                    <AdminRoute>
                        <DashboardPage/>
                    </AdminRoute>
                    } />
                <Route path='/admin/candidates' element={
                    <AdminRoute>
                        <CandidatePage/>
                    </AdminRoute>
                    } />
                <Route path='/admin/users' element={
                    <AdminRoute>
                        <ManageUserPage/>
                    </AdminRoute>
                    } />
                <Route path='/admin/setting' element={
                    <AdminRoute>
                        <SettingPage/>
                    </AdminRoute>
                    } />
            </Route>
        </Routes>
    )
}

export default AppRouter