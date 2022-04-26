import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getSender, getSenderDetails } from "../../../config/ChatLogins";
import { ChatContext } from "../../../context/ChatProvider";
import ProfileLog from "../ChatAssets/ProfileLog";
import ChatMessages from "./ChatMessages";
import GroupChatModal from "./UpdateGroupChatModal";
import { SendMessage, GetMessages } from "../../../api";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      setNewMessage("");
      try {
        const { data } = await SendMessage({
          content: newMessage,
          chatId: selectedChat._id,
        });
        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Something wrong.",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator....
  };
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      console.log(selectedChat._id)
      const { data } = await GetMessages(selectedChat._id);
      setMessages(data);
      setLoading(false)
    };
    fetchMessages();
  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileLog user={getSenderDetails(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <GroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Messagesss..... */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box d="flex" flexDirection="column" overflowY="scroll">
                <ChatMessages messages={messages} />
              </Box>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
