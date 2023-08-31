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
  
  export default function ReservaCard() {
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
            <Grid templateColumns={
                "repeat(3, 1fr)"
            } color="gray.400" mt={-2}>
                <GridItem>
                <HStack gap={4}>
                  <FontAwesomeIcon icon={faPerson} size="2xl" />
                  <Text fontSize="xl" fontWeight={'bold'}>2</Text>
                </HStack>
                </GridItem>
              <GridItem>
                <HStack gap={4}>
                  <FontAwesomeIcon icon={faHashtag} size={iconSize} />
                  <Text fontSize="xl" fontWeight={'bold'}>41</Text>
                </HStack>
              </GridItem>

              <GridItem>
                <HStack gap={4}>
                  <FontAwesomeIcon icon={faMoon} size={iconSize} />
                  <Text fontSize="xl" fontWeight={'bold'}>7</Text>
                </HStack>
              </GridItem>
              <GridItem colSpan={2} pt={10}>
                <HStack gap={4}>
                  <FontAwesomeIcon icon={faCalendar} size={iconSize} />
                  <Text fontSize="xl" fontWeight={'bold'}>13/04/2023  - 20/04/2023</Text>
                </HStack>
              </GridItem>
            </Grid>
          </VStack>
          <VStack my={'auto'} me={'auto'} gap={10}>
            <Heading fontSize="1.6rem">$700.000</Heading>
            <Button w={"80%"} size="lg" fontWeight={'bold'} colorScheme="red" color="white">
              Cancelar
            </Button>
          </VStack>
        </HStack>
      </Box>
    );
  }
  