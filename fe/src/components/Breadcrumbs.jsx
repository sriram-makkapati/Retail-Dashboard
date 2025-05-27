import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, Icon } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const APP_FLOW = [
  { path: "/", label: "Home" },

];

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use passed items or fallback to APP_FLOW based on location
  const crumbs = items
    ? items
    : APP_FLOW.filter(item => location.pathname.startsWith(item.path));

  if (!crumbs.length) return null;

  return (
    <Breadcrumb
      spacing="8px"
      separator={<Icon as={FiChevronRight} color="gray.400" />}
      mb={6}
      ml={2}
    >
      {crumbs.map((item, idx) => (
        <BreadcrumbItem key={item.path} isCurrentPage={idx === crumbs.length - 1}>
          <BreadcrumbLink
            as="button"
            color={idx === crumbs.length - 1 ? "white" : "gray.300"}
            fontWeight={idx === crumbs.length - 1 ? "bold" : "normal"}
            fontSize="md"
            onClick={() => idx !== crumbs.length - 1 && navigate(item.path)}
            _hover={{
              textDecoration: idx === crumbs.length - 1 ? "none" : "underline",
              color: "white",
            }}
            cursor={idx === crumbs.length - 1 ? "default" : "pointer"}
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;