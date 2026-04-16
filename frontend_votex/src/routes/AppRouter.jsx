import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Vote from '../pages/Vote';
import SuccessVote from '../pages/SuccessVote';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/vote' element={<Vote/>} />
            <Route path='/success_voted' element={<SuccessVote/>} />
        </Routes>
    )
}

export default AppRouter