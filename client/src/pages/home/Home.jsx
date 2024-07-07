import React from "react";
import { Aside } from "../../components";
import ChattingArea from "../../components/chat/ChattingArea";
import MainContentLayout from "../../components/layout/MainContentLayout";
import useListMessages from "../../hooks/chat/useListMessages";

const Home = () => {
  // we call this hook here because I want to show message notification on sidebar of home page when user receive any message
  useListMessages();
  return (
    <MainContentLayout>
      <Aside />
      <ChattingArea />
    </MainContentLayout>
  );
};

export default Home;
