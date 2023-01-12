import React from "react";
import { Box, Button, TextField } from "@mui/material";

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
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListEncuesta = ({ data = [] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "nombre", label: "Nombre", minWidth: 140 },
    { id: "descripcion", label: "Descripcion", minWidth: 170 },
    { id: "link", label: "Link", minWidth: 50 },
    { id: "edit", label: "Editar", minWidth: 50 },
    { id: "delete", label: "Borrar", minWidth: 50 },
  ];

  return (
    <Box m="20px" sx={{ marginTop: "-25px" }}>
      <Header
        title="Lista de Encuestas"
        subtitle="Aqui aparaecen todas las encuestas creadas por el usuario"
      />
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {data.map((row) => {
                const estado = row["estado"];
                return (
                  <TableRow
                    style={{
                      backgroundColor: estado === false ? "#B4B4B4" : "#fff",
                    }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "link") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <LinkIcon />
                          </TableCell>
                        );
                      } else if (column.id === "edit") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <EditIcon />
                          </TableCell>
                        );
                      } else if (column.id === "delete") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <DeleteIcon />
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
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
          count={data.length}
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

export default ListEncuesta;
