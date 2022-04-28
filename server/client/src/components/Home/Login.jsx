import { Button, Input, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginData = async () => {
    setLoading(true);
    if (!user.email || !user.password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await logIn(user);
      if (res.status === 200) {
        toast({
          title: "Login successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo", JSON.stringify(res));
        setLoading(false);
        navigate("/chat");
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (token) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Email"
          type="text"
          size="md"
          p={5}
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          size="md"
          p={5}
          mt={3}
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          color="#fff"
          bg="#5D8BF4 "
          onClick={loginData}
          isLoading={loading}
          _hover={{
            bg: "#5D8BF4",
            color: "white",
          }}
        >
          Login
        </Button>
      </VStack>
    </>
  );
};

export default Login;
