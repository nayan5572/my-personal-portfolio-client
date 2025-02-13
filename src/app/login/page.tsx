"use client";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fbfbfe] px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Sign in to your account
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-3" />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000" })
            }
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition text-gray-900"
          >
            <FaGithub className="text-2xl mr-3" />
            <span className="font-medium">Continue with GitHub</span>
          </button>
        </div>
        <p className="text-gray-600 text-center mt-6">
          Do not have an account?{" "}
          <Link
            href="/registration"
            className="text-[#78CC6D] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
