import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
// Add property "expand" to searchbar
export default function ExpandedSearchBar() {
  return (
    <Box bg="white" rounded={14} py={10} px={24}>
      <form>
        <HStack gap={32}>
          <FormControl>
            <FormLabel fontWeight={"bold"}>Check In</FormLabel>
            <Input placeholder="Fecha Check In" type="date" />
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

          <Button
            colorScheme="yellow"
            color="white"
            w={"22rem"}
            size="lg"
            type="submit"
          >
            Buscar
          </Button>
          {}
        </HStack>
      </form>
    </Box>
  );
}
