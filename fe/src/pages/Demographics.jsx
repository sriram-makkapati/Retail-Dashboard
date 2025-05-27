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
  Select,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { ContextInstance } from "../context/AppContext";
import DashboardHeader from "../components/DashboardHeader";

// Use context for user, datasets, or any demographic data you want to share
const Demographics = () => {
  const { user, datasets } = useContext(ContextInstance);

  // You can replace these with context-driven data if available
  const ageSpend = [
    { age: "18-25", female: 17.20, male: 25.63 },
    { age: "25-30", female: 4.77, male: 7.60 },
    { age: "31-35", female: 5.91, male: 3.11 },
    { age: "36-40", female: 7.01, male: 10.17 },
    { age: "41-45", female: 8.22, male: 13.16 },
  ];

  const incomeSpend = [
    { level: "Medium", New: 2000, Premium: 3000, Regular: 4000 },
    { level: "Low", New: 1200, Premium: 1800, Regular: 2500 },
    { level: "High", New: 3000, Premium: 3500, Regular: 4200 },
  ];

  const genderSegment = [
    { segment: "Regular", female: 40000, male: 60000 },
    { segment: "New", female: 20000, male: 30000 },
    { segment: "Premium", female: 10000, male: 20000 },
  ];

  const brandPreference = [
    { brand: "Samsung", value: 8 },
    { brand: "Zara", value: 7 },
    { brand: "Sony", value: 6 },
    { brand: "Random House", value: 5 },
    { brand: "Whirlpool", value: 4 },
  ];

  const genderTable = [
    { age: "18-25", sales: "$42.83M", customers: 31968, female: "39.39%", male: "60.07%" },
    { age: "25-30", sales: "$13.65M", customers: 10021, female: "21.89%", male: "78.11%" },
    { age: "31-35", sales: "$12.40M", customers: 8981, female: "30.13%", male: "69.87%" },
    { age: "36-40", sales: "$5.09M", customers: 3719, female: "39.13%", male: "60.87%" },
    { age: "41-45", sales: "$5.30M", customers: 3788, female: "39.70%", male: "60.29%" },
    { age: "50+", sales: "$17.18M", customers: 12375, female: "30.70%", male: "69.29%" },
  ];

  const totalRow = {
    sales: "$118.43M",
    customers: 86540,
    female: "37.72%",
    male: "62.28%",
  };

  return (
    <Box minH="70vh" bg="black" px={[2, 4, 8]} py={4} color="white">
      <DashboardHeader
        title="Retail Insight Dashboard"
        icon={MdShoppingCart}
        filterOptions={[
          { label: "Year.&Month", options: ["All"] },
          { label: "Region", options: ["All"] },
          { label: "Product Category", options: ["All"] },
        ]}
      />

      {/* Main Grid */}
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={4}>
        {/* Avg Spend by Age Group */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="200px">
          <Text fontWeight="bold" mb={2} color="#a78bfa">
            Avg Spend by Age Group
          </Text>
          <VStack spacing={2} align="stretch">
            {ageSpend.map((row) => (
              <Flex key={row.age} align="center">
                <Text w="50px" fontSize="sm" color="gray.300">{row.age}</Text>
                <Box flex="1" mx={2}>
                  <Flex>
                    <Box bg="#0ea5e9" h="18px" borderRadius="md" width={`${row.female / 30 * 100}%`} minW="30px" />
                    <Box bg="#6366f1" h="18px" borderRadius="md" width={`${row.male / 30 * 100}%`} minW="30px" ml={1} />
                  </Flex>
                </Box>
                <Text fontWeight="bold" color="#0ea5e9" fontSize="sm" ml={2}>${row.female.toFixed(2)}M</Text>
                <Text fontWeight="bold" color="#6366f1" fontSize="sm" ml={2}>${row.male.toFixed(2)}M</Text>
              </Flex>
            ))}
          </VStack>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="blue">Female</Badge>
            <Badge colorScheme="purple">Male</Badge>
          </HStack>
        </Box>

        {/* Avg Spend by Income Level */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="200px">
          <Text fontWeight="bold" mb={2} color="#a78bfa">
            Avg Spend by Income Level
          </Text>
          <VStack spacing={3} align="stretch" mt={2}>
            {incomeSpend.map((row) => (
              <Flex key={row.level} align="center">
                <Text w="60px" fontSize="sm" color="gray.300">{row.level}</Text>
                <Box flex="1" mx={2}>
                  <Flex>
                    <Box bg="#6366f1" h="18px" borderRadius="md" width={`${row.New / 50 * 100}%`} minW="20px" />
                    <Box bg="#0ea5e9" h="18px" borderRadius="md" width={`${row.Premium / 50 * 100}%`} minW="20px" />
                    <Box bg="#fbbf24" h="18px" borderRadius="md" width={`${row.Regular / 50 * 100}%`} minW="20px" ml={1} />
                  </Flex>
                </Box>
                <Text fontWeight="bold" color="#6366f1" fontSize="sm" ml={2}>{row.New}</Text>
                <Text fontWeight="bold" color="#0ea5e9" fontSize="sm" ml={2}>{row.Premium}</Text>
                <Text fontWeight="bold" color="#fbbf24" fontSize="sm" ml={2}>{row.Regular}</Text>
              </Flex>
            ))}
          </VStack>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="purple">New</Badge>
            <Badge colorScheme="pink">Premium</Badge>
            <Badge colorScheme="yellow">Regular</Badge>
          </HStack>
        </Box>

        {/* Customer Count by Gender within Segment */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="200px">
          <Text fontWeight="bold" mb={2} color="#a78bfa">
            Customer Count by Gender within Segment
          </Text>
          <Box h="120px" w="100%" position="relative">
            {/* Simple stacked bar chart */}
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              {genderSegment.map((seg, i) => {
                const total = seg.female + seg.male;
                const femaleHeight = (seg.female / total) * 80;
                const maleHeight = (seg.male / total) * 80;
                return (
                  <g key={seg.segment}>
                    {/* Female bar */}
                    <rect
                      x={30 + i * 50}
                      y={100 - femaleHeight}
                      width="18"
                      height={femaleHeight}
                      fill="#0ea5e9"
                    />
                    {/* Male bar */}
                    <rect
                      x={30 + i * 50}
                      y={100 - femaleHeight - maleHeight}
                      width="18"
                      height={maleHeight}
                      fill="#6366f1"
                    />
                    {/* Labels */}
                    <text
                      x={39 + i * 50}
                      y={95}
                      fontSize="10"
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {seg.segment}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme="blue">Female</Badge>
            <Badge colorScheme="purple">Male</Badge>
          </HStack>
        </Box>

        {/* Product Brand Preference */}
        <Box bg="#18181b" borderRadius="lg" p={4} boxShadow="md" minH="200px">
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="bold" color="#a78bfa">
              Product Brand Preference
            </Text>
            <Select size="xs" bg="#fff" color="black" borderRadius="md" w="120px">
              <option>All</option>
            </Select>
          </Flex>
          <VStack spacing={3} align="stretch" mt={2}>
            {brandPreference.map((row) => (
              <Flex key={row.brand} align="center">
                <Text w="90px" fontSize="sm" color="gray.300">{row.brand}</Text>
                <Box flex="1" mx={2}>
                  <Box bg="#6366f1" h="16px" borderRadius="md" width={`${row.value * 12}%`} minW="30px" />
                </Box>
                <Text fontWeight="bold" color="#6366f1" fontSize="sm" ml={2}>${row.value}M</Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Gender Distribution Table */}
        <Box
          bg="#18181b"
          borderRadius="lg"
          p={4}
          boxShadow="md"
          minH="200px"
          gridColumn="span 2" // <-- Make the table span 2 columns for more width
        >
          <Text fontWeight="bold" mb={2} color="#6366f1">
            Gender Distribution Within Age Group
          </Text>
          <Table size="sm" variant="unstyled" width="100%">
            <Thead>
              <Tr>
                <Th color="gray.300" fontWeight="bold" px={2} py={1}>AgeBracket</Th>
                <Th color="gray.300" fontWeight="bold" px={2} py={1}>Sales</Th>
                <Th color="gray.300" fontWeight="bold" px={2} py={1}>No of customers</Th>
                <Th color="gray.300" fontWeight="bold" px={2} py={1}>Female %</Th>
                <Th color="gray.300" fontWeight="bold" px={2} py={1}>Male %</Th>
              </Tr>
            </Thead>
            <Tbody>
              {genderTable.map((row) => (
                <Tr key={row.age}>
                  <Td color="white" px={2} py={1}>{row.age}</Td>
                  <Td color="white" px={2} py={1}>{row.sales}</Td>
                  <Td color="white" px={2} py={1}>{row.customers}</Td>
                  <Td color="#0ea5e9" px={2} py={1}>{row.female}</Td>
                  <Td color="#6366f1" px={2} py={1}>{row.male}</Td>
                </Tr>
              ))}
              <Tr>
                <Td color="white" fontWeight="bold" px={2} py={1}>Total</Td>
                <Td color="white" fontWeight="bold" px={2} py={1}>{totalRow.sales}</Td>
                <Td color="white" fontWeight="bold" px={2} py={1}>{totalRow.customers}</Td>
                <Td color="#0ea5e9" fontWeight="bold" px={2} py={1}>{totalRow.female}</Td>
                <Td color="#6366f1" fontWeight="bold" px={2} py={1}>{totalRow.male}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Demographics;