import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faBed,
  faHashtag,
  faHotel,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// Arreglo de imágenes de habitaciones
const roomImages = ["./suite.jpg", "./double.jpg", "./single.jpg"];

interface ResultCardProps {
  id: number;
  roomNumber: string;
  floor: number;
  bedType: string;
  price: number;
}

export default function ResultCard({
  id,
  roomNumber,
  floor,
  bedType,
  price,
}: ResultCardProps) {
  const iconSize = "2xl";
  const navigate = useNavigate();
  // Seleccionar una imagen al azar del arreglo
  const randomImage = roomImages[Math.floor(Math.random() * roomImages.length)];

  return (
    <Box bg="white" minW={"1325px"} rounded={16}>
      <HStack alignItems={"normal"}>
        <Image
          rounded={16}
          src={randomImage}
          alt="Room Image"
          w={"361px"}
          h={"325px"}
          objectFit={"cover"}
        />
        <VStack gap={10} ms={20} me={"auto"} alignItems={"start"}>
          <Box mt={10} w={"30rem"}>
            <Heading size={"lg"} mb={3} onClick={() => {navigate("/room/" + id)}} cursor={'pointer'}>
              {"Habitacion " + bedType + " Piso " + floor}
            </Heading>
            <Divider></Divider>
          </Box>
          <SimpleGrid columns={2} spacing={10} color="gray.400" mt={-2}>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {bedType === "Single" ? 1 : bedType === "Do   ble" ? 2 : 3}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {roomNumber}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {floor}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  {bedType}
                </Text>
              </HStack>
            </Box>
          </SimpleGrid>
        </VStack>
        <VStack my={"auto"} me={"auto"} gap={10}>
          <Heading fontSize="1.6rem">Desde ${price}</Heading>
          <Button
            w={"80%"}
            size="lg"
            fontWeight={"bold"}
            colorScheme="yellow"
            color="white"
            onClick={() => {navigate("/room/" + id)}}
          >
            Reservar
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
