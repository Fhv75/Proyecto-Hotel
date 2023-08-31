import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AccessPage() {
  return (
    // Box with an image background (access.jpg) covered by a transparent black layer. The box content is positioned on top of the black layer
    <Box
      w={"100vw"}
      h={"100vh"}
      bgImage={"url(/access.jpg)"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      position={"relative"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: -1,
      }}
      color={"white"}
      fontSize={"3rem"}
      fontWeight={"bold"}
      zIndex={0}
    >
      <Outlet />
    </Box>
  );
}
