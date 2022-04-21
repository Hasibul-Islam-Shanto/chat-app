import { Box, Button, Input, VStack } from "@chakra-ui/react";
import React,{useState} from "react";

const Singup = () => {
    const [click, setClick] = useState(false)
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Name" type="text" size="md" p={5} />
        <Input placeholder="Email" type="text" size="md" p={5} mt={3} />
        <Box d="flex" alignItems="center" justifyContent="center">
          <Input
            placeholder="Password"
            type={click ? "text" : "password"}
            size="md"
            p={5}
            mt={3}
          />
          <Button mt={3} ml={2} onClick={() => setClick(!click)}>
            {click ? "Hide" : "Show"}
          </Button>
        </Box>
        <Box d="flex" alignItems="center" justifyContent="center">
          <Input
            placeholder="Confirm password"
            type={click ? "text" : "password"}
            size="md"
            p={5}
            mt={3}
          />
          <Button mt={3} ml={2} onClick={() => setClick(!click)}>
            {click ? "Hide" : "Show"}
          </Button>
        </Box>
        <Box>
          <Box fontSize="1rem" fontWeight="bold" p={2}>
            Upload your image
          </Box>
          <Input placeholder="Name" type="file" size="md" p={1} opacity=".8" />
        </Box>
        <Button bg={"#5D8BF4"} color="#fff">Sign Up</Button>
      </VStack>
    </>
  );
};

export default Singup;
