import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { BiTrashAlt } from "react-icons/bi";
import { useDeleteChat } from "../../hooks/chat/useDeleteChat";
import { VscLoading } from "react-icons/vsc";

const ContextMenuDemo = ({ children, messageId, publicId, remoteUserId }) => {
  const { deleteChat, deletion } = useDeleteChat();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="">{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={5}
          align="end"
        >
          <ContextMenu.Item asChild className="w-full ">
            <button
              type="button"
              className={`w-full p-2 bg-red-500/30 text-red-500 flex items-center gap-1 hover:bg-red-500/70 hover:text-red-900 ${
                deletion && "btn-disabled"
              }`}
              disabled={deletion}
              onClick={() => deleteChat({ messageId, publicId, remoteUserId })}
            >
              {deletion ? (
                <>
                  <VscLoading className="w-5 h-5 mr-2 animate-spin" />
                  <span>Deletion</span>
                </>
              ) : (
                <>
                  <BiTrashAlt className="w-5 h-5 mr-2" />
                  <span>Delete</span>
                </>
              )}
            </button>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default ContextMenuDemo;
