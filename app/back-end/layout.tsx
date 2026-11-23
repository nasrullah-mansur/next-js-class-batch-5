import { sidebarLinks } from "@/data/dashboard-sidebar-link";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2 border-r min-h-screen p-4">
                <h2 className="flex justify-center py-4 border-b">Dashboard</h2>

                <div className="flex flex-col gap-2 mt-5">
                    {sidebarLinks.map((link, index) => (
                        <Link key={index} href={link.link}>{link.label}</Link>
                    ))}
                </div>
            </div>
            <div className="col-span-10 p-4">
                {children}
            </div>
        </div>
    )
}
