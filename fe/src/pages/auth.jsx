import React, { useContext, useEffect, useState } from "react";
import {
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextInstance } from "../context/AppContext"; // Import global state

const Auth = () => {
  const { setUser, user } = useContext(ContextInstance); // Use global context
  const [cardState, setCardState] = useState("Sign In");
  const toast = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect if user is already logged in
  //   if (user) {
  //     navigate("/SolutionMaster"); // Redirect to SolutionMaster or any other page
  //   }
  // }, [user, navigate]);

  const toggleCardState = () => {
    setCardState(cardState === "Sign In" ? "Sign Up" : "Sign In");
    formik.resetForm();
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const userData = response.data.data;
        // Normalize to include user_id for consistency
        const normalizedUser = {
          ...userData,
          user_id: userData.userId, // Add user_id property
        };
        setUser(normalizedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        navigate("/"); // instead of "/source-selection"
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSignUp = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        toast({
          title: "Sign Up Successful",
          description: "You can now log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        toggleCardState();
      }
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: error.response?.data?.message || "Could not sign up.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        if (cardState === "Sign In") {
          await handleLogin(values);
        } else {
          await handleSignUp(values);
        }
      } catch (err) {
        setFieldError("email", err.response?.data?.message || "An error occurred.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <VStack spacing={6} p={8} color="white" minHeight="85vh" align="center" justify="center">
      <Box bg="black" py={12} px={8} borderRadius="xl" boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)" textAlign="center" maxW="600px" w="100%" border="1px solid gray">
        <Heading size="lg" color="white" mb={6}>{cardState}</Heading>
        <Text fontSize="md" color="gray.300" mb={8}>
          {cardState === "Sign In" ? "Sign in to access your account." : "Create an account to get started."}
        </Text>
        {formik.errors.email && formik.touched.email && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {formik.errors.email}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="unstyled"
            bg="rgba(255, 255, 255, 0.2)"
            p={4}
            borderRadius="md"
            color="white"
            border="1px solid rgba(255, 255, 255, 0.3)"
            mb={4}
          />
          {formik.errors.password && formik.touched.password && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {formik.errors.password}
            </Alert>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="unstyled"
            bg="rgba(255, 255, 255, 0.2)"
            p={4}
            borderRadius="md"
            color="white"
            border="1px solid rgba(255, 255, 255, 0.3)"
            mb={6}
          />
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            isLoading={formik.isSubmitting}
            isDisabled={formik.isSubmitting}
          >
            {cardState === "Sign In" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <Text
          fontSize="sm"
          mt={4}
          color="gray.400"
          _hover={{ color: "gray.200", cursor: "pointer" }}
          onClick={toggleCardState}
        >
          {cardState === "Sign In"
            ? "Don't have an account? Sign up here."
            : "Already have an account? Sign in here."}
        </Text>
      </Box>
    </VStack>
  );
};

export default Auth;
