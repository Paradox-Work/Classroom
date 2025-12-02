import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
    return (
        <div className="min-h-screen border-r flex flex-col overflow-y-auto bg-white shadow-sm">
           <div className="p-6">
            <Logo/>
           
           </div>
           <div className="flex flex-col h-full">
            <SidebarRoutes />
            </div>
        </div>
    )}
