import { Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/ExpandedSearchBar";
import NavBar from "../../components/NavBar/NavBar";
import ResultCard from "./components/ResultCard";

interface RoomData {
  id: number;
  numero: string;
  descripcion: string;
  costodia: number;
  imagen: string;
  tipo: string;
  piso: number;
}

export default function SearchPage() {
  const location = useLocation();
  const [data, setData] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        if(location.search === "") return
      try {
        console.log()
        const response = await axios.get(
          "http://localhost:5000/habitacionesBy",
          {
            params: new URLSearchParams(location.search),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la petición:", error);
      }
    };
    fetchData();
  }, [location.search]);
  return (
    <Box bg={"#f3f3f3"} minH="100vh">
      <NavBar />
      <VStack py={12} gap={10}>
        <SearchBar />
        {data?.map((room: RoomData) => (
          <ResultCard
            key={room.id}
            id={room.id}
            roomNumber={room.numero}
            floor={room.piso}
            price={room.costodia}
            bedType={room.tipo}
          />
        ))}
      </VStack>
    </Box>
  );
}
