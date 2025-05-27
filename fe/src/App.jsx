import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import AppRoutes from "./routes/AppRoutes";
// import AppRoutes from "../routes/AppRoutes";

const App = () => {
  return (
    <Flex>
      <AppRoutes />
    </Flex>
  );
};

export default App;
