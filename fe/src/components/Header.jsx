import React, { useContext } from "react";
import {
  Box,
  Flex,
  Image,
  HStack,
  Text,
  IconButton,
  Tooltip,
  Button,
  VStack,
} from "@chakra-ui/react";
import { FiChevronRight, FiChevronLeft, FiLogOut } from "react-icons/fi";
import { MdDashboard, MdSource, MdListAlt } from "react-icons/md";
import z_logo from "/src/assets/zensar-Z-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ContextInstance } from "../context/AppContext";
import "./Header.css";

const sidebarIcons = [
  { icon: MdSource, path: "/", label: "Retail Dashboard" },
  { icon: MdListAlt, path: "/demographics", label: "Demographics" },
  { icon: MdDashboard, path: "/sales-insight", label: "Sales Insight" },
  { icon: MdDashboard, path: "/product-insight", label: "Product Insight" },
  { icon: MdDashboard, path: "/sales-product-type", label: "Sales Product Type" },
];

const SIDEBAR_EXPANDED_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 60;

const Header = ({ user, children, showSidebar, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useContext(ContextInstance);

  const sidebarWidth = showSidebar
    ? sidebarOpen
      ? SIDEBAR_EXPANDED_WIDTH
      : SIDEBAR_COLLAPSED_WIDTH
    : 0;

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <Box height="100vh" width="100vw" bg="black" color="white" overflow="hidden" position="relative">
      {/* Sidebar */}
      {showSidebar && (
        <Box
          position="fixed"
          top="70px" // moves sidebar below the header
          left={0}
          height="calc(100vh - 70px)" // adjust height so it fits below the header
          width={sidebarOpen ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`}
          minWidth={sidebarOpen ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`}
          maxWidth={sidebarOpen ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`}
          bg="black"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          pt={0}
          transition="width 0.3s"
          boxShadow="none"
          zIndex={2000}
        >
          {/* Sidebar Toggle Icon - its own row */}
          <Flex
            w="100%"
            align="center"
            justify="center"
            py={3}
            bg="black"
            // borderBottom="1px solid rgba(255,255,255,0.15)"
            position="sticky"
            top={0}
            zIndex={2}
            cursor="pointer"
            onClick={handleSidebarToggle} // Make the whole row clickable
          >
            <IconButton
              icon={sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
              variant="ghost"
              color="white"
              fontSize="2xl"
              w="40px"
              aria-label="Toggle sidebar"
              _hover={{ bg: "#23234a" }}
              tabIndex={-1} // Prevent double focus
            />
            {sidebarOpen && (
              <Text
                ml={2}
                color="white"
                fontWeight="semibold"
                fontSize="md"
                letterSpacing="0.01em"
                userSelect="none"
              >
                COLLAPSE
              </Text>
            )}
          </Flex>
          {/* Sidebar icons (scrollable area) */}
          <Box
            w="100%"
            flex="1 1 0"
            minHeight={0}
            overflowY="auto"
            sx={{
              "::-webkit-scrollbar": { width: "0px", background: "transparent" },
              scrollbarWidth: "none",
            }}
            pt={2}
            pb={2}
            position="relative"
          >
            <VStack spacing={1} align="stretch" w="100%">
              {/* Sidebar navigation icons */}
              {sidebarIcons.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Tooltip label={item.label} placement="right" key={item.path} isDisabled={sidebarOpen}>
                    <Flex
                      align="center"
                      w="100%"
                      px={sidebarOpen ? 3 : 0}
                      py={2}
                      cursor="pointer"
                      bg={isActive ? "rgba(167,139,250,0.12)" : "transparent"}
                      borderRadius="md"
                      borderLeft={isActive ? "4px solid #a78bfa" : "4px solid transparent"}
                      _hover={{
                        bg: "rgba(167,139,250,0.18)",
                        color: "#a78bfa",
                      }}
                      onClick={() => navigate(item.path)}
                      transition="all 0.18s"
                      mb={1}
                      position="relative"
                      justifyContent={sidebarOpen ? "flex-start" : "center"}
                    >
                      <Box mr={sidebarOpen ? 3 : 0} ml={sidebarOpen ? 1 : 0}>
                        <item.icon size={26} color={isActive ? "#a78bfa" : "#fff"} />
                      </Box>
                      {sidebarOpen && (
                        <Text
                          color={isActive ? "#a78bfa" : "#fff"}
                          fontWeight={isActive ? "bold" : "normal"}
                          fontSize="md"
                          letterSpacing="0.01em"
                        >
                          {item.label}
                        </Text>
                      )}
                    </Flex>
                  </Tooltip>
                );
              })}
            </VStack>
          </Box>
          {/* Sidebar Footer */}
          <Box w="100%" px={sidebarOpen ? 2 : 0} pb={4} position="sticky" bottom={0} bg="black" zIndex={1}>
            {sidebarOpen && user && (
              <Box
                textAlign="center"
                width="100%"
                bg="black"
                color="white"
                borderRadius="md"
                p={3}
                fontSize="sm"
                mb={2}
                boxShadow="none"
              >
                <Text color="gray.400" fontSize="xs" mb={1}>
                  Logged in as:
                </Text>
                <Text color="white" fontWeight="bold" fontSize="md" wordBreak="break-all">
                  {user.username}
                </Text>
                <Button
                  mt={3}
                  w="100%"
                  colorScheme="red"
                  variant="outline"
                  fontWeight="bold"
                  size="sm"
                  leftIcon={<FiLogOut />}
                  onClick={() => {
                    handleLogout && handleLogout();
                    navigate("/auth");
                  }}
                  _hover={{ bg: "red.700", color: "white", borderColor: "red" }}
                >
                  Logout
                </Button>
              </Box>
            )}
            {!sidebarOpen && (
              <Tooltip label={user?.username || "Logout"} placement="right">
                <IconButton
                  w="100%"
                  colorScheme="red"
                  variant="ghost"
                  mb={3}
                  fontWeight="bold"
                  size="lg"
                  icon={<FiLogOut />}
                  aria-label="Logout"
                  onClick={() => {
                    handleLogout && handleLogout();
                    navigate("/auth");
                  }}
                  _hover={{ bg: "red.700", color: "white" }}
                  style={{ display: "flex", justifyContent: "center" }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      )}

      {/* Fixed Header (logo + heading) */}
      <Flex
        as="header"
        w="100vw"
        position="fixed"
        top={0}
        left={0}
        zIndex={2100}
        height="70px"
        bg="black"
        align="center"
        borderBottom="1px solid rgba(255,255,255,0.15)"
        px={6}
        style={{ minWidth: 0 }}
      >
        <HStack spacing={4}>
          <Image
            rounded="md"
            src={z_logo}
            alt="Zensar Logo"
            fit={"scale-down"}
            boxSize="40px"
          />
          <Text fontWeight={"medium"} fontSize="lg" letterSpacing="0.03em">
            DASHBOARD MANAGEMENT SYSTEM
          </Text>
        </HStack>
      </Flex>

      {/* Main Area (content below header) */}
      <Box
        ml={showSidebar ? (sidebarOpen ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`) : 0}
        pt="70px"
        transition="margin-left 0.3s"
        height="100vh"
        display="flex"
        flexDirection="column"
        minWidth={0}
        overflow="hidden"
      >
        <Box
          as="main"
          pt="20px"
          minH="calc(100vh - 70px)"
          width="100%"
          maxW="100vw"
          overflow="auto"
          sx={{
            "::-webkit-scrollbar": { width: "0px", background: "transparent" },
            scrollbarWidth: "none",
          }}
          display="flex"
          flexDirection="column"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;