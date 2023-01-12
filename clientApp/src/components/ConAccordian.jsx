import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDeleteCamposMutation } from "../app/api/apiCampos";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Box } from "@mui/material";
import Swal from "sweetalert2";

export default function ControlledAccordions({ lista, del = false }) {
  const [expanded, setExpanded] = React.useState(false);
  const [deleteCampo] = useDeleteCamposMutation();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {lista.map((item, index) => {
        return (
          <Accordion
            expanded={expanded === "panel" + index}
            onChange={handleChange("panel" + index)}
            style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, .03)" }}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel" + index + "-content"}
              id={"panel" + index + "-header"}
            >
              <Typography sx={{ width: "5%", flexShrink: 0 }}>
                {item.nombre}
              </Typography>
              {del && (
                <Box
                  display="flex"
                  justifyContent="right"
                  sx={{ marginTop: "-5px" }}
                >
                  <IconButton onClick={() => {
                    Swal.fire({
                      title: "¿Estas seguro?",
                      text: "No podras revertir esta accion!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si, eliminar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteCampo(item.idCampo)
                          .unwrap()
                          .then(() => {
                            Swal.fire(
                              "Eliminado!",
                              "El campo se ha eliminado correctamente",
                              "success"
                            );
                          });
                      }
                    });
                  }}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Box>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                <b>Titulo:</b> {item.titulo}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                <b>Tipo:</b>{" "}
                {item.idTipo === 1
                  ? "texto"
                  : item.idTipo === 2
                  ? "fecha"
                  : "numero"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
