import { Box, IconButton } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { shades } from "../style/theme";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

function Navbar({ params }) {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="70px"
      backgroundColor="#CEFAFF"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          onClick={() => navigate("/")}
        >
          <LeaderboardRoundedIcon />ACME<LeaderboardRoundedIcon />
        </IconButton>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {params ? (
            <IconButton
              sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
              onClick={() => navigate("/login")}
            >
              <PersonOutline />
            </IconButton>
          ) : (
            <>
              <IconButton
                sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
