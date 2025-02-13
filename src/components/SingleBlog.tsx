"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TSingleBlogProps } from "@/types/props.type";

const SingleBlog = ({ blog, index }: TSingleBlogProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          unoptimized={true}
          className="rounded-t-xl transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {blog.content.length > 100
            ? `${blog.content.substring(0, 100)}...`
            : blog.content}
        </p>
        <div className="mt-4">
          <Link
            href={`/blogs/${blog._id}`}
            className="text-[#78CC6D] font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleBlog;
