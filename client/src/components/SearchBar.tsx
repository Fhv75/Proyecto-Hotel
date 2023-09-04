import  { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        tipo: "Individual",
      });
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
            const filteredData = Object.fromEntries(
          Object.entries(formData).filter(([key, value]) => value && value.trim() !== "")
        );
    
        const queryParams = new URLSearchParams(filteredData).toString();
        navigate(`/search?${queryParams}`);
    };

  return (
    <Box bg="white" rounded={14} py={10} px={24}>
      <form onSubmit={handleSubmit}>
        <HStack gap={32}>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"}>Check In</FormLabel>
            <Input
              name="checkIn"
              placeholder="Fecha Check In"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"}>Check Out</FormLabel>
            <Input
              name="checkOut"
              placeholder="Fecha Check Out"
              type="date"
              value={formData.checkOut}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"bold"}>Tipo</FormLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="Individual">Individual</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
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
        </HStack>
      </form>
    </Box>
  );
}