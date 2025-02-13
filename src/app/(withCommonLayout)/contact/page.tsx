/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/shared/Loading";
import { urls } from "@/utils/urls";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const storedSession = localStorage.getItem("userSession");
    const session = storedSession ? JSON.parse(storedSession) : null;
    const userEmail = session?.user?.email;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${urls}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          user: userEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#78CC6D] text-white p-10 rounded-xl shadow-xl flex flex-col justify-center h-full min-h-[400px]"
        >
          <h2 className="text-4xl font-extrabold">Contact Information</h2>
          <p className="text-white mt-3 text-lg">
            Reach out to me via email or visit my website.
          </p>

          <div className="mt-6 space-y-5 text-lg">
            <p className="text-white font-medium">
              📍 <span className="font-semibold">Location:</span> Mohakhali,
              Dhaka, Bangladesh
            </p>
            <p className="text-white font-medium">
              📧 <span className="font-semibold">Email:</span>{" "}
              <a href="halder25572@gmail.com" className="hover:underline">
                halder25572@gmail.com
              </a>
            </p>
            {/* <p className="text-white font-medium">
              🌐 <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://personal-portfolio-blog-website-hazel.vercel.app/"
                className="hover:underline"
              >
                https://personal-portfolio-blog-website-hazel.vercel.app
              </a>
            </p> */}
          </div>
          <div className="mt-6 flex space-x-6 text-xl">
            <a
              target="_blank"
              href=""
              className="text-white hover:text-gray-300 transition"
            >
              🔗 LinkedIn
            </a>
            <a
              target="_blank"
              href=""
              className="text-white hover:text-gray-300 transition"
            >
              🐦 Twitter
            </a>
            <a
              target="_blank"
              href=""
              className="text-white hover:text-gray-300 transition"
            >
              📘 Facebook
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-white p-10 rounded-xl shadow-xl border border-gray-200 flex flex-col justify-center h-full min-h-[400px]"
        >
          <h2 className="text-4xl font-extrabold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            I would love to hear from you! Feel free to drop me a message.
          </p>

          <form className="mt-6 flex flex-col space-y-6" onSubmit={sendMessage}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78CC6D]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78CC6D]"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78CC6D]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78CC6D] resize-none"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-[#78CC6D] text-white font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-[#78CC6D] transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
