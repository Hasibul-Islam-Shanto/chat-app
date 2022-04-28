import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../../context/ChatProvider";
import ChatLoading from "../ChatAssets/ChatLoading";
import { getSenderData } from "../../../config/ChatLogins";
import { GetChats } from "../../../api";
import { AddIcon } from "@chakra-ui/icons";
import GroupChatModal from "./GroupChatModal";
import ChatList from "./ChatList";
import GroupChatList from "./GroupChatList";

const MyChats = ({ fetchAgain }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  console.log(chats);
  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await GetChats();
      setChats(data);
    };
    fetchChats();
  }, [setChats, fetchAgain]);
  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "25%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "20px", md: "25px" }}
          fontFamily="Work sans"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <GroupChatModal>
            <Button
              d="flex"
              fontSize={{ base: "15px", md: "10px", lg: "15px" }}
              rightIcon={<AddIcon />}
            >
              New Group
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#5D8BF4" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  {!chat.isGroupChat ? (
                    <ChatList
                      key={chat._id}
                      user={getSenderData(user, chat.users)}
                    />
                  ) : (
                    <GroupChatList chat={chat} />
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
