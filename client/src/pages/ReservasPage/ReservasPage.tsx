import { Box, Heading, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import ReservaCard from "./components/ReservaCard";

export default function ReservasPage() {
  return (
    <Box bg={"#f3f3f3"} minH={"100vh"}>
      <NavBar />
      <VStack my={20} gap={16}>
        <Heading me={'auto'} ms={52}>
            Mis Reservas
        </Heading>
        <ReservaCard />
      </VStack>
    </Box>
  );
}
