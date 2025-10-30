import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { CgMenuRightAlt } from "react-icons/cg";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { useResponsive } from "../../hooks/useResponsive";
import DrawerBase from "../drawer";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { md } = useResponsive();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((p) => !p);

  return (
    <>
      <div className='w-full h-svh flex'>
        {md && <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />}
        <div className='flex-1 relative h-svh overflow-y-auto flex flex-col'>
          <header className='min-h-20 bg-white z-10 sticky top-0 right-0 border-b border-gray-100 p-4 w-full flex items-center justify-between box-border'>
            {md && (
              <button onClick={toggleSidebar} className='p-0 m-0 border-0 bg-transparent cursor-pointer'>
                {isCollapsed ? <RiSidebarUnfoldLine className='w-6 h-6 text-gray-600' /> : <RiSidebarFoldLine className='w-6 h-6 text-gray-600' />}
              </button>
            )}
            {!md && (
              <>
                <img alt='AfriPay' src={"/src/assets/logo.svg"} className={clsx("min-w-[128px]")} />
                <button
                  onClick={toggleSidebar}
                  className={clsx("p-1.5 hover:bg-gray-50 border border-gray-200 rounded-md m-0 bg-transparent cursor-pointer", {
                    hidden: isCollapsed,
                  })}
                >
                  <CgMenuRightAlt className='w-6 h-6 text-gray-600' />
                </button>
              </>
            )}
          </header>
          <main className='flex-1 box-border px-5 py-10 flex flex-col'>
            <Outlet />
          </main>
        </div>
      </div>
      {!md && (
        <DrawerBase
          disableOverlayClick
          className='px-2 py-0! max-w-[350px]!'
          width='80%'
          hideClose
          position='left'
          isOpen={isCollapsed}
          onClose={toggleSidebar}
        >
          <Sidebar isCollapsed={false} onToggle={toggleSidebar} />
        </DrawerBase>
      )}
    </>
  );
};

export default DashboardLayout;
