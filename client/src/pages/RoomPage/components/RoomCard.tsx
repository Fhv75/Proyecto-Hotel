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
} from "@chakra-ui/react";
import {
  faBed,
  faHashtag,
  faHotel,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RoomCard() {
  const iconSize = "2xl";
  return (
    <Box
      bg={"white"}
      minW={"75%"}
      borderRadius={"lg"}
      boxShadow={"lg"}
    >
      <HStack w="full" align={"flex-start"} p={16}>
        <VStack align={"flex-start"} gap={6}ms={10}>
          <Heading>Habitación Double Piso 4</Heading>
          <Divider></Divider>
          <VStack gap={8} align={'flex-start'} ps={10} color="gray.400">
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faPerson} size="2xl" />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Máximo: 2 Personas
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Número: 41
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faHotel} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Piso: 4
                </Text>
              </HStack>
            </Box>
            <Box>
              <HStack gap={4}>
                <FontAwesomeIcon icon={faBed} size={iconSize} />
                <Text fontSize="xl" fontWeight={"bold"}>
                  Tipo: Double
                </Text>
              </HStack>
            </Box>
          </VStack>
          <Divider></Divider>
          <Heading pt={6} size='lg'>$100.000 / Noche</Heading>
          <form>
            <HStack gap={8} mt={2}>
            <FormControl>
            <FormLabel fontWeight={"bold"}>Check In</FormLabel>
            <Input placeholder="Fecha Check In" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"bold"}>Check Out</FormLabel>
            <Input placeholder="Fecha Check Out" type="date" />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"bold"}>N° Acompañantes</FormLabel>
            <NumberInput defaultValue={1} min={1} max={10}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
              </FormControl>
            </HStack>
              <Button size="lg" colorScheme="yellow"
              type="submit" mt={10} color="white">Reservar</Button>
          </form>
        </VStack>
        <Image
          rounded={16}
          src="https://bit.ly/2Z4KKcF"
          alt="Segun Adebayo"
          w={"640px"}
          h={"580px"}
          objectFit={"cover"}
          ms={"auto"}
        />
      </HStack>
    </Box>
  );
}
