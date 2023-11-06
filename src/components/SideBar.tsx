import {ClapperboardIcon,HomeIcon,LibraryIcon,Repeat1Icon,ChevronUp,ChevronDown,Watch,HistoryIcon,} from "lucide-react";
import SmallSideBarItem from "./SmallSideBarItem";
import React, { useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import { PageHeaderFirts } from "../layouts/PageHeader";

export const SideBar = () => {
  const sidebarItems = [
    { Icon: <HomeIcon />, title: "Home", url: "/" },
    { Icon: <ClapperboardIcon />, title: "Subscription", url: "/subscription" },
    { Icon: <Repeat1Icon />, title: "Shorts", url: "/shorts" },
    { Icon: <LibraryIcon />, title: "Library", url: "/Library" },
  ];
  const sidebarItems2 = [
    { Icon: <HistoryIcon />, title: "History", url: "/" },
    { Icon: <Watch />, title: "Subscription", url: "/subscription" },
    { Icon: <Repeat1Icon />, title: "Shorts", url: "/shorts" },
    { Icon: <LibraryIcon />, title: "Library", url: "/Library" },
    { Icon: <Repeat1Icon />, title: "Shorts", url: "/Library" },
  ];

  const { isSmallOpen, isLargOpen, close } = useSidebar();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto pb-2 flex flex-col gap-4 ml-1 ${
          isLargOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        {sidebarItems.map((item, index) => {
          return <SmallSideBarItem key={index} {...item} />;
        })}
      </aside>
      {isSmallOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
          onClick={close}
        ></div>
      )}

      <aside
        className={`w-56 lg:sticky absolute top-0 z-20 lg:flex flex-col gap-1 pb-2 overflow-y-auto  ${
          isLargOpen ? "flex" : "lg:hidden"
        } ${isSmallOpen ? "flex  z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 p-b-4 px-3">
          <PageHeaderFirts />
        </div>

        <LargeSideBarSection visibleItems={1}>
          <LargrSideBarItem Icon={<HomeIcon />} title="Home" url="/" isActive />
          {sidebarItems2.map((item, index) => {
            return <LargrSideBarItem key={index} {...item} />;
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItems={3} title="Subscription">
          {sidebarItems2.map((item, index) => {
            return <LargrSideBarItem key={index} {...item} />;
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItems={3} title="Explore">
          {sidebarItems2.map((item, index) => {
            return <LargrSideBarItem key={index} {...item} />;
          })}
        </LargeSideBarSection>
        <LargeSideBarSection visibleItems={3} title="Channels">
          {sidebarItems2.map((item, index) => {
            return <LargrSideBarItem key={index} {...item} />;
          })}
        </LargeSideBarSection>
      </aside>
    </>
  );
};


interface LargeSideBarSectionProps {
  children?: React.ReactNode;
  title?: string;
  visibleItems: number;
}

function LargeSideBarSection({
  children,
  visibleItems,
  title,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const showExpandButton =
    React.Children.toArray(children).length > visibleItems;
  const visibleChildren = isExpanded
    ? children
    : React.Children.toArray(children).slice(0, visibleItems);
  return (
    <>
      <div className="text-sm font-bold text-gray-500 uppercase px-4 py-2">
        {title}
        {visibleChildren}

        {showExpandButton && (
          <button
            className="flex items-center gap-2 w-full text-left"
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            <div>{isExpanded ? <ChevronUp /> : <ChevronDown />}</div>
            <div>{isExpanded ? "Show Less" : "Show More"}</div>
          </button>
        )}
      </div>
    </>
  );
}

interface LargrSideBarItemProps {
  Icon: React.ReactNode;
  title: string;
  url: string;
  isActive?: boolean;
}

function LargrSideBarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargrSideBarItemProps) {
  return (
    <>
      <a href={url} className="w-full flex items-center rounded-lg gap-2 ">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isActive
              ? "text-white bg-secondary-dark"
              : "text-gray-500 hover:bg-secondary-dark hover:text-white"
          }`}
        >
          <div className="w-6 h-6">{Icon}</div>
          <div>{title}</div>
        </div>
      </a>
    </>
  );
}
