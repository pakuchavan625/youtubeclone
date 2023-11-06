interface SmallSideBarItemProps {
    Icon: React.ReactNode;
    title: string;
    url: string;
}

const SmallSideBarItem = ({Icon, title, url}:SmallSideBarItemProps) => {
  return (
    <div>
        <a href={url} className="hover:bg-neutral-400 py-3 px-1 flex flex-col justify-center items-center ">
            <p className="w-6 h-6 ">{Icon}</p>
            <div className="text-xs ">{title}</div>
        </a>
    </div>
  )
}

export default SmallSideBarItem