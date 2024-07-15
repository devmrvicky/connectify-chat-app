import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import LogoutBtn from "../LogoutBtn";
import AuthUserProfile from "../AuthUserProfile";
import { useMediaQuery } from "@uidotdev/usehooks";
import ThemeController from "./ThemeController";

const PopoverDemo = ({ children }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`absolute z-30 bottom-0 ${
            isSmallDevice ? "-left-[236px]" : "left-0"
          } rounded p-5 w-[260px] bg-slate-50 opacity-100 text-dark-text2 dark:bg-dark-bg2 dark:text-light-text2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade`}
          sideOffset={5}
        >
          <AuthUserProfile />
          <div className="divider my-2 divider-start">
            <span className="text-sm">options</span>
          </div>
          <ThemeController />
          <div className="divider m-0"></div>
          <div className="flex justify-between w-full p-2">
            <span>Logout</span>
            <LogoutBtn />
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow
            className="fill-white hidden"
            style={{ display: "none" }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const PopoverContent = ({ children }) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="max-[420px]:mx-2">
        {children[0]}
      </Popover.Trigger>
      <Popover.Content width="360px" sideOffset={20} className="z-20">
        {children[1]}
      </Popover.Content>
    </Popover.Root>
  );
};

export default PopoverDemo;
export { PopoverContent };
