import React, { useContext, useState, createContext } from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import { ContextInstance } from "../context/AppContext";
import { useLocation } from "react-router-dom";

// Create a context to provide table header styles globally
export const TableHeaderStyleContext = createContext({
  theadStyle: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    background: "#23232a",
  },
  thProps: {
    color: "#fff",
    fontSize: "md",
    bg: "#23232a",
    py: 4,
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
});

const AppLayout = ({ children }) => {
  const { user } = useContext(ContextInstance);
  const location = useLocation();

  // Only show sidebar/content shift if user is logged in and not on /auth
  const showSidebar = user && location.pathname !== "/auth";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TableHeaderStyleContext.Provider
      value={{
        theadStyle: {
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "black",
        },
        thProps: {
          color: "#fff",
          fontSize: "md",
          bg: "#23232a",
          py: 4,
          textTransform: "uppercase",
          letterSpacing: "wider",
        },
      }}
    >
      <Flex minH="100vh" bg="black" color="white" overflow="hidden">
        <Header
          user={user}
          showSidebar={showSidebar}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          {/* children will be rendered in the main area of Header */}
          {children}
        </Header>
      </Flex>
    </TableHeaderStyleContext.Provider>
  );
};

export default AppLayout;