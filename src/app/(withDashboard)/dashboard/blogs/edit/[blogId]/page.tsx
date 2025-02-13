/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, FieldValues } from "react-hook-form";
import { uploadImageToImgBB } from "@/utils/uploadImageToImgBB";
import PPForm from "@/components/form/PPForm";
import PPInput from "@/components/form/PPInput";
import PPTextarea from "@/components/form/PPTextarea";
import PPSelect from "@/components/form/PPSelect";
import Loading from "@/components/shared/Loading";
import { urls } from "@/utils/urls";

const categoryOption = [
  { value: "Technology", label: "Technology" },
  { value: "Business", label: "Business" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Health", label: "Health" },
];

const EditBlog = () => {
  const { blogId } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<FieldValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${urls}/api/blogs/${blogId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blog details");
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [blogId]);

  const onUpdateBlog = async (data: FieldValues) => {
    setLoading(true);
    setError(null);

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

      if (data.image && data.image !== blog?.image) {
        const imageUrl = await uploadImageToImgBB(data.image);
        data.image = imageUrl;
      }

      const response = await fetch(`${urls}/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "user-email": userEmail,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog");
      }
      router.push("/dashboard/blogs");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  return (
    <PPForm
      onSubmit={onUpdateBlog}
      defaultValues={blog?.data}
      style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <PPInput
        required
        type="text"
        name="title"
        label="Title"
        placeholder="Enter blog title"
      />
      <PPTextarea
        required
        name="content"
        label="Content"
        placeholder="Write your blog content here..."
        rows={4}
      />

      <div className="mt-[-15px]">
        <Controller
          name="image"
          render={({ field: { onChange, ref }, fieldState: { error } }) => (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Image
              </label>
              <input
                type="file"
                className={`w-full border rounded-lg p-2 ${
                  error ? "border-red-500" : "border-gray-300"
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

      <PPSelect
        required
        name="category"
        label="Category"
        options={categoryOption}
      />

      <button
        type="submit"
        disabled={loading}
        className={`inline-block px-6 py-3 text-white font-medium text-lg rounded-lg shadow-md transition duration-300 ${
          loading ? "bg-gray-400" : "bg-[#78CC6D] hover:bg-[#51e23e]"
        }`}
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </PPForm>
  );
};

export default EditBlog;
