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
  import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
  export default function ExpandedSearchBar() {
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        tipo: "Individual",
        piso: "",
        costodia: "<500",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handlePisoChange = (value) => {
        setFormData((prevData) => ({
          ...prevData,
          piso: value,
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
            <VStack gap={4}>
              <HStack gap={32}>
                <FormControl isRequired>
                  <FormLabel fontWeight={"bold"}>Check In</FormLabel>
                  <Input
                    name="checkIn"
                    minW="300px"
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
                    <option>Individual</option>
                    <option>Doble</option>
                    <option>Suite</option>
                  </Select>
                </FormControl>
              </HStack>
              <HStack gap={32}>
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Piso</FormLabel>
                  <NumberInput
                    name="piso"
                    defaultValue={1}
                    min={1}
                    max={10}
                    value={formData.piso}
                    onChange={handlePisoChange}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Costo</FormLabel>
                  <Select
                    name="costodia"
                    value={formData.costodia}
                    onChange={handleChange}
                  >
                    <option>{"<500"}</option>
                    <option>{"<200"}</option>
                    <option>{"<100"}</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
  
            <VStack gap={4}>
              <Button colorScheme="yellow" color="white" w={"12rem"} size="lg" type="submit">
                Buscar
              </Button>
  
              <Button w={"12rem"} size="lg" onClick={() => {
                setFormData({
                  checkIn: "",
                  checkOut: "",
                  tipo: "Individual",
                  piso: "",
                  costodia: "",
                });
              }}>
                Limpiar
              </Button>
            </VStack>
          </HStack>
        </form>
      </Box>
    );
  }
  