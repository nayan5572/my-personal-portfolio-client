import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Dashboard>
            {children}
        </Dashboard>
    );
}
