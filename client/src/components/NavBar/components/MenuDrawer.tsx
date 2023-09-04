import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faCalendar,
  faHome,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
// receive isOpen, onClose from parent
export default function MenuDrawer(
  props: React.PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<HTMLButtonElement>;
  }>
) {
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="left"
        onClose={props.onClose}
        finalFocusRef={props.btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack
              fontWeight={"bold"}
              color="gray"
              gap={10}
              align={"start"}
              ms={6}
              mt={4}
            >
              <HStack
                gap={6}
                onClick={() => {
                  navigate("/home");
                }}
                cursor={"pointer"}
              >
                <FontAwesomeIcon icon={faHome} size={"xl"} />
                <Text>Home</Text>
              </HStack>
              <HStack
                gap={6}
                onClick={() => {
                  navigate("/search");
                }}
                cursor={"pointer"}
              >
                <FontAwesomeIcon icon={faSearch} size={"xl"} />
                <Text>Buscar</Text>
              </HStack>
              <HStack
                gap={6}
                onClick={() => {
                  navigate("/reservas");
                }}
                cursor={"pointer"}
              >
                <FontAwesomeIcon icon={faCalendar} size={"xl"} />
                <Text>Mis Reservas</Text>
              </HStack>
              <HStack
                gap={6}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  navigate("/");
                }}
                cursor={"pointer"}
              >
                <FontAwesomeIcon icon={faRightFromBracket} size={"xl"} />
                <Text>Cerrar Sesión</Text>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
