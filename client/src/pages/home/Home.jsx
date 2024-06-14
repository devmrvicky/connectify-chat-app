import React from "react";
import { Aside } from "../../components";
import ChattingArea from "../../components/chat/ChattingArea";

const Home = () => {
  return (
    <div className="flex h-full">
      <Aside />
      <div className="divider divider-horizontal max-[620px]:hidden"></div>
      <ChattingArea />
    </div>
  );
};

export default Home;
