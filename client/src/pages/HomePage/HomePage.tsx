import { Box, HStack, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar";
import DestacadaCard from "./components/DestacadaCard";

export default function HomePage() {
  const [habitaciones, setHabitaciones] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchHabitaciones() {
      try {
        const response = await axios.get("http://localhost:5000/popularHabitaciones", {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setHabitaciones(response.data.slice(0, 3)); // Guarda solo las 3 primeras habitaciones
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las habitaciones destacadas.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }

    fetchHabitaciones();
  }, [toast]);
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
          {habitaciones.map((habitacion) => (
            <DestacadaCard key={habitacion.id} habitacion={habitacion} />
          ))}
        </HStack>
        <SearchBar />
      </Box>
    </Box>
  );
}
