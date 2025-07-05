// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 relative">

      {/* Home Button on Top-Right */}
      <Link
        to="/"
        className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg"
      >
        Home
      </Link>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-500">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:scale-105 transform transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>Don’t have an account? <Link to="/register" className="text-indigo-500 font-semibold hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
