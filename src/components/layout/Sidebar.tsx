import clsx from "clsx";
import { CgMenuRightAlt } from "react-icons/cg";
import { RiExchange2Line } from "react-icons/ri";
import { useResponsive } from "../../hooks/useResponsive";

interface SProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SProps> = ({ isCollapsed = false, onToggle }) => {
  const { md } = useResponsive();
  return (
    <aside
      className={clsx(
        "h-full md:h-svh md:border-r bg-white z-10 transition-all duration-600 ease-in-out border-gray-100 sticky left-0 top-0 overflow-x-hidden",
        {
          "min-w-16": isCollapsed && md,
          "min-w-[250px]": !isCollapsed || !md,
        }
      )}
    >
      <div className='h-20 border-b border-gray-100 py-4 md:p-4 w-full flex items-center justify-between box-border relative'>
        {md && (
          <img
            alt='AfriPay'
            src={"/public/favicon.svg"}
            className={clsx("absolute min-w-[31px] transition-all duration-600 ease-in-out", {
              "opacity-0": !isCollapsed,
            })}
          />
        )}
        <img
          alt='AfriPay'
          src={"/src/assets/logo.svg"}
          className={clsx("md:absolute min-w-[128px] transition-all duration-600 ease-in-out", {
            "opacity-0": isCollapsed && md,
          })}
        />
        {!md && (
          <button
            onClick={onToggle}
            className={clsx("p-1.5 hover:bg-gray-50 border border-gray-200 rounded-md m-0 bg-transparent cursor-pointer", { hidden: isCollapsed })}
          >
            <CgMenuRightAlt className='w-6 h-6 text-gray-600' />
          </button>
        )}
      </div>
      <div className={clsx("box-border py-8 flex flex-col gap-5 relative w-full")}>
        <div
          className={clsx("w-full absolute left-0 transition-all duration-600 ease-in-out", {
            "px-2": isCollapsed || !md,
            "px-5": !isCollapsed && md,
          })}
        >
          <button
            className={clsx("flex items-center justify-start gap-2 p-2.5 w-full overflow-x-clip cursor-pointer", {
              "border border-gray-100 rounded-r-full [&_svg]:text-green-800 [&_span]:text-[#209d5a]": true, // used to display active route
            })}
          >
            <RiExchange2Line className='min-w-5' />
            {
              <span
                className={clsx("text-sm transition-all duration-600 ease-in-out", {
                  "opacity-0": isCollapsed && md,
                })}
              >
                Transactions
              </span>
            }
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
