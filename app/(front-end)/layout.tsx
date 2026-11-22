import Footer from '@/components/layout/front-end/footer'
import Header from '@/components/layout/front-end/header'
import { CartStoreProvider } from '@/providers/cartProvider'
import { ReactNode } from 'react'

export default function FrontEndLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex-1">
                <CartStoreProvider>
                    {children}
                </CartStoreProvider>
            </main>
            <Footer />
        </>
    )
}
