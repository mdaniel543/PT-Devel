import Modal from "@mui/material/Modal";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCampo({ open, setOpen, handleEdit }) {
  const [data, setData] = React.useState({
    nombre: "",
    titulo: "",
    esRequerido: false,
    tipo: "",
  });

  const handleClose = () => {
    setOpen(false);
    setData({
      nombre: "",
      titulo: "",
      esRequerido: false,
      tipo: "",
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          gap="30px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <Typography
            sx={{ gridColumn: "span 4" }}
            id="modal-modal-title"
            variant="h2"
            component="h2"
          >
            Crear Campo
          </Typography>

          <TextField
            sx={{ gridColumn: "span 4" }}
            fullWidth
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            onChange={(e) => {
              setData({ ...data, nombre: e.target.value });
            }}
            value={data?.nombre}
          />
          <TextField
            sx={{ gridColumn: "span 4" }}
            fullWidth
            id="outlined-basic"
            label="Titulo"
            variant="outlined"
            onChange={(e) => {
              setData({ ...data, titulo: e.target.value });
            }}
            value={data?.titulo}
          />
          <FormControl sx={{ gridColumn: "span 4" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Es obligatorio ?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              value={data?.esRequerido}
              name="radio-buttons-group"
              onChange={(e) => {
                setData({ ...data, esRequerido: e.target.value });
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Si" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
            <InputLabel id="demo-simple-select-label546" variant="outlined">
              Tipo
            </InputLabel>
            <Select
              labelId="demo-simple-select-label546"
              label="Tipo"
              variant="outlined"
              id="demo-simple-select-label546"
              value={data?.idTipo}
              onChange={(e) => {
                setData({ ...data, idTipo: e.target.value });
              }}
              name="idTipo"
            >
              <MenuItem value={1}>Texto </MenuItem>
              <MenuItem value={2}>Fecha </MenuItem>
              <MenuItem value={3}>Numero </MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{ gridColumn: "span 4" }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "15px" }}
              onClick={() => {
                handleEdit(data);
                handleClose();
              }}
            >
              Agregar Campo
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
