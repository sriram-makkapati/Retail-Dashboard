import React, { useContext } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { ContextInstance } from "../context/AppContext";
import DashboardHeader from "../components/DashboardHeader";

// Example data (replace with context data if available)
const filterOptions = [
  { label: "Year&Month", options: ["All"] },
  { label: "Region", options: ["All"] },
  { label: "Product Category", options: ["All"] },
];

const productStats = [
  { label: "Electronics", qty: 26667, sales: 6.81 },
  { label: "Books", qty: 26216, sales: 6.39 },
  { label: "Clothing", qty: 25963, sales: 6.23 },
  { label: "Grocery", qty: 31504, sales: 9.06 },
  { label: "Home Decor", qty: 31403, sales: 10.49 },
];

const segmentStats = [
  { segment: "New", values: [16552, 12379, 12149, 15002, 14037] },
  { segment: "Premium", values: [5410, 5411, 5411, 5411, 5411] },
  { segment: "Regular", values: [40227, 40130, 40130, 40130, 40130] },
];

const totalStats = {
  qty: 141241,
  sales: 118.43,
};

const pieData = [
  { label: "Electronics", value: 137.7, color: "#6366f1" },
  { label: "Grocery", value: 105, color: "#0ea5e9" },
  { label: "Clothing", value: 120, color: "#22d3ee" },
  { label: "Books", value: 110, color: "#64748b" },
  { label: "Home Decor", value: 105, color: "#334155" },
];

const shippingModes = [
  { label: "Same-Day", value: 35, color: "#6366f1" },
  { label: "Express", value: 34, color: "#0ea5e9" },
  { label: "Standard", value: 31, color: "#22d3ee" },
];

const barChartData = [
  { label: "Electronics", sales: 21.8, rating: 3.2 },
  { label: "Grocery", sales: 21.4, rating: 3.1 },
  { label: "Home Decor", sales: 21.4, rating: 3.1 },
  { label: "Clothing", sales: 21.4, rating: 3.1 },
  { label: "Books", sales: 21.3, rating: 3.1 },
];

const sankeyData = [
  { from: "Electronics", to: "Smartphone", value: 9.24, color: "#6366f1" },
  { from: "Electronics", to: "Tablet", value: 5.16, color: "#0ea5e9" },
  { from: "Electronics", to: "Television", value: 6.16, color: "#22d3ee" },
  { from: "Smartphone", to: "Apple", value: 3.10, color: "#6366f1" },
  { from: "Smartphone", to: "Samsung", value: 3.03, color: "#0ea5e9" },
  { from: "Smartphone", to: "Sony", value: 3.02, color: "#22d3ee" },
];

