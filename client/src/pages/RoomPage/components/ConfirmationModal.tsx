import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
  } from "@chakra-ui/react";
  
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
      checkIn: string;
      checkOut: string;
      nAcompañantes: number;
      idHabitacion: number;
      idCliente: number;
    };
  }
  
  const ConfirmationModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
    const toast = useToast();
  
    const handleConfirm = async () => {
      try {
        const response = await fetch("http://localhost:5000/reservas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            idCliente: Number(data.idCliente),
            idHabitacion: data.idHabitacion,
            tsCheckIn: data.checkIn,
            nAcompañantes: Number(data.nAcompañantes),
            tsCheckOut: data.checkOut,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          toast({
            title: "Reserva creada",
            description: `Reserva #${result.id} creada exitosamente`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        toast({
          title: "Error al crear reserva",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¿Confirmar Reserva?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={2}>
                <strong>Check In:</strong> {data.checkIn}
              </Text>
              <Text mb={2}>
                <strong>Check Out:</strong> {data.checkOut}
              </Text>
              <Text>
                <strong>N° Acompañantes:</strong> {data.nAcompañantes}
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="yellow" mr={3} onClick={handleConfirm}>
                Confirmar
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ConfirmationModal;
  