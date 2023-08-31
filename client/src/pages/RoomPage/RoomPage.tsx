import { Box, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import SearchBar from '../../components/SearchBar';
import RoomCard from "./components/RoomCard";

 
  export default function RoomPage() {
    return (
      <Box bg={'#f3f3f3'} minH={'100vh'}>
        <NavBar />
        <VStack py={8} gap={10}>
            <SearchBar />
            <RoomCard />
        </VStack>
      </Box>
    );
  }
  