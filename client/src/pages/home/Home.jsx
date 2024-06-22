import React from "react";
import { Aside } from "../../components";
import ChattingArea from "../../components/chat/ChattingArea";
import AsideMenus from "../../components/aside/AsideMenus";

const Home = () => {
  return (
    <div className="flex h-full">
      <AsideMenus />

      <div className="divider divider-horizontal max-[620px]:hidden"></div>
      <Aside />
      <div className="divider divider-horizontal max-[620px]:hidden"></div>
      <ChattingArea />
    </div>
  );
};

export default Home;
