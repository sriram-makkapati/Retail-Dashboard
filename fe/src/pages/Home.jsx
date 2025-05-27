import React, { useContext } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  Flex,
  VStack,
  HStack,
  Badge,
  Tooltip,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  MdAttachMoney,
  MdAssessment,
  MdPeople,
  MdStar,
  MdDateRange,
  MdShoppingCart,
} from "react-icons/md";
import { ContextInstance } from "../context/AppContext";
import DashboardHeader from "../components/DashboardHeader";

const Home = () => {
  const { user, kpis, setKpis } = useContext(ContextInstance);

  const stats = [
    {
      icon: MdAttachMoney,
      label: "Total Sales",
      value: "$118M",
      color: "#6366f1", // Indigo
    },
    {
      icon: MdAssessment,
      label: "Total Quantity",
      value: "464K",
      color: "#0ea5e9", // Blue
    },
    {
      icon: MdStar,
      label: "Average Rating",
      value: "2.78",
      color: "#22d3ee", // Cyan
    },
    {
      icon: MdPeople,
      label: "Total Customers",
      value: "86.5K",
      color: "#818cf8", // Light Indigo
    },
    {
      icon: MdDateRange,
      label: "Peak Month",
      value: "Feb",
      color: "#64748b", // Slate
    },
  ];

  const categories = [
    { name: "Electronics", value: "$37bn", color: "#6366f1" },
    { name: "Books", value: "$28bn", color: "#0ea5e9" },
    { name: "Clothing", value: "$28bn", color: "#22d3ee" },
    { name: "Grocery", value: "$28bn", color: "#64748b" },
    { name: "Home Decor", value: "$28bn", color: "#334155" },
  ];

  const orderStatus = [
    { label: "Delivered", value: "$51M", color: "#6366f1" },
    { label: "Shipped", value: "$26M", color: "#0ea5e9" },
    { label: "Processing", value: "$22M", color: "#22d3ee" },
    { label: "Pending", value: "$19M", color: "#64748b" },
  ];

  const salesTrend = [
    9.2, 9.8, 10.1, 9.5, 10.5, 10.8, 11.2, 10.9, 10.3, 10.7, 9.9, 10.2,
  ];

  const segmentRatings = [
    { segment: "New", type: "Premium", x: 30, y: 3.2, value: 20, color: "#6366f1" },
    { segment: "Regular", type: "Regular", x: 50, y: 3.0, value: 40, color: "#0ea5e9" },
    { segment: "Premium", type: "Premium", x: 60, y: 3.4, value: 60, color: "#22d3ee" },
    { segment: "New", type: "Regular", x: 40, y: 3.1, value: 30, color: "#64748b" },
  ];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const filterOptions = [
    { label: "Year&Month", options: ["All"] },
    { label: "Country", options: ["All"] },
    { label: "Customer Segment", options: ["All"] },
    { label: "Product Category", options: ["All"] },
  ];

  return (
    <Box minH="70vh" bg="black" px={[2, 4, 8]} py={4} color="white">
      <DashboardHeader
        title="Retail Insight Dashboard"
        icon={MdShoppingCart}
        filterOptions={filterOptions}
      />

      {/* Stats */}
      <SimpleGrid columns={[2, 3, 5]} spacing={4} mb={4}>
        {(kpis && kpis.length > 0 ? kpis : stats).map((stat) => (
          <Stat
            key={stat.label}
            px={4}
            py={4}
            bg="#18181b"
            borderRadius="lg"
            boxShadow="md"
            color="white"
            minW="120px"
          >
            <Flex align="center" mb={2}>
              <Box
                bg={stat.color}
                borderRadius="full"
                p={2}
                mr={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={stat.icon} w={6} h={6} color="white" />
              </Box>
              <StatNumber fontSize="2xl" fontWeight="bold">
                {stat.value}
              </StatNumber>
            </Flex>
            <StatLabel color="gray.400" fontWeight="semibold">
              {stat.label}
            </StatLabel>
          </Stat>
        ))}
      </SimpleGrid>

      {/* Main Grid */}
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} mt={2}>
        {/* Sales by Product Category */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px" gridColumn={[1, 1, 1, 1]}>
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales by Product Category
          </Text>
          <SimpleGrid columns={2} spacing={2}>
            {categories.map((cat) => (
              <Box
                key={cat.name}
                bg={cat.color}
                borderRadius="md"
                p={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minH="60px"
                mb={1}
              >
                <Text fontWeight="bold" fontSize="md" color="white">
                  {cat.name}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900">
                  {cat.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Sales Trend (Simple Line Chart) */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px" gridColumn={[1, 1, 2, 2]}>
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales Trend
          </Text>
          <Box h="140px" w="100%" position="relative">
            {/* Simple SVG Line Chart */}
            <svg width="100%" height="100%" viewBox="0 0 300 120">
              {/* Axis */}
              <line x1="30" y1="110" x2="290" y2="110" stroke="#444" strokeWidth="2" />
              <line x1="30" y1="10" x2="30" y2="110" stroke="#444" strokeWidth="2" />
              {/* Line */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                points={
                  salesTrend
                    .map((val, i) => {
                      const x = 30 + (i * 24);
                      const y = 110 - ((val - 9) * 30); // scale
                      return `${x},${y}`;
                    })
                    .join(" ")
                }
              />
              {/* Dots */}
              {salesTrend.map((val, i) => {
                const x = 30 + (i * 24);
                const y = 110 - ((val - 9) * 30);
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" />
                );
              })}
              {/* Month Labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={30 + (i * 24)}
                  y={120}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {m}
                </text>
              ))}
              {/* Y-axis labels */}
              <text x="10" y="115" fontSize="10" fill="#fff">$9M</text>
              <text x="10" y="25" fontSize="10" fill="#fff">$11M</text>
            </svg>
          </Box>
        </Box>

        {/* Sales by Order Status (Bar Chart) */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px" gridColumn={[1, 1, 3, 3]}>
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales by Order Status
          </Text>
          <VStack align="stretch" spacing={3} mt={4}>
            {orderStatus.map((status) => (
              <Flex key={status.label} align="center">
                <Text w="90px" fontSize="sm" color="gray.300">
                  {status.label}
                </Text>
                <Box
                  flex="1"
                  h="18px"
                  bg={status.color}
                  borderRadius="md"
                  mx={2}
                  position="relative"
                  minW="30px"
                  maxW="160px"
                />
                <Text fontWeight="bold" color="white" fontSize="sm" minW="40px">
                  {status.value}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Segment Wise Sales vs Ratings (Scatter Plot) */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px" gridColumn={[1, 1, 4, 4]}>
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Segment Wise Sales vs Ratings
          </Text>
          <Box h="140px" w="100%" position="relative">
            {/* Simple SVG Scatter Plot */}
            <svg width="100%" height="100%" viewBox="0 0 200 120">
              {/* Axis */}
              <line x1="30" y1="110" x2="190" y2="110" stroke="#444" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="110" stroke="#444" strokeWidth="2" />
              {/* Dots */}
              {segmentRatings.map((pt, i) => {
                // x: 30-190, y: 110-20
                const x = 30 + (pt.x * 1.6);
                const y = 110 - ((pt.y - 3.0) * 60);
                return (
                  <Tooltip key={i} label={`${pt.segment} (${pt.type})`} hasArrow>
                    <circle
                      cx={x}
                      cy={y}
                      r={6}
                      fill={pt.color}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </Tooltip>
                );
              })}
              {/* X/Y axis labels */}
              <text x="10" y="115" fontSize="10" fill="#fff">30M</text>
              <text x="170" y="115" fontSize="10" fill="#fff">60M</text>
              <text x="0" y="30" fontSize="10" fill="#fff">3.4</text>
              <text x="0" y="110" fontSize="10" fill="#fff">3.0</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="blue">Premium</Badge>
            <Badge colorScheme="cyan">New</Badge>
            <Badge colorScheme="purple">Regular</Badge>
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;