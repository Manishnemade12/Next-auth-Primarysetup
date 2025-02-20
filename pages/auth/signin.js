import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (result?.error) {
                setError('Invalid email or password.');
            } else {
                router.push('/');
            }
        } catch (err) {
            setError('Sign-in failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Sign In</div>
                {loading && (
                    <div className="flex flex-center w-100 flex-col">
                        <Spinner /> Checking...
                    </div>
                )}
                <form className="form" onSubmit={handleSubmit}>
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
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
                <span className="agreement">
                    <Link href="/auth/signup">SignUp</Link>
                  
                </span>
            </div>
        </div>
    );
}
