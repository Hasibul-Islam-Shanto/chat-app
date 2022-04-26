import { Text, Image, IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileLog = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="1.5rem" textAlign="center">
              {user.name}
            </Text>
            <Image src={user.pic} alt="" style={{ borderRadius: "2rem" }} />

            <Text fontSize="1.5rem" textAlign="center">
              {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileLog;
