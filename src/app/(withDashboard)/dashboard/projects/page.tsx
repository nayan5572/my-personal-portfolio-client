/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading";
import { TProject } from "@/types/project";
import { urls } from "@/utils/urls";

const ListsProjects = () => {
    const [projects, setProjects] = useState<TProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedSession = localStorage.getItem("userSession");
        const session = storedSession ? JSON.parse(storedSession) : null;
        const userEmail = session?.user?.email;

        if (!userEmail) {
            setError("User email not found. Please log in again.");
            setLoading(false);
            router.push("/login");
            return;
        }

        fetch(`${urls}/api/projects/user-projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-email": userEmail,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                return res.json();
            })
            .then((data) => {
                setProjects(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        const storedSession = localStorage.getItem("userSession");
        const session = storedSession ? JSON.parse(storedSession) : null;
        const userEmail = session?.user?.email;

        if (!userEmail) {
            router.push("/login");
            return;
        }
        try {
            const res = await fetch(`${urls}/api/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "user-email": userEmail,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete project");
            }

            setProjects(projects.filter((project) => project._id !== id));
        } catch (err) {
            setError("Error deleting project. Please try again.");
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center md:text-left">All Projects</h2>

            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-700 text-sm md:text-base">
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300 px-4 py-2 hidden lg:table-cell">Published Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <tr key={project._id} className="hover:bg-gray-50 text-sm md:text-base">
                                    <td className="border border-gray-300 px-4 py-2">{project.title}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center hidden lg:table-cell">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 p-2"
                                                onClick={() => router.push(`/dashboard/projects/edit/${project._id}`)}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 p-2"
                                                onClick={() => handleDelete(project._id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center text-gray-500 py-4">
                                    No projects available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project._id} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <span className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => router.push(`/dashboard/projects/edit/${project._id}`)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No projects available.</p>
                )}
            </div>
        </div>
    );
};

export default ListsProjects;
