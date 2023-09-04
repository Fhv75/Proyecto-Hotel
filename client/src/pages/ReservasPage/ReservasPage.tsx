import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ReservaCard from "./components/ReservaCard";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);

  const removeReservaFromList = (id) => {
    console.log("Hola");
    const updatedReservas = reservas.filter((reserva) => reserva.id !== id);
    console.log(updatedReservas);
    setReservas(updatedReservas);
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/myreservas", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setReservas(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);
  return (
    <Box bg={"#f3f3f3"} minH={"100vh"}>
      <NavBar />
      <VStack my={20} gap={16}>
        <Heading me={"auto"} ms={52}>
          Mis Reservas
        </Heading>
        {!reservas.every((reserva) => reserva.estado === "Cerrada" || reserva.estado === "Cancelada") ? (
          reservas.map(
            (reserva, index) =>
              reserva.estado === "Confirmada" && (
                <ReservaCard
                  key={index}
                  reserva={reserva}
                  onReservaCancel={removeReservaFromList}
                />  
              )
          )
        ) : (
          <Text  fontSize="2xl" fontWeight={700} me={"auto"} ms={52} color="gray">
            No tienes reservas activas.
          </Text>
        )}
      </VStack>
    </Box>
  );
}
