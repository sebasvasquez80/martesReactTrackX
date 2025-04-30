import Login from '../pages/Login.jsx';
import Home from '../Home.jsx';
import RutaProtegida from '../components/RutaProtegida.jsx';
export let enrutador = [
    {
    path: '/',
    element: <Login/>
    },
    {
        path: '/home',
        element: <RutaProtegida protect={<Home/>}/>
    }
]