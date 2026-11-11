import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <h1>Public Header</h1>
            {children}
            <h1>Public Footer</h1>
        </div>
    )
}
