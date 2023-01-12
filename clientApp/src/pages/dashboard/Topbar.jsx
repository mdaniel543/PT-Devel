import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../../app/slices/sesion";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" borderRadius="3px">
        
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton
          onClick={() => {
            dispatch(cerrarSesion());
            navigate("/");
          }}
          sx={{
            "&:hover": {
              outline: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
