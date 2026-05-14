import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectLoginRoute({children}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(token && role === "admin") {
        return <Navigate to="/admin/dashboard" replace />
    }

    if(token && role === "user") {
        return <Navigate to="/vote" replace />
    }

    return children
}

export default ProtectLoginRoute