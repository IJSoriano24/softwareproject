import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg("");
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                console.log("You Are Successfully Logged In");
                navigate("/dashboard");
            } else {
                setErrorMsg(result.message || "Login failed");
            }
        } catch (err) {
            setErrorMsg("Error logging in: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Login Form</h2>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} disabled={loading} value={loading ? "Logging in..." : "Login"} />
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </>
    );
}

export default Login;