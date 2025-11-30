import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box py={4}>
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Heading size="lg">TV</Heading>
          <Flex gap={6}>
            <Link to="/">ホーム</Link>
            <Link to="/timeline">タイムライン</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
