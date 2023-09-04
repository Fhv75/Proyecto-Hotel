import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faCalendar,
  faHashtag,
  faMoon,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const roomImages = ["/suite.jpg", "/double.jpg", "/single.jpg"];

export default function ReservaCard({ reserva, onReservaCancel }) {
  const iconSize = "2xl";
  const [habitacion, setHabitacion] = useState(null);
  const randomImage = roomImages[Math.floor(Math.random() * roomImages.length)];
  // funcion para calcular la diferencia de dias entre 2 timestamps en formato ISO
  const getDays = (ts1, ts2) => {
    const date1 = new Date(ts1);
    const date2 = new Date(ts2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nDias = getDays(reserva.tscheckin, reserva.tscheckout) || 1;

  const cancelReserva = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/reservas/${reserva.id}`,
        { headers: { Authorization: `${localStorage.getItem("token")}` } },
      );
      if (response.status === 204) {
        alert("Reserva cancelada con éxito");
    }
    onReservaCancel(reserva.id);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Error al cancelar la reserva. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    async function fetchHabitacion() {
      try {
        const response = await axios.get(
          `http://localhost:5000/habitacion/${reserva.idhabitacion}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setHabitacion(response.data);
      } catch (error) {
        console.error("Error al obtener la habitación:", error);
      }
    }

    fetchHabitacion();
  }, [reserva.idhabitacion]);

  // remove time from stringfied timestamps
  reserva.tscheckin = reserva.tscheckin.split("T")[0];
  reserva.tscheckout = reserva.tscheckout.split("T")[0];

  return (
    <Box bg="white" minW={"1325px"} rounded={16}>
      <HStack alignItems={"normal"}>
        <Image
          rounded={16}
          src={randomImage}
          w={"361px"}
          h={"325px"}
          objectFit={"cover"}
        />
        <VStack gap={10} ms={20} me={"auto"} alignItems={"start"}>
          <Box mt={10} w={"30rem"}>
            <Heading size={"lg"} mb={3}>
              {"Habitacion " + habitacion?.tipo + " Piso " + habitacion?.piso}
            </Heading>
            <Divider></Divider>
          </Box>
          <Grid templateColumns={"repeat(3, 1fr)"} color="gray.400" mt={-2}>
            <GridItem>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {reserva.nacompa_antes}
                </Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {habitacion?.numero || reserva.roomNumber}
                </Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faMoon} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {nDias}
                </Text>
              </HStack>
            </GridItem>
            <GridItem colSpan={2} pt={10}>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faCalendar} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {reserva.tscheckin + " - " + reserva.tscheckout}
                </Text>
              </HStack>
            </GridItem>
          </Grid>
        </VStack>
        <VStack my={"auto"} me={"auto"} gap={10}>
          <Heading fontSize="1.6rem">{"$" + habitacion?.costodia *  nDias}</Heading>
          <Button
            w={"80%"}
            size="lg"
            fontWeight={"bold"}
            colorScheme="red"
            color="white"
            onClick={cancelReserva}
          >
            Cancelar
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
