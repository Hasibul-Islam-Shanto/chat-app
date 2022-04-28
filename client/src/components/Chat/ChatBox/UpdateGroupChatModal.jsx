import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/ChatProvider";
import UserBadge from "../ChatAssets/UserBadge";
import {
  RenameGroup,
  AddNewGroupMember,
  RemoveGroupMember,
} from "../../../api";
import UserList from "../ChatAssets/UserList";

const GroupChatModal = ({ setFetchAgain, fetchAgain }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, allUsers } = useContext(ChatContext);
  const [groupChatName, setGroupChatName] = useState();
  const [renameloading, setRenameLoading] = useState(false);
  const [grpUser, setGrpUser] = useState([]);
  const [text, setText] = useState();
  const toast = useToast();

  // Remove member from group......
  const handleRemove = async (listuser) => {
    if (
      selectedChat.groupAdmin._id !== user.data._id &&
      listuser._id !== user.data._id
    ) {
      toast({
        title: "Only admin can remove members.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const { data } = RemoveGroupMember({
        chatId: selectedChat._id,
        userId: listuser._id,
      });
      listuser._id === user.data._id
        ? setSelectedChat()
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error occur.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Update group name....
  const newGroupdata = {
    chatId: selectedChat._id,
    chatName: groupChatName,
  };
  const handleRename = async () => {
    if (!groupChatName) {
      toast({
        title: "Please input group name.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setRenameLoading(true);
      const { data } = await RenameGroup(newGroupdata);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something is wrong.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Add new member in group...
  const handleGroup = async (listuser) => {
    if (selectedChat.users.find((us) => us._id === listuser._id)) {
      toast({
        title: "User already added.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user.data._id) {
      toast({
        title: "Only admin can add members.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const { data } = await AddNewGroupMember({
        chatId: selectedChat._id,
        userId: listuser._id,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something wrong.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    const getAllusers = async () => {
      const filterData = allUsers.filter((newUser) =>
        newUser.name.toLowerCase().includes(text.toString().toLowerCase())
      );
      setGrpUser(filterData);
    };
    getAllusers();
  }, [allUsers, text]);
  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadge
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                bg="#5D8BF4"
                color="#fff"
                _hover={{
                  bg: "#2666CF",
                  color: "white",
                }}
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => setText(e.target.value)}
              />
            </FormControl>
            <Box w="100%" h="20vh" overflowY="scroll">
              {grpUser.map((alluser) => (
                <UserList
                  key={alluser._id}
                  user={alluser}
                  handleFunction={() => handleGroup(alluser)}
                />
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user.data)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
