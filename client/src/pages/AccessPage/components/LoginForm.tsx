import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
  pass: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:5000/cliente/login', data);
      if (response.status === 201) {
        navigate('/home');
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
      } else {
        console.error('Error en la autenticación:', response.data); // o responseData si usas fetch
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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
      minW={"460px"}
    >
      <Heading size="lg" alignSelf={"center"} mt={4} mb={6}>
        Bienvenido!
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

          <FormControl mt={4} isInvalid={!!errors.pass}>
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

          <Button w={"16rem"} py={6} mt={4} colorScheme="yellow" type="submit">
            Iniciar Sesión
          </Button>

          <Text fontWeight={"100"} color="gray" fontSize={"xl"}>
            o
          </Text>

          <Link to="/register">
            <Button w={"16rem"} py={6} mb={4} type="button">
              Registrate
            </Button>
          </Link>
        </VStack>
      </form>
    </Box>
  );
}
