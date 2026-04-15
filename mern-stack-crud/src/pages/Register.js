import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
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
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(data.name + " has been successfully registered");
                navigate("/login");
            } else {
                setErrorMsg(result.message || "Registration failed");
            }
        } catch (err) {
            setErrorMsg("Error registering user: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Registration Form</h2>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                />
                {errors.name && <span style={{ color: "red" }}>*Name* is mandatory</span>}

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

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} disabled={loading} value={loading ? "Registering..." : "Register"} />
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </>
    );
}

export default Register;