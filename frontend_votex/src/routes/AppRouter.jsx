import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Vote from '../pages/Vote';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/vote' element={<Vote/>} />
        </Routes>
    )
}

export default AppRouter