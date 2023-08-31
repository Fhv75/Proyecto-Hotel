import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  nombre: string;
  telefono: string;
  pass: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:5000/cliente", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        localStorage.setItem("token", responseData.token);
        navigate("/home");
      } else {
        console.error("Error en el registro:", responseData.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Box
      maxWidth="400px"
      margin="0 auto"
      padding="20px"
      bg="white"
      rounded={12}
      color="black"
      display={"flex"}
      flexDirection={"column"}
      py={8}
      px={14}
      minW={"500px"}
    >
      <Heading size="lg" alignSelf={"center"} mt={4} mb={6}>
        Registrarse
      </Heading>
      <Divider mb={8}></Divider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel mb={-3}>Correo Electrónico</FormLabel>
            <Input
              placeholder="example@mail.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.nombre}>
            <FormLabel mb={-3}>Nombre Completo</FormLabel>
            <Input
              placeholder="Floripondio Pancracio"
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>

          <HStack gap={6}>
            <FormControl isInvalid={!!errors.telefono}>
              <FormLabel mb={-3}>Teléfono</FormLabel>
              <Input
                placeholder="+56912345678"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                })}
              />
              <FormErrorMessage>
                {errors.telefono && errors.telefono.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.pass}>
              <FormLabel mb={-3}>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register("pass", {
                  required: "La contraseña es obligatoria",
                })}
              />
              <FormErrorMessage>
                {errors.pass && errors.pass.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <Button w={"16rem"} py={6} mt={4} colorScheme="yellow" type="submit">
            Registrarse
          </Button>

          <Text fontWeight={"100"} color="gray" fontSize={"xl"}>
            o
          </Text>
          <Link to="/login">
            <Button w={"16rem"} py={6} mb={4} type="button">
              Iniciar Sesión
            </Button>
          </Link>
        </VStack>
      </form>
    </Box>
  );
}
