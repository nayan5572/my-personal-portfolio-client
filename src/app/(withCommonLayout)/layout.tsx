import Navbar from "@/components/shared/Navbar";
import { TCommonLayoutProps } from "@/types/props.type";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



const CommonLayout = async ({ children }: TCommonLayoutProps) => {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <Navbar session={session} />
            <div className="min-h-screen w-[90%] mt-20 mx-auto">
                {children}
            </div>
        </div>
    );
};

export default CommonLayout;
