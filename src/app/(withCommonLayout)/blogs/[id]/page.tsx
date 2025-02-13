"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/shared/Loading";
import { TBlog } from "@/types/blog";
import { urls } from "@/utils/urls";
const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<TBlog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`${urls}/api/blogs/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Blog not found");
                }
                return res.json();
            })
            .then((data) => {
                setBlog(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading />
    }

    if (error || !blog) {
        return <div className="text-center text-red-500 py-20">Error: {error || "Blog not found"}</div>;
    }

    return (
        <div>
            <div className="bg-gray-50 min-h-screen">
                <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            layout="fill"
                            objectFit="cover"
                            unoptimized={true}
                            className="brightness-90"
                        />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
                            {blog.title}
                        </h1>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
                    <p className="text-gray-600 text-sm mb-4">
                        Published on{" "}
                        <span className="font-semibold text-gray-800">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-gray-800 text-lg leading-relaxed mt-2"
                    >
                        {blog.content}
                    </motion.p>
                    <div className="mt-10">
                        <Link
                            href="/blogs"
                            className="flex items-center gap-2 px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            <ArrowLeft size={16} /> Back to Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
