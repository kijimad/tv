import { Container, Heading } from "@chakra-ui/react";
import VideoList from "../components/video/VideoList";
import RecordingStatusList from "../components/recording/RecordingStatusList";
import Statistics from "../components/statistics/Statistics";

export default function Dashboard() {
  return (
    <Container maxW="container.xl">
      <Heading size="xl" mb={6}>
        ホーム
      </Heading>
      <RecordingStatusList />
      <Statistics />
      <VideoList />
    </Container>
  );
}
