import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogins";
import { GetChats } from "../../api";
import { AddIcon } from "@chakra-ui/icons";

const MyChats = () => {
  // const [loggedUser, setLoggedUser] = useState({});
  const { user,selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    const fetchChats = async () => {
      const { data } = await GetChats();
      setChats(data);
    };
    fetchChats();
  }, [setChats]);
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
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
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
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </Text>
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
