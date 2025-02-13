import ProductCart from "@/components/shared/ProductCart";
import { TProject } from "@/types/project";
import { urls } from "@/utils/urls";

const ProjectsPage = async () => {
    const res = await fetch(`${urls}/api/projects`)
    const data = await res.json();

    return (
        <div className="relative w-full bg-[#fbfbfe] py-16 px-6 md:px-12 lg:px-24">
            <div className="mx-auto">
                <div className="text-4xl font-extrabold text-gray-900 text-center">
                    All Projects
                </div>
                <div className="text-gray-600 text-lg text-center mt-4">
                    A showcase of my best projects, built with modern web technologies.
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.data.map((project: TProject, index: number) => (
                        <ProductCart key={project._id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
