
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Suspense } from "react";




const  MainLayout = async({
    children
}: {
    children : React.ReactNode;

}) => {

    console.log("this layout is working")

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
            <ModalProvider />
            <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
            {children}
            </main>
        </div>
    )
}


export default MainLayout