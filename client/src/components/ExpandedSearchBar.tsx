import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from "@chakra-ui/react";
// Add property "expand" to searchbar
export default function ExpandedSearchBar() {
  return (
    <Box bg="white" rounded={14} py={10} px={24}>
      <form>
        <HStack gap={32}>
          <VStack gap={4}>
            <HStack gap={32}>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Check In</FormLabel>
                <Input minW="300px" placeholder="Fecha Check In" type="date" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Check Out</FormLabel>
                <Input placeholder="Fecha Check Out" type="date" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Tipo</FormLabel>
                <Select>
                  <option>Hola</option>
                  <option>como</option>
                  <option>estas</option>
                </Select>
              </FormControl>
            </HStack>
            <HStack gap={32}>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Piso</FormLabel>
                <NumberInput defaultValue={1} min={1} max={10}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Costo</FormLabel>
                <Select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Select>
              </FormControl>
            </HStack>
          </VStack>

          <VStack gap={4}>
            <Button colorScheme="yellow" color="white" w={"12rem"} size="lg">
              Buscar
            </Button>

            <Button w={"12rem"} size="lg">
              Limpiar
            </Button>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
}
