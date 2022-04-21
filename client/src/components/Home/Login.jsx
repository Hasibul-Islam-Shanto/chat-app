import { Box, Button, Input, VStack } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Email" type="text" size="md" p={5} />
        <Input placeholder="Password" type="password" size="md" p={5} mt={3} />
        <Button color="#fff" bg="#5D8BF4">
          Login
        </Button>
      </VStack>
    </>
  );
};

export default Login;
