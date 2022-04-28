import React, { createContext, useState } from "react";
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        allUsers,
        setAllUsers,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
