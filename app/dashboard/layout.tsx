import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <h1>This is header</h1>

            {children}

            <h1>This is footer</h1>
        </div>
    )
}
