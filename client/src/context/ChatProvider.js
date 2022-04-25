import React, { createContext, useEffect, useState } from "react";
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState([])
  const [selectedChat, setSelectedChat] = useState([])
  const [chats, setChats] = useState([])
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
