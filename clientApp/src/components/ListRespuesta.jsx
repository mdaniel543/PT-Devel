import React from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { useDeleteEncuestaMutation } from "../app/api/apiEncuesta";
import Header from "./Header";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetRespuestasQuery } from "../app/api/apiResp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const ListRespuesta = () => {
  const enc = useSelector((state) => state.encuesta.encuesta);

  const { data } = useGetRespuestasQuery(enc?.idEncuesta);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "nombreCampo", label: "Nombre Campo", minWidth: 100 }, 
    { id: "tituloCampo", label: "Titulo Campo", minWidth: 100 },
    { id: "valor", label: "Valor", minWidth: 170 },
  ]

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
        title="Lista de Respuestas"
        subtitle="Lista de Respuestas de la Encuesta"
      />
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    <b> {column.label}</b>{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ height: "2rem" }}></div>
    </Box>
  );
};

export default ListRespuesta;
