import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res= await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === 'false') {
        setError(false);
        console.log(data);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-indigo-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="bg-indigo-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-indigo-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 text-violet-50 text-center">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex py-3 gap-2">
        <p>Have had a username?</p>
        <Link to="/sign-in">
          <span>Sign in</span>
        </Link>
      </div>
      <p className="text-red-500">{error && "something went wrong"}</p>
    </div>
  );
}
