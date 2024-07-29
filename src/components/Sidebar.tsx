import {
  ChatBubbleOvalLeftIcon as ChatOutlineIcon,
  PlusIcon,
  MagnifyingGlassIcon as SearchOutlineIcon,
  UserIcon as UserOutlineIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import ShowContext from "../utils/showContext";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

const Sidebar = () => {
  const { pathname } = useLocation();

  const iconStyle = "w-6 h-6";

  const list: {
    url: string;
    outlineIcon: JSX.Element;
  }[] = [
    {
      url: "/chat",
      outlineIcon: <ChatOutlineIcon className={iconStyle} />,
    },
    {
      url: "plus",
      outlineIcon: <PlusIcon className={iconStyle} />,
    },
    {
      url: "/search",
      outlineIcon: <SearchOutlineIcon className={iconStyle} />,
    },
    {
      url: `/account`,
      outlineIcon: <UserOutlineIcon className={iconStyle} />,
    },
  ];

  const navigate = useNavigate();

  const { setIsShow, setContent } = useContext(ShowContext);

  const [name, setName] = useState<string>("");

  return (
    <div className="fixed z-10 h-screen space-y-5 bg-[#DDDDDD] pt-[20px]">
      {list.map((l) => (
        <div className="group flex items-center justify-center" key={l.url}>
          {l.url !== "plus" && (
            <div
              className={`w-[4px] rounded-full bg-black transition-all duration-100 ease-in-out ${pathname.startsWith(`/app${l.url}`) ? "h-[40px]" : "h-[0px] group-hover:h-[20px]"}`}
            ></div>
          )}
          <div className="pl-[11px] pr-[15px]">
            <div
              className={
                `flex h-[50px] w-[50px] cursor-pointer items-center justify-center ` +
                `${!pathname.startsWith(`/app${l.url}`) ? "rounded-full bg-[#EEEEEE] transition duration-100 ease-in-out hover:rounded-[20px] hover:bg-blue-400 hover:text-white" : "rounded-[20px] bg-blue-400 text-white"} `
              }
              onClick={() => {
                if (l.url === "plus") {
                  setContent(
                    <div className="w-[500px] space-y-4 rounded-xl bg-[#EEEEEE] px-5 py-4 shadow">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">Create Channel</p>
                        <div className="flex items-center space-x-2">
                          <div className="h-[40px] w-[100px]">
                            <SecondaryButton
                              action={() => setIsShow(false)}
                              text="Cancel"
                              disabled={false}
                            />
                          </div>
                          <div className="h-[40px] w-[100px]">
                            <PrimaryButton
                              action={() => setIsShow(false)}
                              text="Save"
                              disabled={false}
                            />
                          </div>
                        </div>
                      </div>
                      <TextInput
                        disable={false}
                        label="Name"
                        value={name}
                        setValue={setName}
                      />
                    </div>,
                  );
                  setIsShow(true);
                  return;
                }
                navigate({ to: `/app/${l.url}` });
              }}
            >
              {l.outlineIcon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
