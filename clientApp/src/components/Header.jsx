import { Typography, Box } from "@mui/material";
import { shades } from "../style/theme";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={shades.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={shades.primary[600]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;