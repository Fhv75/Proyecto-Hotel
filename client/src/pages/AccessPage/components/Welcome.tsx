import {
  Button,
  GridItem,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <SimpleGrid
      columns={2}
      spacing={"30rem"}
      display={"flex"}
      mx={"auto"}
      mb={"12rem"}
    >
      <GridItem maxW={"680px"}>
        <Heading as={"h1"} size={"3xl"} noOfLines={3} lineHeight={1.3}>
          Tu Puerta de Acceso a Espacios Excepcionales.
        </Heading>
      </GridItem>
      <GridItem mt={16}>
        <VStack gap={4}>
          <Link to={"/register"}>
            <Button
              fontSize={20}
              w={"13rem"}
              colorScheme="yellow"
              size={"lg"}
              rounded={14}
              height={"3.4rem"}
            >
              Registrate
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button
              fontSize={20}
              w={"13rem"}
              size={"lg"}
              rounded={14}
              height={"3.4rem"}
            >
              Ingresa
            </Button>
          </Link>
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
}
