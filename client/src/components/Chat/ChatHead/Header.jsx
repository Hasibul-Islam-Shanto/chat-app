import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatContext } from "../../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileLog from "../ChatAssets/ProfileLog";
import { useDisclosure } from "@chakra-ui/hooks";
import { GetAllusers, GetSingleChats } from "../../../api";
import UserList from "../ChatAssets/UserList";
import { getSender } from "../../../config/ChatLogins";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    setSelectedChat,
    chats,
    setChats,
    setAllUsers,
    notification,
    setNotification,
  } = useContext(ChatContext);
  useEffect(() => {
    const getAllusers = async () => {
      const res = await GetAllusers();
      setAllUsers(res.data);
      const filterData = res.data.filter((user) =>
        user.name.toLowerCase().includes(text.toString().toLowerCase())
      );
      setUsers(filterData);
    };
    getAllusers();
  }, [setAllUsers, text]);
  const accessChat = async (userId) => {
    try {
      const { data } = await GetSingleChats(userId);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
    onClose(true);
  };
  const logOut = async () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      <Box w="100%" p="3" bg="#fff" d="flex" justifyContent="space-between">
        <Box>
          <Tooltip hasArrow label="Search users" bg="gray.300" color="black">
            <Button
              sx={{
                displax: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: ".2rem .5rem",
                bg: "#fff",
                border: "1px solid #EEEEEE",
              }}
              onClick={onOpen}
            >
              <i
                className="bx bx-search-alt-2"
                style={{ padding: ".3rem" }}
              ></i>
              Search users...
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Text fontSize="1.8rem" fontWeight="bold">
            Chat-App
          </Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BellIcon fontSize="1.5rem" m="1" />}
              bg="#fff"
              marginRight="2rem"
            >
              {notification.length > 0 ? (
                <Text
                  position="absolute"
                  top="1"
                  right="3.5"
                  height="20px"
                  width="20px"
                  fontWeight="bold"
                  fontSize=".8rem"
                  backgroundColor="red"
                  borderRadius="50%"
                  padding=".2rem"
                  color="#fff"
                  textAlign="center"
                >
                  {notification.length}
                </Text>
              ) : (
                ""
              )}
            </MenuButton>
            <MenuList textAlign="center" w="2">
              {!notification.length && "No messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `${notif.chat.chatName}`
                    : `${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon fontSize="1.5rem" />}
            >
              <Avatar size="sm" name={user.data.name} src={user.data.pic} />
            </MenuButton>
            <MenuList>
              <ProfileLog user={user.data}>
                <MenuItem>Profile</MenuItem>
              </ProfileLog>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{user.data.name}</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Search users......"
              onChange={(e) => setText(e.target.value)}
            />
            {users.map((user, i) => (
              <UserList
                key={i}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
