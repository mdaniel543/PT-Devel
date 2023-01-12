import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions({ lista }) {
  const [expanded, setExpanded] = React.useState(false);

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
            style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, .03)"  }}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel" + index + "-content"}
              id={"panel" + index + "-header"}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.nombre}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                <b>Titulo:</b> {item.titulo}
              </Typography>
              <Typography  sx={{ color: "text.secondary" }}>
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
