import React, { useContext } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Tooltip,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { MdShoppingCart, MdLocationOn } from "react-icons/md";
import { ContextInstance } from "../context/AppContext";
import DashboardHeader from "../components/DashboardHeader";

const topCities = [
  { city: "Winnipeg", value: "$1.0M" },
  { city: "Wuppertal", value: "$0.8M" },
  { city: "Wollongong", value: "$0.5M" },
];

const productCategories = [
  { name: "Books", color: "#6366f1" },
  { name: "Clothing", color: "#0ea5e9" },
  { name: "Electronics", color: "#22d3ee" },
  { name: "Grocery", color: "#64748b" },
  { name: "Home Decor", color: "#334155" },
];

const salesByCategory = [
  { country: "USA", values: [35, 28, 25, 20, 15] },
  { country: "UK", values: [25, 20, 18, 13, 10] },
  { country: "Germany", values: [20, 15, 12, 10, 8] },
  { country: "Australia", values: [18, 13, 10, 8, 6] },
  { country: "Canada", values: [15, 10, 8, 6, 4] },
];

const salesTrend = [
  9.5, 9.7, 10.0, 9.8, 10.2, 10.6, 10.9, 10.5, 10.1, 10.4, 9.9, 10.3,
];
const avgRatingTrend = [
  3.15, 3.16, 3.17, 3.16, 3.17, 3.18, 3.17, 3.16, 3.17, 3.18, 3.17, 3.16,
];

const regionAgeGroups = [
  {
    country: "USA",
    values: [12, 10, 8, 7, 6, 5, 2],
  },
  {
    country: "UK",
    values: [10, 8, 7, 6, 5, 3, 1],
  },
  {
    country: "Germany",
    values: [8, 7, 6, 5, 4, 2, 1],
  },
  {
    country: "Canada",
    values: [7, 6, 5, 4, 3, 2, 1],
  },
  {
    country: "Australia",
    values: [6, 5, 4, 3, 2, 1, 1],
  },
];

