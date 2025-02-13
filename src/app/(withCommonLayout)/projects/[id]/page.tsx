"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/shared/Loading";
import { TProject } from "@/types/project";
import SingleProject from "@/components/SingleProject";
import { urls } from "@/utils/urls";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<TProject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`${urls}/api/projects/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Project not found");
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error || !product) {
        return <div className="text-center text-red-500 py-20">Error: {error || "Project not found"}</div>;
    }

    return (
        <div>
            <SingleProject project={product} />
        </div>
    );
};

export default SingleProduct;

