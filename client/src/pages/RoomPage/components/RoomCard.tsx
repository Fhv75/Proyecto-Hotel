import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faBed,
  faHashtag,
  faHotel,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmationModal from "./ConfirmationModal";

interface RoomProps {
  room: {
    id: number;
    numero: number;
    piso: number;
    tipo: string;
    costodia: string;
    imageUrl: string;
  };
}

interface ReservaData {
  checkIn: string;
  checkOut: string;
  nAcompañantes: number;
  idHabitacion: number | null;
  idCliente: string | null;
}

const roomImages = ["/suite.jpg", "/double.jpg", "/single.jpg"];

const RoomCard: React.FC<RoomProps> = ({ room }) => {
  const iconSize = "2xl";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<ReservaData>();
  const [reservationData, setReservationData] = useState<ReservaData>({
    checkIn: "",
    checkOut: "",
    nAcompañantes: 1,
    idHabitacion: null,
    idCliente: null,
  });
  const randomImage = roomImages[Math.floor(Math.random() * roomImages.length)];

  const onSubmit = (data: ReservaData) => {
    setReservationData({
      ...data,
      idHabitacion: room.id,
      idCliente: localStorage.getItem("userId"),
    });
    onOpen();
  };

  return (
    <Box bg={"white"} minW={"75%"} borderRadius={"lg"} boxShadow={"lg"}>
      <HStack w="full" align={"flex-start"} p={16}>
        <VStack align={"flex-start"} gap={6} ms={10}>
          <Heading>{"Habitacion " + room.tipo + " Piso " + room.piso}</Heading>
          <Divider></Divider>
          <VStack gap={8} align={"flex-start"} ps={10} color="gray.400">
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Máximo:{" "}
                  {room.tipo === "Individual"
                    ? "1 Persona"
                    : room.tipo === "Doble"
                    ? "2 Personas"
                    : "3 Personas"}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Número: {room.numero}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Piso: {room.piso}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Tipo: {room.tipo}
                </Text>
              </HStack>
            </Box>
          </VStack>
          <Divider></Divider>
          <Heading pt={6} size="lg">
            {"$" + room.costodia} / Noche
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack gap={8} mt={2} me={12}>
              <FormControl isRequired>
                <FormLabel fontWeight={"bold"}>Check In</FormLabel>
                <Input
                  placeholder="Fecha Check In"
                  type="date"
                  {...register("checkIn", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={"bold"}>Check Out</FormLabel>
                <Input
                  placeholder="Fecha Check Out"
                  type="date"
                  {...register("checkOut", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={"bold"}>N° Acompañantes</FormLabel>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={10}
                  {...register("nAcompañantes")}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <Button
              size="lg"
              colorScheme="yellow"
              type="submit"
              mt={10}
              color="white"
            >
              Reservar
            </Button>
            <ConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              data={reservationData}
            />
          </form>
        </VStack>
        <Image
          rounded={16}
          src={randomImage}
          w={"640px"}
          h={"580px"}
          objectFit={"cover"}
          ms={"auto"}
        />
      </HStack>
    </Box>
  );
};

export default RoomCard;
