import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalStateProvider} from "./GlobalStateContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Games from "./pages/Games.jsx";
import Game from "./pages/Game.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
    return (<GlobalStateProvider>
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/games" element={<Games/>}/>
                <Route path="/games/:id" element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    </GlobalStateProvider>)
}

export default App
