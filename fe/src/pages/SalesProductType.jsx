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
import { MdShoppingCart } from "react-icons/md";
import { ContextInstance } from "../context/AppContext";
import DashboardHeader from "../components/DashboardHeader";

// Example data (replace with API/context data as needed)
const filterOptions = [
  { label: "Year&Month", options: ["All"] },
  { label: "Region", options: ["All"] },
  { label: "Product Category", options: ["All"] },
];

const paymentTypes = [
  { label: "Cash", color: "#6366f1" },
  { label: "Credit Card", color: "#0ea5e9" },
  { label: "Debit Card", color: "#22d3ee" },
  { label: "PayPal", color: "#a21caf" },
];

const productTypePayment = [
  { type: "Water", values: [2, 3, 2, 3] },
  { type: "Smartphone", values: [1, 2, 2, 2] },
  { type: "Non-Fiction", values: [1, 1, 2, 1] },
  { type: "Fiction", values: [1, 1, 1, 1] },
  { type: "Decorations", values: [1, 1, 1, 1] },
];

const ageBrackets = [
  { bracket: "18-25", value: 30000, color: "#6366f1" },
  { bracket: "26-35", value: 20000, color: "#0ea5e9" },
  { bracket: "36-45", value: 10000, color: "#22d3ee" },
  { bracket: "46-50", value: 7000, color: "#64748b" },
  { bracket: "50+", value: 5000, color: "#334155" },
];

const brandGender = [
  { brand: "Zain", female: 5, male: 3 },
  { brand: "Sony", female: 4, male: 4 },
  { brand: "Whirlpool", female: 3, male: 1 },
];

