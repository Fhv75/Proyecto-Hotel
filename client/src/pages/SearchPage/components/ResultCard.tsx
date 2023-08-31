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

export default function ResultCard() {
  const iconSize = "2xl";
  return (
    <Box bg="white" minW={"1325px"} rounded={16}>
      <HStack alignItems={'normal'}>
        <Image
          rounded={16}
          src="https://bit.ly/2Z4KKcF"
          alt="Segun Adebayo"
          w={"361px"}
          h={"325px"}
          objectFit={"cover"}
        />
        <VStack gap={10} ms={20} me={'auto'} alignItems={'start'}>
          <Box mt={10} w={'30rem'}>
            <Heading size={"lg"} mb={3}>
              Habitacion Double Piso 4
            </Heading>
            <Divider></Divider>
          </Box>
          <SimpleGrid columns={2} spacing={10} color="gray.400" mt={-2}>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="xl" fontWeight={'bold'}>2</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="xl" fontWeight={'bold'}>41</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="xl" fontWeight={'bold'}>4</Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="xl" fontWeight={'bold'}>Double</Text>
              </HStack>
            </Box>
          </SimpleGrid>
        </VStack>
        <VStack my={'auto'} me={'auto'} gap={10}>
          <Heading fontSize="1.6rem">Desde $100.000</Heading>
          <Button w={"80%"} size="lg" fontWeight={'bold'} colorScheme="yellow" color="white">
            Reservar
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
