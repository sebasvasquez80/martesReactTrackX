import Login from '../pages/Login.jsx';
import Home from '../Home.jsx';
export let enrutador = [
    {
    path: '/',
    element: <Login/>
    },
    {
        path: '/home',
        element: <Home/>
    }
]