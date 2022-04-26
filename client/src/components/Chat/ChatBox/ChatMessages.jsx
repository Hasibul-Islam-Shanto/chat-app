import { Avatar,Box,Tooltip } from '@chakra-ui/react';
import React, { useContext } from 'react'
import InfiniteScroll from "react-infinite-scroller";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/ChatLogins';
import { ChatContext } from '../../../context/ChatProvider';

const ChatMessages = ({ messages }) => {
    const {user} = useContext(ChatContext)
  return (
    <>
      <Box>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user.data._id) ||
                isLastMessage(messages, i, user.data._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user.data._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                  marginTop: isSameUser(messages, m, i, user.data._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </Box>
    </>
  );
};

export default ChatMessages