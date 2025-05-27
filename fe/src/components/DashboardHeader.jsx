import React from "react";
import { Flex, HStack, Box, Heading, Select, Icon, Text } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";

// You can pass filterOptions, title, icon, and onChange as props
const DashboardHeader = ({
  title = "Retail Insight Dashboard",
  icon = MdShoppingCart,
  filterOptions = [
    { label: "Year&Month", options: ["All"] },
    { label: "Country", options: ["All"] },
    { label: "Customer Segment", options: ["All"] },
    { label: "Product Category", options: ["All"] },
  ],
  onFilterChange,
}) => (
  <Flex
    align="center"
    justify="space-between"
    bg="linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)"
    borderRadius="xl"
    px={[4, 8]}
    py={4}
    mb={6}
    boxShadow="lg"
  >
    <HStack spacing={3}>
      <Box
        bg="#6366f1"
        borderRadius="full"
        p={2}
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={icon} w={7} h={7} color="white" />
      </Box>
      <Heading size="lg" color="white" fontWeight="bold" letterSpacing="tight">
        {title}
      </Heading>
    </HStack>
    <HStack spacing={3}>
      {filterOptions.map((filter, idx) => (
        <Box key={filter.label}>
          <Select
            size="sm"
            bg="#fff"
            color="black"
            borderRadius="md"
            fontWeight="semibold"
            minW="120px"
            defaultValue="All"
            _focus={{ outline: "none" }}
            onChange={onFilterChange ? (e) => onFilterChange(filter.label, e.target.value) : undefined}
          >
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
          <Text fontSize="xs" color="gray.900" textAlign="center" mt={1}>
            {filter.label}
          </Text>
        </Box>
      ))}
    </HStack>
  </Flex>
);

export default DashboardHeader;