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

export default function DestacadaCard() {
    const iconSize = 'xl'
  return (
    <Card>
      <Image
        w={"480px"}
        h={"425px"}
        objectFit={"cover"}
        src="https://bit.ly/2Z4KKcF"
        alt="Segun Adebayo"
      />
      <CardBody>
        <VStack align={"start"} mt={1} gap={3}>
          <Heading fontSize="1.5rem" mb={3}>
            Habitacion Double Piso 4
          </Heading>
          <SimpleGrid columns={2} spacing={10} color="gray.400" ms={10} mt={-2}>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="lg">2</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="lg">41</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="lg">4</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="lg">Double</Text>
              </HStack>
            </Box>
          </SimpleGrid>
        <Button colorScheme="yellow" size={"lg"} w={"100%"} color='white' mt={4}>
          Ver Más
        </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
