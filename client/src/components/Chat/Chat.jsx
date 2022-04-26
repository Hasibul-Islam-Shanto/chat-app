import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import Chatbox from "./ChatBox/Chatbox";
import Header from "./ChatHead/Header";
import MyChats from "./MyChats/MyChats";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

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
        <Box d="flex" justifyContent="space-between" w="100%" h="90vh" p="10px">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chat;
