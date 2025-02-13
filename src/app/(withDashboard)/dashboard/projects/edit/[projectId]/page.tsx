/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, FieldValues } from "react-hook-form";
import { uploadImageToImgBB } from "@/utils/uploadImageToImgBB";
import PPForm from "@/components/form/PPForm";
import PPInput from "@/components/form/PPInput";
import PPTextarea from "@/components/form/PPTextarea";
import { urls } from "@/utils/urls";

const EditProject = () => {
    const { projectId } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<FieldValues | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${urls}/api/projects/${projectId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch project details");
                }
                return res.json();
            })
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, [projectId]);

    const onUpdateProject = async (data: FieldValues) => {
        setLoading(true);

        try {
            const storedSession = localStorage.getItem("userSession");
            if (!storedSession) {
                throw new Error("User session not found. Please log in again.");
            }

            const session = JSON.parse(storedSession);
            const userEmail = session?.user?.email;

            if (!userEmail) {
                throw new Error("User email not found in session.");
            }

            data.user = userEmail;

            if (data.image && data.image !== project?.image) {
                const imageUrl = await uploadImageToImgBB(data.image);
                data.image = imageUrl;
            }

            const response = await fetch(`${urls}/api/projects/${projectId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "user-email": userEmail,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update project");
            }
            router.push("/dashboard/projects");

        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading project details...</div>;
    }

    return (
        <PPForm onSubmit={onUpdateProject} defaultValues={project?.data} style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0px 2px 6px rgba(0,0,0,0.1)" }}>
            <h3 className="text-xl font-semibold mb-4">Edit Project</h3>

            <PPInput required type="text" name="title" label="Project Title" placeholder="Enter project title" />

            <div className="mt-[-15px]">
                <Controller
                    name="image"
                    render={({ field: { onChange, ref }, fieldState: { error } }) => (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Project Image
                            </label>
                            <input
                                type="file"
                                className={`w-full border rounded-lg p-2 ${error ? "border-red-500" : "border-gray-300"
                                    }`}
                                ref={ref}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onChange(file);
                                    }
                                }}
                            />
                            {error && (
                                <small className="text-red-500">
                                    {error.message || "This field is required"}
                                </small>
                            )}
                        </div>
                    )}
                />
            </div>

            <PPInput required type="text" name="liveLink" label="Live Project Link" placeholder="Enter project live URL" />

            <PPTextarea required name="description" label="Project Description" placeholder="Describe your project..." rows={4} />

            <button type="submit" disabled={loading} className={`inline-block px-6 py-3 text-white font-medium text-lg rounded-lg shadow-md transition duration-300 ${loading ? "bg-gray-400" : "bg-[#1e16df] hover:bg-[#3830cf]"}`}>
                {loading ? "Updating..." : "Update Project"}
            </button>
        </PPForm>
    );
};

export default EditProject;
