import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import { shades } from "../../style/theme";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: shades.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={"/admin" + to} />
      </MenuItem>
    );
  };


  const Sidebar = () => {
    const usuario = useSelector((state) => state.sesion.usuario);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isCollapsed, setIsCollapsed] = useState(!isNonMobile);
    const [selected, setSelected] = useState("Dashboard");
    return (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${shades.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#A9C4FF !important",
          },
          "& .pro-menu-item.active": {
            color: "#3977FF !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: shades.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h5" color={shades.grey[100]}>
                    ADMINISTRADOR
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
  
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h5"
                    color={shades.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {usuario.Email}
                  </Typography>
                </Box>
              </Box>
            )}
  
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Home"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
  
              <Typography
                variant="h6"
                color={shades.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Encuesta
              </Typography>
              <Item
                title="Crear Encuesta"
                to="/crearEncuesta"
                icon={<TimelineRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manejo Encuestas"
                to="/showEncuesta"
                icon={<EqualizerRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  };
  
  export default Sidebar;