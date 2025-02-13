"use client";

import { useEffect, useState } from "react";

const Dashboard = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedSession = localStorage.getItem("userSession");
        const session = storedSession ? JSON.parse(storedSession) : null;

        if (session?.user) {
            setUserName(session.user.name || "User");
            setUserEmail(session.user.email || "No email available");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
                <p className="text-lg text-gray-600 mt-2">Email: {userEmail}</p>
            </div>
        </div>
    );
};

export default Dashboard;
