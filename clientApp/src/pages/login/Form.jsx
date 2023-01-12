import React from "react";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../../app/slices/sesion";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
  email: yup.string().email("email invalido").required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  nombre: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      await axios.post(`https://localhost:7169/Usuario`, values);
      Swal.fire({
        title: "Usuario registrado",
        text: "El usuario se registró correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
    setPageType(isLogin ? "register" : "login");
    onSubmitProps.resetForm();
  };

  const dispatch = useDispatch();

  const login = async (values, onSubmitProps) => {
    console.log(values);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://localhost:7169/Usuario/login`,
        values
      );
      const decodedToken = decodeToken(data.token);

      if (isExpired(data.token)) {
        Swal.fire({
          title: "Error",
          text: "El token ha expirado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      dispatch(
        iniciarSesion({
          token: data.token,
          usuario: decodedToken,
        })
      );
      setLoading(false);

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
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
            {isRegister && (
              <TextField
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={Boolean(touched.nombre) && Boolean(errors.nombre)}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 4" }}
              />
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}
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
              {isLogin ? "INCIAR SESION" : "REGISTRARME"}
            </LoadingButton>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "¿No tienes una cuenta? Registrate aqui."
                : "¿Ya tienes una cuenta? Inicia sesion aqui."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
