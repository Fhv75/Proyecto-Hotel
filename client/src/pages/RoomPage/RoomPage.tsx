import { Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar";
import RoomCard from "./components/RoomCard";

export default function RoomPage() {
  const { id } = useParams(); // Obtenemos el ID de la habitación de la URL
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/habitacion/${id}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setRoomData(response.data);
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de la habitación:",
          error
        );
      }
    };

    fetchRoomData();
  }, [id]);

  return (
    <Box bg={"#f3f3f3"} minH={"100vh"}>
      <NavBar />
      <VStack py={8} gap={10}>
        <SearchBar />
        {roomData && <RoomCard room={roomData} />}
      </VStack>
    </Box>
  );
}
