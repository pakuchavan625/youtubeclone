import {
  ArrowLeftIcon,
  BellDot,
  Menu,
  MicIcon,
  SearchIcon,
  User2Icon,
  VideoIcon,
} from "lucide-react";
import Logo from "../assets/new-youtube-logo-2.jpeg";
import { useState } from "react";
import { useSidebar } from "../context/SidebarContext";


const PageHeader = () => {
  const [showFulwidth, setShowFullWidth] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6  mx-4">
       <PageHeaderFirts hidden={showFulwidth} />
        {showFulwidth && (
          <button
            onClick={() => setShowFullWidth(false)}
            className=" hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0"
          >
            <ArrowLeftIcon />
          </button>
        )}

        <form
          className={` gap-4 flex-grow justify-center ${
            showFulwidth ? "flex" : "md:flex hidden"
          }`}
        >
          <div className="flex flex-grow justify-center max-w-[600px]">
            <input
              type="search"
              placeholder="search"
              className="rounded-l-full w-full py-1 px-2 text-lg border border-bg-gray-200 shadow-inner shadow-gray-100 focus:border-blue-500 outline-none"
            />
            <button className="hover:bg-neutral-300 bg-neutral-200  py-2 px-4 rounded-r-full flex justify-center items-center">
              <SearchIcon />
            </button>
          </div>
          <div className="hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0">
            <MicIcon />
          </div>
        </form>
        <div
          className={`md:gap-2 items-center flex-shrink-0 ${
            showFulwidth ? "hidden" : "flex"
          }`}
        >
          <button
            onClick={() => setShowFullWidth(true)}
            className="md:hidden hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0"
          >
            <SearchIcon />
          </button>
          <button className="md:hidden hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0">
            <MicIcon />
          </button>
          <button className="hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0">
            <VideoIcon />
          </button>
          <button className="hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0">
            <BellDot />
          </button>
          <button className="hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center flex-shrink-0">
            <User2Icon />
          </button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;


export function PageHeaderFirts({hidden}: {hidden?: boolean}) {
  const {toggle} = useSidebar();
  return (
    <div
    className={`gap-5 lg:gap-10 items-center flex-shrink-0 ${
      hidden ? "hidden" : "flex"
    }`}
  >
    <button onClick={toggle} className="hover:bg-neutral-300 w-10 h-10 p-2.5 rounded-full flex justify-center items-center">
      <Menu />
    </button>
    <img src={Logo} alt="logo" className="h-10" />
  </div>
  )
}
