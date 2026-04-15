import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setProfile(null);
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/api/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    setProfile(null);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div><p>Please log in to view your profile.</p></div>;
    }
    
    return (
        <div>
            <h1>Welcome, {profile.name}!</h1>
            <p>Email: {profile.email}</p>
            {/* Add more profile details as needed */}
        </div>
    );
}

export default Dashboard;   
       