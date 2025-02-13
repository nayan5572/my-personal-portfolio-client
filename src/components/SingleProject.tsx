"use client";
import { TSingleProjectProps } from "@/types/props.type";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleProject = ({ project }: TSingleProjectProps) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            unoptimized={true}
            className="brightness-75"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
            {project.title}
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold text-gray-700">Published:</span>{" "}
          {new Date(project.createdAt || "").toLocaleDateString()}
        </p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-800 text-lg leading-relaxed mt-4"
        >
          {project.description}
        </motion.p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 text-white bg-[#78CC6D] rounded-lg hover:bg-[#78CC6D] transition font-medium"
            >
              Live Preview <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
