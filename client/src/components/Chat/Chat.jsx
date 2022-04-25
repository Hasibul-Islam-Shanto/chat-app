import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import Chatbox from "./Chatbox";
import Header from "./Header";
import MyChats from "./MyChats";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useContext(ChatContext);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Box w="100%" height="100vh" bg="#5D8BF4">
        {user && <Header />}
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="90vh"
          p="10px"
        >
          {user && <MyChats />}
          {user && <Chatbox />}
        </Box>
      </Box>
    </>
  );
};

export default Chat;
