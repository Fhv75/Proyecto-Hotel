import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "./components/MenuDrawer";
import { useRef } from "react";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  return (
    <Box
      bg={"#343434"}
      color="white"
      display={"flex"}
      px={12}
      py={6}
      fontWeight="bold"
    >
        <Button ref={btnRef} colorScheme="none" onClick={onOpen}>
            <HamburgerIcon boxSize={8} />
        </Button>
        <MenuDrawer
            isOpen={isOpen}
            onClose={onClose}
            btnRef={btnRef}
        />
      <Text fontSize="lg" m={"auto"}>
        555-555-555
      </Text>
      <Text
        my="auto"
        fontSize="lg"
        cursor={"pointer"}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/");
        }}
      >
        Cerrar Sesión
      </Text>
    </Box>
  );
}
