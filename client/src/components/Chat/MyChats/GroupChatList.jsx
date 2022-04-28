import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

const GroupChatList = ({ chat }) => {
  return (
    <Box
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        bg: "#5D8BF4",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      mt={2}
      borderRadius="lg"
    >
      <Avatar mr={2} size="sm" cursor="pointer" />
      <Box>
        <Text>{chat.chatName}</Text>
      </Box>
    </Box>
  );
};

export default GroupChatList;
