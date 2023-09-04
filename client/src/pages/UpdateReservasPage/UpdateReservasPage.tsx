// pages/AdminReservasPage.tsx

import { Box, Button, Heading, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

export default function UpdateReservasPage() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reservas", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setReservas(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  const cerrarReserva = async (id) => {
    try {
      await axios.put(`http://localhost:5000/reservas/${id}`, {
        estado: "Cerrada",
      });
      setReservas(reservas.map(reserva => reserva.id === id ? { ...reserva, estado: "Cerrada" } : reserva));
    } catch (error) {
      console.error("Error al cerrar la reserva:", error);
    }
  };

  return (
    <Box bg={"#f3f3f3"} minH={"100vh"}>
      <NavBar />
      <VStack my={20} gap={16} mx={40}>
        <Heading>Reservas</Heading>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Habitación</Th>
              <Th>Cliente</Th>
              <Th>Estado</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {// No mostrar boton si la reserva tiene estado cancelada
            reservas.map((reserva) => (
              <Tr key={reserva.id}>
                <Td>{reserva.id}</Td>
                <Td>{reserva.idhabitacion}</Td>
                <Td>{reserva.idcliente}</Td>
                <Td>{reserva.estado}</Td>
                <Td>
                  {reserva.estado !== "Cerrada" && reserva.estado !== "Cancelada" && (
                    <Button onClick={() => cerrarReserva(reserva.id)}>Cerrar Reserva</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}
