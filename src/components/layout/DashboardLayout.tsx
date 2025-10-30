import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { RiExchange2Line, RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((p) => !p);

  return (
    <div className='w-full h-svh flex'>
      <aside
        className={clsx(
          " h-svh border-r bg-white z-10 transition-all duration-600 ease-in-out border-gray-100 sticky left-0 top-0 overflow-x-hidden",
          {
            "min-w-16": isCollapsed,
            "min-w-[250px]": !isCollapsed,
          }
        )}
      >
        <div className='h-20 border-b border-gray-100 p-4 w-full flex items-center justify-between box-border relative'>
          <img
            alt='AfriPay'
            src={"/public/favicon.svg"}
            className={clsx("absolute min-w-[31px] transition-all duration-600 ease-in-out", {
              "opacity-0": !isCollapsed,
            })}
          />
          <img
            alt='AfriPay'
            src={"/src/assets/logo.svg"}
            className={clsx("absolute min-w-[128px] transition-all duration-600 ease-in-out", {
              "opacity-0": isCollapsed,
            })}
          />
        </div>
        <div className={clsx("box-border py-8 flex flex-col gap-5 relative w-full")}>
          <div
            className={clsx("w-full absolute left-0 transition-all duration-600 ease-in-out", {
              "px-5": !isCollapsed,
              "px-2": isCollapsed,
            })}
          >
            <button
              className={clsx("flex items-center justify-start gap-2 px-3 py-2 w-full overflow-x-clip cursor-pointer", {
                "border border-gray-100 rounded-r-full [&_svg]:text-green-800 [&_span]:text-[#209d5a]": true, // used to display active route
              })}
            >
              <RiExchange2Line className='min-w-5' />
              {
                <span
                  className={clsx("text-sm transition-all duration-600 ease-in-out", {
                    "opacity-0": isCollapsed,
                  })}
                >
                  Transactions
                </span>
              }
            </button>
          </div>
        </div>
      </aside>
      <div className='flex-1 relative h-svh overflow-y-auto flex flex-col'>
        <header className='h-20 bg-white z-10 sticky top-0 right-0 border-b border-gray-100 p-4 w-full flex items-center justify-between box-border'>
          <button onClick={toggleSidebar} className='p-0 m-0 border-0 bg-transparent cursor-pointer'>
            {isCollapsed ? <RiSidebarUnfoldLine className='w-6 h-6 text-gray-600' /> : <RiSidebarFoldLine className='w-6 h-6 text-gray-600' />}
          </button>
        </header>
        <main className='flex-1 box-border px-5 py-10 flex flex-col'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
