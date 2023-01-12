import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../pages/dashboard/Sidebar";
import Topbar from "../../pages/dashboard/Topbar";
import PostEncuesta from "../../components/PostEncuesta";
import ListEncuesta from "../../components/ListEncuesta";
import { useGetEncuestasQuery } from "../../app/api/apiEncuesta";
import PutEncuesta from "../../components/EditEncuesta";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../Protected";
import ListRespuesta from "../../components/ListRespuesta";

function AppAdmin({ id }) {
  const { data, isFetching } = useGetEncuestasQuery(id);
  const [isSidebar, setIsSidebar] = useState(true);

  const enc = useSelector((state) => state.encuesta.encuesta);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <div
          style={{
            marginBottom: "40px",
          }}
        ></div>
        <Routes>
          <Route
            path=""
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
                }}
              >
                <h1>Hola Bienvenido</h1>
              </div>
            }
          />
          <Route path="crearEncuesta" element={<PostEncuesta />} />

          <Route
            path="showEncuesta"
            element={<ListEncuesta data={data} isFetching={isFetching} />}
          />
          <Route
            path="editEncuesta"
            element={
              <ProtectedRoute
                isAllowed={!!enc}
                redirectTo={"/admin/showEncuesta"}
              >
                <PutEncuesta />
              </ProtectedRoute>
            }
          />
           <Route
            path="resEncuesta"
            element={
              <ProtectedRoute
                isAllowed={!!enc}
                redirectTo={"/admin/showEncuesta"}
              >
                <ListRespuesta />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default AppAdmin;
