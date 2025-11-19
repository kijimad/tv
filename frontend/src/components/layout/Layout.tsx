import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Box as="main" py={8}>
        <Outlet />
      </Box>
    </Box>
  );
}
