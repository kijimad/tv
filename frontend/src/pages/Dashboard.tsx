import { Container, Heading } from "@chakra-ui/react";
import VideoList from "../components/video/VideoList";

export default function Dashboard() {
  return (
    <Container maxW="container.xl">
      <Heading size="xl" mb={6}>
        一覧
      </Heading>
      <VideoList />
    </Container>
  );
}
