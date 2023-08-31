import { Box, HStack, Heading } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import NavBar from "../../components/NavBar";
import DestacadaCard from "./components/DestacadaCard";

export default function HomePage() {
  return (
    <Box bg={"#f3f3f3"}>
      <NavBar />
      <Box
        bgImage={"url(/header.jpg)"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"no-repeat"}
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _before={{
          content: `""`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.47)",
          zIndex: -1,
        }}
        color={"white"}
        fontSize={"3rem"}
        fontWeight={"bold"}
        zIndex={0}
      >
        <Heading
          textAlign="center"
          size="2xl"
          px={"30rem"}
          mx={"auto"}
          py={32}
          lineHeight={1.3}
        >
          Reservación Sencilla, Estancias Inolvidables.
        </Heading>
      </Box>
      <Box px={32} py={20}>
        <Heading size="xl">Destacadas</Heading>
        <HStack pt={10} pb={14} justifyContent={"center"} gap={20}>
          <DestacadaCard />
          <DestacadaCard />
          <DestacadaCard />
        </HStack>
        <SearchBar />
      </Box>
    </Box>
  );
}
