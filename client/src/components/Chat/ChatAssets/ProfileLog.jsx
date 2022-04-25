import { Text, Image } from "@chakra-ui/react";
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

const ProfileLog = ({ user, children }) => {
  const { name, pic, email } = user.data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : ""}

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="1.5rem" textAlign="center">
              {name}
            </Text>
            <Image src={pic} alt="" style={{ borderRadius: "2rem" }} />

            <Text fontSize="1.5rem" textAlign="center">
              {email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileLog;
