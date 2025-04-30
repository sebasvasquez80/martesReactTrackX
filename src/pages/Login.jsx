import { useEffect, useState } from 'react'
import { usuarios } from '../services/database'
import { alert, generarToken, generarId } from '../helpers/funciones'
import { useNavigate } from 'react-router-dom'
import './Login.css'

let apiUsuarios = "https://back-json-server-martes.onrender.com/usuarios"

function Login() {
  const [getUser, setUser] = useState()
  const [getPassword, setPassword] = useState()
  const [getEmail, setEmail] = useState()
  const [getName, setName] = useState()
  const [usuarios, setUsuarios] = useState()
  let redirecction = useNavigate()

  function getUsuarios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
  }

  useEffect(() =>{
    getUsuarios();
  },[])

  getUsuarios()

  function searchUser() {
    let usuario = usuarios.find((item) => getUser === item.usuario && getPassword === item.contrasena)
    return usuario
  }
  function login() {
    if (searchUser()) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(searchUser()));
      alert("Welcome", "Acceso al sistema", "success");
      redirecction("/home");
    } else {
      alert("Error", "Usuario o contraseña incorrectos", "error")
    }
  }

  function register() {
    let newUser = {
      id: generarId(),
      nombre: getName,
      usuario: getUser,
      contrasena: getPassword,
      email: getEmail
    }
    let validar = usuarios.some((item) => item.usuario == getUser || item.email == getEmail)
    if(validar){
      alert("Error", "El usuario o el email ya existen", "error")
    } else {
      fetch(apiUsuarios,{
        method: "POST",
        body: JSON.stringify(newUser),
      })
      .then(()=> {
        alert("Usuario creado", "Acceso al sistema", "success")
        getUsuarios()
      })
      redirecction("/");
    }
  }

  return (
    <div className="container">
      <input id="signup_toggle" type="checkbox" />
      <form className="form">
        <div className="form_front">
          <div className="form_details">Login</div>
          <input onChange={(e) => setUser(e.target.value)} type="text" className="input" placeholder="Username" />
          <input onChange={(e) => setPassword(e.target.value)} type="text" className="input" placeholder="Password" />
          <button type='button' onClick={login} className="btn">Login</button>
          <span className="switch">Don't have an account?
            <label htmlFor="signup_toggle" className="signup_tog">
              Sign Up
            </label>
          </span>
        </div>
        <div className="form_back">
          <div className="form_details">SignUp</div>
          <input onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder="Firstname" />
          <input onChange={(e) => setUser(e.target.value)} type="text" className="input" placeholder="Username" />
          <input onChange={(e) => setPassword(e.target.value)} type="text" className="input" placeholder="Password" />
          <input onChange={(e) => setEmail(e.target.value)} type="text" className="input" placeholder="Email" />
          <button type='button' onClick={register} className="btn">Signup</button>
          <span className="switch">Already have an account?
            <label htmlFor="signup_toggle" className="signup_tog">
              Sign In
            </label>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login