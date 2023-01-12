import React from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { usePutEncuestaMutation } from "../app/api/apiEncuesta";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModalCampo from "./AddCampos";
import ControlledAccordions from "./ConAccordian";
import { usePostCamposMutation } from "../app/api/apiCampos";
import { useGetCamposQuery } from "../app/api/apiCampos";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const PutEncuesta = () => {
  const navigate = useNavigate();

  const initialValues = useSelector((state) => state.encuesta.encuesta);

  const { data: camposExis = [] } = useGetCamposQuery(initialValues.idEncuesta);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [putEncuesta] = usePutEncuestaMutation();

  const [campos, setCampos] = React.useState([]);

  const [postCampos] = usePostCamposMutation();
  const handleFormSubmit = async (values, onSubmitProps) => {
    Swal.fire({
      title: "Cargando",
      text: "Cargando campos",
      icon: "info",
      confirmButtonText: "Ok",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setIsSubmitting(true);
    await putEncuesta(values)
      .unwrap()
      .then(async (res) => {
        console.log(res);
        if (campos.length === 0) {
          Swal.fire({
            title: "Encuesta Actualiza Correctamente",
            text: "Ok",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setIsSubmitting(false);
          window.location.reload();
          navigate("/admin/showEncuesta");
          return;
        }
        await postCampos({ campos: campos, idEncuesta: values.idEncuesta })
          .unwrap()
          .then((res) => {
            Swal.fire({
              title: "Encuesta Actualiza Correctamente",
              text: "Ok",
              icon: "success",
              confirmButtonText: "Ok",
            });
            setIsSubmitting(false);
            setCampos([]);
            window.location.reload();
            navigate("/admin/showEncuesta");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al editar la encuesta",
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
        setIsSubmitting(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al editar la encuesta",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setIsSubmitting(false);
      });
  };

  return (
    <Box m="20px" sx={{ marginTop: "-25px" }}>
      <Box display="flex" justifyContent="right" sx={{ marginBottom: "-40px" }}>
        <IconButton
          onClick={() => {
            navigate("/admin/showEncuesta");
          }}
        >
          <CloseSharpIcon fontSize="large" />
        </IconButton>
      </Box>
      <Header
        title="Editar Encuesta"
        subtitle="Editar encuesta con todo sus campos"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombres"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion}
                name="descripcion"
                error={!!touched.descripcion && !!errors.descripcion}
                helperText={touched.descripcion && errors.descripcion}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box justifyContent="center" mt="20px" style={{ width: "100%" }}>
              <ControlledAccordions lista={camposExis} del={true} />
            </Box>
            <Box justifyContent="center" mt="20px" style={{ width: "100%" }}>
              <ControlledAccordions lista={campos} />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              Campos de la encuesta
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                Editar Encuesta
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ModalCampo
        open={open}
        setOpen={setOpen}
        handleEdit={(values) => {
          console.log(values);
          //lo agrego a la lista
          setCampos([...campos, values]);
        }}
      />
      <div style={{ height: "2rem" }}></div>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
  descripcion: yup.string().required("Campo requerido"),
});

export default PutEncuesta;
