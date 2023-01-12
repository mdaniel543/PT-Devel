import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./Protected";
import hello from "../assets/waving-hand.svg";
import LoginPage from "../pages/login";
import AppAdmin from "./private/Admin";
import RespEnc from "./public/RespEnc";

function App() {
  const isAuth = useSelector((state) => state.sesion.sesion);
  const user = useSelector((state) => state.sesion.usuario);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <AppAdmin id={user?.Id} /> : <Home />} />
        <Route path="/encuesta/:id" element={<RespEnc />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAllowed={!!isAuth}>
              <AppAdmin id={user?.Id} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isAuth} redirectTo={"/"}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="/notAllowed" element={<NotAllowed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <Navbar params={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <h1>Bienvenido</h1>{" "}
        <img src={hello} width={60} height={60} alt="hello" />
      </div>
    </>
  );
}

function NotAllowed() {
  return (
    <>
      <Navbar params={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <h1>401: Not Allowed!</h1>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <>
      <Navbar params={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <h1>404: Not Found!</h1>
      </div>
    </>
  );
}

export default App;
