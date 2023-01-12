import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar";
import Form from "./Form";

const LoginPage = () => {

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <Navbar params={false} />
      <Box
        style={{marginTop: "30px"}}
      >
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="10rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            ¡Bienvenido a la aplicacion de encuestas!
          </Typography>

            <Form />

        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
// Cambios2