const ageGroups = [
  "18-25", "25-30", "31-35", "36-40", "41-45", "46-50", "50+"
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SalesInsight = () => {
  const { user } = useContext(ContextInstance);

  return (
    <Box minH="70vh" bg="black" px={[2, 4, 8]} py={4} color="white">
      <DashboardHeader
        title="Retail Insight Dashboard"
        icon={MdShoppingCart}
        filterOptions={[
          { label: "Year&Month", options: ["All"] },
          { label: "Product Category", options: ["All"] },
        ]}
      />
      {/* Unified Grid for all cards */}
      <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={4}>
        {/* Top Country */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minH="120px"
        >
          <Text fontSize="4xl" fontWeight="bold" color="#fff" mb={1}>
            USA
          </Text>
          <Text fontSize="md" color="#6366f1" fontWeight="bold">
            Top Country
          </Text>
        </Box>

        {/* Top 3 Cities by Sales */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="120px"
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Top 3 Cities by Sales
          </Text>
          <VStack spacing={2} align="stretch">
            {topCities.map((city, idx) => (
              <Flex key={city.city} align="center">
                <Text w="90px" fontSize="sm" color="gray.300">{city.city}</Text>
                <Box flex="1" mx={2}>
                  <Box
                    bg={["#6366f1", "#0ea5e9", "#22d3ee"][idx]}
                    h="12px"
                    borderRadius="md"
                    width={`${100 - idx * 20}%`}
                    minW="30px"
                  />
                </Box>
                <Text fontWeight="bold" color="#fff" fontSize="sm" ml={2}>
                  {city.value}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Sales by Product Category (Stacked Bar) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="120px"
          gridColumn={["auto", "auto", "span 2"]}
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales by Product Category
          </Text>
          <HStack spacing={2} mb={2}>
            {productCategories.map((cat) => (
              <HStack key={cat.name} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={cat.color} />
                <Text fontSize="xs" color="gray.300">{cat.name}</Text>
              </HStack>
            ))}
          </HStack>
          <Box h="100px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 220 100">
              {salesByCategory.map((country, i) => {
                let y = 100;
                return (
                  <g key={country.country}>
                    {country.values.map((val, j) => {
                      const height = val;
                      y -= height;
                      return (
                        <rect
                          key={j}
                          x={20 + i * 40}
                          y={y}
                          width="28"
                          height={height}
                          fill={productCategories[j].color}
                        />
                      );
                    })}
                    <text
                      x={34 + i * 40}
                      y={98}
                      fontSize="10"
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {country.country}
                    </text>
                  </g>
                );
              })}
              {/* Y-axis labels */}
              <text x="0" y="10" fontSize="10" fill="#fff">40M</text>
              <text x="0" y="98" fontSize="10" fill="#fff">0M</text>
            </svg>
          </Box>
        </Box>

        {/* Country Overview (Map Placeholder) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="120px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Country Overview
          </Text>
          {/* Placeholder for map */}
          <Box
            w="100%"
            h="70px"
            bg="#23272f"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={MdLocationOn} w={10} h={10} color="#6366f1" />
            <Text color="gray.400" ml={2} fontSize="sm">
              Map View (Coming Soon)
            </Text>
          </Box>
        </Box>

        {/* Sales and Avg Rating Trend */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="180px"
          gridColumn={["auto", "span 2", "span 2"]}
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales and Avg Rating Trend
          </Text>
          <Box h="110px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 300 110">
              {/* Sales Line */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                points={
                  salesTrend
                    .map((val, i) => {
                      const x = 30 + (i * 22);
                      const y = 100 - ((val - 9.5) * 50);
                      return `${x},${y}`;
                    })
                    .join(" ")
                }
              />
              {/* Avg Rating Line */}
              <polyline
                fill="none"
                stroke="#0ea5e9"
                strokeDasharray="4"
                strokeWidth="2"
                points={
                  avgRatingTrend
                    .map((val, i) => {
                      const x = 30 + (i * 22);
                      const y = 100 - ((val - 3.14) * 100);
                      return `${x},${y}`;
                    })
                    .join(" ")
                }
              />
              {/* Dots */}
              {salesTrend.map((val, i) => {
                const x = 30 + (i * 22);
                const y = 100 - ((val - 9.5) * 50);
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="#6366f1" />
                );
              })}
              {/* Month Labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={30 + (i * 22)}
                  y={108}
                  fontSize="9"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {m}
                </text>
              ))}
              {/* Y-axis labels */}
              <text x="5" y="105" fontSize="9" fill="#fff">$9.5M</text>
              <text x="5" y="15" fontSize="9" fill="#fff">$10.8M</text>
              <text x="270" y="20" fontSize="9" fill="#0ea5e9">Avg Rating</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="blue">Sales</Badge>
            <Badge colorScheme="cyan">Avg Rating</Badge>
          </HStack>
        </Box>

        {/* Sales by Region within Age Group (Horizontal Stacked Bar) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="180px"
          gridColumn={["auto", "span 2", "span 2"]}
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales by Region within Age Group
          </Text>
          <Box h="110px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 320 110">
              {regionAgeGroups.map((region, i) => {
                let x = 0;
                return (
                  <g key={region.country}>
                    {region.values.map((val, j) => {
                      const width = val * 5;
                      const rect = (
                        <rect
                          key={j}
                          x={60 + x}
                          y={15 + i * 18}
                          width={width}
                          height="14"
                          fill={productCategories[j] ? productCategories[j].color : "#334155"}
                        />
                      );
                      x += width;
                      return rect;
                    })}
                    <text
                      x={50}
                      y={26 + i * 18}
                      fontSize="10"
                      fill="#fff"
                      textAnchor="end"
                    >
                      {region.country}
                    </text>
                  </g>
                );
              })}
              {/* Age group legend */}
              {ageGroups.map((g, i) => (
                <g key={g}>
                  <rect x={60 + i * 40} y={100} width="18" height="8" fill={productCategories[i] ? productCategories[i].color : "#334155"} />
                  <text x={70 + i * 40} y={108} fontSize="9" fill="#fff" textAnchor="middle">{g}</text>
                </g>
              ))}
              {/* X-axis labels */}
              <text x="60" y="15" fontSize="9" fill="#fff">0bn</text>
              <text x="260" y="15" fontSize="9" fill="#fff">50bn</text>
            </svg>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SalesInsight;