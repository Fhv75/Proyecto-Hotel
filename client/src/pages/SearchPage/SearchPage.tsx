import { Box, VStack } from "@chakra-ui/react";
import SearchBar from "../../components/ExpandedSearchBar";
import NavBar from "../../components/NavBar";
import ResultCard from "./components/ResultCard";

export default function SearchPage() {
  return (
    <Box bg={"#f3f3f3"} minH='100vh'>
      <NavBar />
      <VStack py={12} gap={10}>
        <SearchBar />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </VStack>
    </Box>
  );
}
