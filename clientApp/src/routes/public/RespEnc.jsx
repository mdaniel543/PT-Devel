import React from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetEncuestaQuery } from "../../app/api/apiEncuesta";
import { useGetCamposQuery } from "../../app/api/apiCampos";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { usePostRespuestasMutation } from "../../app/api/apiResp";
import Swal from "sweetalert2";

const RespEnc = () => {
  const { token, id } = useParams();
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [postRespuestas] = usePostRespuestasMutation();
  const { data: encuestaData, isFetching: Fetch } = useGetEncuestaQuery(id);

  const { data: camposData, isFetching } = useGetCamposQuery(id);

  const [respuestas, setRespuestas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(respuestas);
    await postRespuestas({
      resps: respuestas,
    })
      .unwrap()
      .then((res) => {
        Swal.fire({
          title: "Respuestas enviadas",
          text: "Las respuestas se enviaron correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        window.location.reload();
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRespuestas((prev) => {
      const newRespuestas = [...prev];
      const index = newRespuestas.findIndex((r) => r.idCampo === id);
      if (index === -1) {
        newRespuestas.push({ idCampo: id, valor: value });
      } else {
        newRespuestas[index].valor = value;
      }
      return newRespuestas;
    });
  };

  return (
    <Box style={{ marginTop: "30px" }}>
      {isFetching ||
        (Fetch && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        ))}
      {!isFetching && !Fetch && (
        <Box
          width={isNonMobile ? "50%" : "93%"}
          p="2rem"
          m="10rem auto"
          borderRadius="1.5rem"
          backgroundColor={palette.background.alt}
        >
          <Typography fontWeight="500" variant="h3" sx={{ mb: "1.5rem" }}>
            Responder a la encuesta <b>{encuestaData?.nombre}</b>
          </Typography>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            {encuestaData?.descripcion}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              {camposData?.map((campo) => (
                <TextField
                  key={campo.idCampo}
                  fullWidth
                  id={campo.idCampo}
                  size="large"
                  label={campo.titulo + " " + (campo.esRequerido ? "*" : "")}
                  InputLabelProps={{
                    //colocar rojo la label si es requerido
                    shrink: true,
                    sx: {
                      color: campo.esRequerido ? "red" : undefined,
                    } 
                  }}
                  onChange={handleChange}
                  type={
                    campo.idTipo === 1
                      ? "text"
                      : campo.idTipo === 2
                      ? "date"
                      : "number"
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              ))}
            </Box>
            <Box>
              <LoadingButton
                fullWidth
                loading={loading}
                loadingIndicator="Loading…"
                type="submit"
                sx={{
                  m: "1.5rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Responder
              </LoadingButton>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default RespEnc;
