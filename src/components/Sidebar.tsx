import {
  ChatBubbleOvalLeftIcon as ChatOutlineIcon,
  MagnifyingGlassIcon as SearchOutlineIcon,
  UserIcon as UserOutlineIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon as ChatSolidIcon,
  MagnifyingGlassIcon as SearchSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "@tanstack/react-router";

const Sidebar = () => {
  const { pathname } = useLocation();

  const iconStyle = "w-7 h-7";

  const list: {
    url: string;
    outlineIcon: JSX.Element;
    solidIcon: JSX.Element;
  }[] = [
    {
      url: "/chat",
      outlineIcon: <ChatOutlineIcon className={iconStyle} />,
      solidIcon: <ChatSolidIcon className={iconStyle} />,
    },
    {
      url: "/search",
      outlineIcon: <SearchOutlineIcon className={iconStyle} />,
      solidIcon: <SearchSolidIcon className={iconStyle} />,
    },
    {
      url: `/account`,
      outlineIcon: <UserOutlineIcon className={iconStyle} />,
      solidIcon: <UserSolidIcon className={iconStyle} />,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="fixed h-screen space-y-2 border-r-[1.5px] border-gray-300 px-[30px] pt-10">
      {list.map((l) => (
        <div
          className={`flex w-[70px] items-center space-x-4 rounded-xl py-4 pl-5 ${!pathname.startsWith(`/menu${l.url}`) && "cursor-pointer hover:bg-gray-200"}`}
          onClick={() =>
            !pathname.startsWith(`/menu${l.url}`) &&
            navigate({ to: `/menu${l.url}` })
          }
          key={l.url}
        >
          {pathname.startsWith(`/menu${l.url}`) ? l.solidIcon : l.outlineIcon}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
