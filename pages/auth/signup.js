// pages/auth/signup.js

import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ users: [form] }), // ✅ Wrap form in 'users' array
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/auth/signin'); // ✅ Redirect on success
            } else {
                setError(data.message || 'Error occurred during signup.');
            }
        } catch (err) {
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Sign Up - Create User</div>
                {loading && <p>Loading...</p>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}