const ProductInsight = () => {
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
      {/* Main Grid */}
      <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={4}>
        {/* Top Product */}
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
            Pepsi
          </Text>
          <Text fontSize="md" color="#6366f1" fontWeight="bold">
            Top Product
          </Text>
        </Box>

        {/* Products by Shipping Mode (Pie) */}
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
            Products by Shipping Mode
          </Text>
          <Box position="relative" w="70px" h="70px" mb={2}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              {(() => {
                let startAngle = 0;
                return shippingModes.map((mode, i) => {
                  const angle = (mode.value / 100) * 360;
                  const endAngle = startAngle + angle;
                  const largeArc = angle > 180 ? 1 : 0;
                  const x1 = 35 + 30 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 35 + 30 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 35 + 30 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 35 + 30 * Math.sin((Math.PI * endAngle) / 180);
                  const d = `
                    M 35 35
                    L ${x1} ${y1}
                    A 30 30 0 ${largeArc} 1 ${x2} ${y2}
                    Z
                  `;
                  startAngle += angle;
                  return (
                    <path key={mode.label} d={d} fill={mode.color} />
                  );
                });
              })()}
            </svg>
          </Box>
          <HStack spacing={2} mt={2}>
            {shippingModes.map((mode) => (
              <HStack key={mode.label} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={mode.color} />
                <Text fontSize="xs" color="gray.300">{mode.label}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>

        {/* Product Sales and Quantity By Customer Segment (Table) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="120px"
          gridColumn={["auto", "span 2", "span 2"]}
          overflowX="auto"
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Product Sales and Quantity By Customer Segment
          </Text>
          <Table size="sm" variant="unstyled" width="100%">
            <Thead>
              <Tr>
                <Th color="gray.300" fontWeight="bold">Product Category</Th>
                <Th color="gray.300" fontWeight="bold">Qty</Th>
                <Th color="gray.300" fontWeight="bold">Sales</Th>
                <Th color="gray.300" fontWeight="bold">New</Th>
                <Th color="gray.300" fontWeight="bold">Premium</Th>
                <Th color="gray.300" fontWeight="bold">Regular</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productStats.map((row, i) => (
                <Tr key={row.label}>
                  <Td color="#6366f1" fontWeight="bold">{row.label}</Td>
                  <Td color="white">{row.qty}</Td>
                  <Td color="white">${row.sales}M</Td>
                  <Td color="white">{segmentStats[0].values[i]}</Td>
                  <Td color="white">{segmentStats[1].values[i]}</Td>
                  <Td color="white">{segmentStats[2].values[i]}</Td>
                </Tr>
              ))}
              <Tr>
                <Td color="white" fontWeight="bold">Total</Td>
                <Td color="white" fontWeight="bold">{totalStats.qty}</Td>
                <Td color="white" fontWeight="bold">${totalStats.sales}M</Td>
                <Td colSpan={3}></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>

      {/* Second Row */}
      <SimpleGrid columns={[1, 2]} spacing={4} mt={2}>
        {/* Quantity by Product Category (Pie) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="180px"
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Quantity by Product Category
          </Text>
          <Box position="relative" w="120px" h="120px" mx="auto">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {(() => {
                let startAngle = 0;
                return pieData.map((cat, i) => {
                  const angle = (cat.value / 500) * 360;
                  const endAngle = startAngle + angle;
                  const largeArc = angle > 180 ? 1 : 0;
                  const x1 = 60 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 60 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 60 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 60 + 50 * Math.sin((Math.PI * endAngle) / 180);
                  const d = `
                    M 60 60
                    L ${x1} ${y1}
                    A 50 50 0 ${largeArc} 1 ${x2} ${y2}
                    Z
                  `;
                  startAngle += angle;
                  return (
                    <path key={cat.label} d={d} fill={cat.color} />
                  );
                });
              })()}
            </svg>
          </Box>
          <VStack spacing={1} mt={2} align="start">
            {pieData.map((cat) => (
              <HStack key={cat.label} spacing={1}>
                <Box w="10px" h="10px" borderRadius="sm" bg={cat.color} />
                <Text fontSize="xs" color="gray.300">{cat.label}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Sales and Avg Ratings by Product Category (Bar + Line) */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="180px"
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Sales and Avg Ratings by Product Category
          </Text>
          <Box h="110px" w="100%" position="relative">
            <svg width="100%" height="100%" viewBox="0 0 300 110">
              {/* Bars */}
              {barChartData.map((d, i) => (
                <rect
                  key={d.label}
                  x={30 + i * 50}
                  y={110 - d.sales * 4}
                  width="30"
                  height={d.sales * 4}
                  fill="#6366f1"
                />
              ))}
              {/* Line for Avg Rating */}
              <polyline
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2"
                points={
                  barChartData
                    .map((d, i) => {
                      const x = 45 + i * 50;
                      const y = 110 - (d.rating - 3.0) * 100;
                      return `${x},${y}`;
                    })
                    .join(" ")
                }
              />
              {/* Dots */}
              {barChartData.map((d, i) => {
                const x = 45 + i * 50;
                const y = 110 - (d.rating - 3.0) * 100;
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="#0ea5e9" />
                );
              })}
              {/* Labels */}
              {barChartData.map((d, i) => (
                <text
                  key={d.label}
                  x={45 + i * 50}
                  y={105}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              ))}
              {/* Y-axis labels */}
              <text x="5" y="105" fontSize="9" fill="#fff">$0M</text>
              <text x="5" y="25" fontSize="9" fill="#fff">$22M</text>
            </svg>
          </Box>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="blue">Sales</Badge>
            <Badge colorScheme="cyan">Avg Rating</Badge>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Sankey Chart Placeholder */}
      <Box
        bg="#18181b"
        borderRadius="lg"
        p={4}
        boxShadow="md"
        minH="180px"
        mt={4}
      >
        <Text fontWeight="bold" mb={2} color="#6366f1">
          Product Category → Product Type → Product Brand
        </Text>
        {/* Sankey chart placeholder */}
        <Box w="100%" h="100px" bg="#23272f" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
          <Text color="gray.400" fontSize="sm">
            Sankey Chart (Coming Soon)
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInsight;