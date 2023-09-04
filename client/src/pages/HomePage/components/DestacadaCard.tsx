import {
  Box,
  Button,
  Card,
  CardBody,
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

const roomImages = ["/suite.jpg", "/double.jpg", "/single.jpg"];

export default function DestacadaCard({ habitacion }) {
  const iconSize = "xl";
  const randomImage = roomImages[Math.floor(Math.random() * roomImages.length)];
  const navigate = useNavigate();

  return (
    <Card>
      <Image
        w={"480px"}
        h={"425px"}
        objectFit={"cover"}
        src={randomImage}
      />
      <CardBody>
        <VStack align={"start"} mt={1} gap={3}>
          <Heading fontSize="1.5rem" mb={3}>
            Habitacion {habitacion?.tipo + " Piso " + habitacion?.piso}
          </Heading>
          <SimpleGrid columns={2} spacing={10} color="gray.400" ms={10} mt={-2}>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="lg">
                  {habitacion?.tipo === "Individual"
                    ? "1"
                    : habitacion?.tipo === "Doble"
                    ? "2"
                    : "3"}
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="lg">{habitacion?.numero}</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="lg">{habitacion?.piso}</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="lg">{
                    habitacion?.tipo
                }</Text>
              </HStack>
            </Box>
          </SimpleGrid>
          <Button
            colorScheme="yellow"
            size={"lg"}
            w={"100%"}
            color="white"
            mt={4}
            onClick={() => navigate("/room/" + habitacion?.id)}
          >
            Ver Más
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