const lineChartData = [
  {
    name: "Books",
    color: "#6366f1",
    values: [200, 220, 250, 230, 260, 270, 300, 320, 310, 300, 290, 280],
  },
  {
    name: "Clothing",
    color: "#0ea5e9",
    values: [150, 160, 170, 180, 190, 200, 210, 220, 210, 200, 190, 180],
  },
  {
    name: "Electronics",
    color: "#22d3ee",
    values: [300, 320, 340, 330, 350, 370, 390, 410, 400, 390, 380, 370],
  },
  {
    name: "Grocery",
    color: "#64748b",
    values: [100, 120, 130, 140, 150, 160, 170, 180, 170, 160, 150, 140],
  },
  {
    name: "Home Decor",
    color: "#334155",
    values: [80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110],
  },
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const barChartTypes = [
  { name: "Tools", color: "#6366f1" },
  { name: "T-Shirt", color: "#0ea5e9" },
  { name: "Water", color: "#a21caf" },
];

const monthlySales = [
  // Each month: [Tools, T-Shirt, Water]
  [0.6, 0.5, 0.7],
  [0.7, 0.6, 0.8],
  [0.8, 0.7, 0.9],
  [0.7, 0.6, 0.8],
  [0.8, 0.7, 0.9],
  [0.9, 0.8, 1.0],
  [0.8, 0.7, 0.9],
  [0.9, 0.8, 1.0],
  [0.8, 0.7, 0.9],
  [0.9, 0.8, 1.0],
  [0.8, 0.7, 0.9],
  [0.9, 0.8, 1.0],
];

const SalesProductType = () => {
  const { user } = useContext(ContextInstance);

  return (
    <Box minH="70vh" bg="black" px={[2, 4, 8]} py={4} color="white">
      <DashboardHeader
        title="Retail Insight Dashboard"
        icon={MdShoppingCart}
        filterOptions={[
          { label: "Year&Month", options: ["All"] },
          { label: "Region", options: ["All"] },
          { label: "Product Category", options: ["All"] },
        ]}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={4}>
        {/* Product Type vs Payment Method */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="180px">
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Product Type vs Payment Method
          </Text>
          <VStack spacing={2} align="stretch">
            {productTypePayment.map((row, i) => (
              <Flex key={row.type} align="center">
                <Text w="90px" fontSize="sm" color="gray.300">{row.type}</Text>
                <HStack flex="1" spacing={1}>
                  {row.values.map((val, j) => (
                    <Box
                      key={j}
                      h="16px"
                      borderRadius="md"
                      bg={paymentTypes[j].color}
                      width={`${val * 18}%`}
                      minW="10px"
                    />
                  ))}
                </HStack>
                <Text fontWeight="bold" color="#fff" fontSize="sm" ml={2}>
                  {row.values.reduce((a, b) => a + b, 0)}M
                </Text>
              </Flex>
            ))}
          </VStack>
          <HStack mt={2} spacing={2}>
            {paymentTypes.map((pt) => (
              <HStack key={pt.label} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={pt.color} />
                <Text fontSize="xs" color="gray.300">{pt.label}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>

        {/* Product Count by Age Bracket */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="180px">
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Product Count by Age Bracket
          </Text>
          <VStack spacing={2} align="stretch">
            {ageBrackets.map((row) => (
              <Flex key={row.bracket} align="center">
                <Text w="50px" fontSize="sm" color="gray.300">{row.bracket}</Text>
                <Box flex="1" mx={2}>
                  <Box bg={row.color} h="16px" borderRadius="md" width={`${row.value / 30000 * 100}%`} minW="10px" />
                </Box>
                <Text fontWeight="bold" color="#fff" fontSize="sm" ml={2}>
                  {row.value.toLocaleString()}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Top 3 Product Brand Gender wise */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="180px">
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Top 3 Product Brand Gender wise
          </Text>
          <Box h="110px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 180 110">
              {brandGender.map((brand, i) => (
                <React.Fragment key={brand.brand}>
                  {/* Female Bar */}
                  <rect
                    x={30 + i * 50}
                    y={110 - brand.female * 20}
                    width="18"
                    height={brand.female * 20}
                    fill="#f472b6"
                  />
                  {/* Male Bar */}
                  <rect
                    x={30 + i * 50 + 20}
                    y={110 - brand.male * 20}
                    width="18"
                    height={brand.male * 20}
                    fill="#6366f1"
                  />
                  {/* Brand Label */}
                  <text
                    x={39 + i * 50}
                    y={105}
                    fontSize="10"
                    fill="#fff"
                    textAnchor="middle"
                  >
                    {brand.brand}
                  </text>
                </React.Fragment>
              ))}
              {/* Y-axis labels */}
              <text x="5" y="30" fontSize="9" fill="#fff">$5M</text>
              <text x="5" y="70" fontSize="9" fill="#fff">$3M</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={2}>
            <Badge colorScheme="pink">Female</Badge>
            <Badge colorScheme="blue">Male</Badge>
          </HStack>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2]} spacing={4}>
        {/* Amount by Year, Month and Product Category (Line Chart) */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px">
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Amount by Year, Month and Product Category
          </Text>
          <Box h="140px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 320 140">
              {lineChartData.map((cat, idx) => (
                <polyline
                  key={cat.name}
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="2"
                  points={
                    cat.values.map((val, i) => {
                      const x = 30 + (i * 24);
                      const y = 120 - (val / 500 * 100);
                      return `${x},${y}`;
                    }).join(" ")
                  }
                />
              ))}
              {/* Month Labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={30 + (i * 24)}
                  y={135}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {m}
                </text>
              ))}
              {/* Y-axis labels */}
              <text x="5" y="125" fontSize="10" fill="#fff">0K</text>
              <text x="5" y="30" fontSize="10" fill="#fff">500K</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={2}>
            {lineChartData.map((cat) => (
              <HStack key={cat.name} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={cat.color} />
                <Text fontSize="xs" color="gray.300">{cat.name}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>

        {/* Monthly sales by Product Type (Grouped Bar Chart) */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="220px">
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Monthly sales by Product Type
          </Text>
          <Box h="140px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 320 140">
              {months.map((m, i) => (
                <React.Fragment key={m}>
                  {barChartTypes.map((type, j) => (
                    <rect
                      key={type.name + i}
                      x={30 + i * 22 + j * 6}
                      y={140 - monthlySales[i][j] * 120}
                      width="6"
                      height={monthlySales[i][j] * 120}
                      fill={type.color}
                    />
                  ))}
                  {/* Month Label */}
                  <text
                    x={36 + i * 22}
                    y={135}
                    fontSize="10"
                    fill="#fff"
                    textAnchor="middle"
                  >
                    {m}
                  </text>
                </React.Fragment>
              ))}
              {/* Y-axis labels */}
              <text x="5" y="135" fontSize="10" fill="#fff">$0M</text>
              <text x="5" y="25" fontSize="10" fill="#fff">$1.0M</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={2}>
            {barChartTypes.map((type) => (
              <HStack key={type.name} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={type.color} />
                <Text fontSize="xs" color="gray.300">{type.name}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SalesProductType;