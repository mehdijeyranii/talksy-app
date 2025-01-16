import React, { FormEvent, useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5500/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                setMessage("Login successful!"); // پیام موفقیت‌آمیز
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error(`Error login in: ${error}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button type="submit">Login</button>

            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
