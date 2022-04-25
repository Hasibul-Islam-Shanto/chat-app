import { Box, Button, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { singnUp } from "../../api";

const Singup = () => {
  const [click, setClick] = useState(false);
  const [pic, setPic] = useState();
  const toast = useToast();
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const picDetails = async (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "shanto78");
        const imgData = await axios.post(
          "https://api.cloudinary.com/v1_1/shanto78/image/upload",
          data
        );
        setPic(imgData.data.url.toString());
        window.location.reload();
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandle = async () => {
   if(user.password !== user.cpassword){
      toast({
        title: "Password not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
   }
    try {
      const res = await singnUp({
        name: user.name,
        email: user.email,
        password: user.password,
        pic,
      });
      if(res.status === 200){
        toast({
          title: "Signup successfull.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      }else{
         toast({
           title: "Signup failed.",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Name"
          type="text"
          size="md"
          p={5}
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="text"
          size="md"
          p={5}
          mt={3}
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Box d="flex" alignItems="center" justifyContent="center">
          <Input
            placeholder="Password"
            type={click ? "text" : "password"}
            size="md"
            p={5}
            mt={3}
            name="password"
            value={user.password}
            onChange={handleChange}
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
            name="cpassword"
            value={user.cpassword}
            onChange={handleChange}
          />
          <Button mt={3} ml={2} onClick={() => setClick(!click)}>
            {click ? "Hide" : "Show"}
          </Button>
        </Box>
        <Box>
          <Box fontSize="1rem" fontWeight="bold" p={2}>
            Upload your image
          </Box>
          <Input
            placeholder="Name"
            type="file"
            size="md"
            p={1}
            opacity=".8"
            onChange={(e) => picDetails(e.target.files[0])}
          />
        </Box>
        <Button bg={"#5D8BF4"} color="#fff" onClick={submitHandle}>
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Singup;
