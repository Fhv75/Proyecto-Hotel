// pages/AdminHabitacionesPage.tsx

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

export default function RoomManagementPage() {
  const [habitaciones, setHabitaciones] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/habitacion", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setHabitaciones(response.data);
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    fetchHabitaciones();
  }, []);

  const handleEdit = (habitacion) => {
    setSelectedHabitacion(habitacion);
    onOpen();
  };

  const submitEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/habitacion/${id}`, {
        numero: selectedHabitacion.numero,
        piso: selectedHabitacion.piso,
        tipo: selectedHabitacion.tipo,
      },
      {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        }
      }
      );
      setHabitaciones(
        habitaciones.map((habitacion) =>
          habitacion.id === id
            ? {
                ...habitacion,
                numero: selectedHabitacion.numero,
                piso: selectedHabitacion.piso,
                tipo: selectedHabitacion.tipo,
              }
            : habitacion
        )
      );
    } catch (error) {
      console.error("Error al editar la habitación:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/habitacion/${id}`);
      setHabitaciones(
        habitaciones.filter((habitacion) => habitacion.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la habitación:", error);
    }
  };

  return (
    <Box bg={"#f3f3f3"} minH={"100vh"}>
      <NavBar />
      <VStack my={20} gap={16} mx={40}>
        <Heading>Gestión de Habitaciones</Heading>
        <Button onClick={() => handleEdit({})}>Crear Habitación</Button>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Número</Th>
              <Th>Piso</Th>
              <Th>Tipo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {habitaciones.map((habitacion) => (
              <Tr key={habitacion.id}>
                <Td>{habitacion.id}</Td>
                <Td>{habitacion.numero}</Td>
                <Td>{habitacion.piso}</Td>
                <Td>{habitacion.tipo}</Td>
                <Td>
                  <Button onClick={() => handleEdit(habitacion)}>Editar</Button>
                  <Button onClick={() => handleDelete(habitacion.id)}>
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      {/* Modal para editar o crear habitación */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedHabitacion?.id ? "Editar Habitación" : "Crear Habitación"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Número</FormLabel>
              <Input
                defaultValue={selectedHabitacion?.numero}
                placeholder="Número"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Piso</FormLabel>
              <Input
                defaultValue={selectedHabitacion?.piso}
                placeholder="Piso"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tipo</FormLabel>
              <Input
                defaultValue={selectedHabitacion?.tipo}
                placeholder="Tipo"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" color='white' mr={3} onClick={
                () => {
                    onClose()
                    return submitEdit(selectedHabitacion?.id)
                }
            }>
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
