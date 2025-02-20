"use client";
import {
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userCopied, setUserCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleCopyUser = () => {
    navigator.clipboard.writeText("fda9392hf[+#${5667");
    setUserCopied(true);
    setTimeout(() => setUserCopied(false), 2000); // Reset after 2 seconds
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText("fda93967fasd$#hf[+{5667");
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000); // Reset after 2 seconds
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }), // Send username and password
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token); // Store the token
        // Redirect or update UI to indicate successful login
        // console.log("Login successful, token:", token);
        window.location.href = "/"; // Redirect to the home page (or any other page)
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error: unknown) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-32">
      <form
        onSubmit={handleLogin}
        className="bg-white p-4 max-w-sm rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold text-center text-gray-800">
          Sign in to your account
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="relative mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User:{" "}
            <span className="text-xs text-gray-500 ml-1 relative">
              {"fda9392hf[+#${5667"}
              <span
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-indigo-500"
                onClick={handleCopyUser}
              >
                {userCopied ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ClipboardDocumentListIcon className="h-4 w-4" />
                )}
              </span>
            </span>
          </label>
          <div className="relative">
            <input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 pr-10 text-sm w-full rounded-md shadow-sm"
              required
            />
          </div>
        </div>
        <div className="relative mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password:{" "}
            <span className="text-xs text-gray-500 ml-1 relative">
              {"fda93967fasd$#hf[+{5667"}
              <span
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-indigo-500"
                onClick={handleCopyPassword}
              >
                {passwordCopied ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ClipboardDocumentListIcon className="h-4 w-4" />
                )}
              </span>
            </span>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 pr-10 text-sm w-full rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="block mt-6 py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium w-full rounded-md uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Page;
