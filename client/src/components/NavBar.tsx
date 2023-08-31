import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate()
    return(
        <Box bg={'#343434'} color='white' display={'flex'} px={12} py={6} fontWeight='bold'>
                <HamburgerIcon boxSize={8}/>
                <Text fontSize='lg' m={'auto'}>555-555-555</Text>
                <Text my='auto' fontSize='lg' cursor={'pointer'} onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/')
                }}>Cerrar Sesión</Text>
        </Box>
    )
}