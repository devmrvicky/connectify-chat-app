import React from "react";
import { Aside } from "../../components";
import ChattingArea from "../../components/chat/ChattingArea";
import MainContentLayout from "../../components/layout/MainContentLayout";

const Home = () => {
  return (
    <MainContentLayout>
      <Aside />
      <ChattingArea />
    </MainContentLayout>
  );
};

export default Home;
