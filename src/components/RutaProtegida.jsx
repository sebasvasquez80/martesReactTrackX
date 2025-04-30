import { Navigate } from "react-router-dom"

function RutaProtegida({ protect }) {
  let tokenAcceso = localStorage.getItem("token")
  return tokenAcceso ? protect : <Navigate to="/"/>
}

export default RutaProtegida