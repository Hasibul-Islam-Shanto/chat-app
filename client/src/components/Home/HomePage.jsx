import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import Singup from "./Singup";

const HomePage = () => {
  return (
    <>
      <Box bg="#5D8BF4" height="100vh" w="100%">
        <Container maxW="xl" centerContent>
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            fontSize="1.5rem"
            borderRadius="1rem"
            marginTop={"2rem"}
            fontWeight="bold"
          >
            Chat Application
          </Box>
          <Box bg={"white"} w="100%" p={4} borderRadius="2rem" marginTop="2rem">
            <Tabs variant="soft-rounded">
              <TabList>
                <Tab w="50%">Login</Tab>
                <Tab w={"50%"}>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login/>
                </TabPanel>
                <TabPanel>
                 <Singup/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
