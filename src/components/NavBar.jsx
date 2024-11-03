import {useContext} from "react";
import {GlobalStateContext} from "../GlobalStateContext.jsx";
import {useNavigate} from "react-router-dom";

export default function NavBar() {
    const {username, setUsername} = useContext(GlobalStateContext)
    const navigate = useNavigate()
    
    return (<div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span className="fs-4">Sudoku</span>
            </a>

            <ul className="nav nav-pills">
                <li className="nav-item"><button className="nav-link" disabled={username !== ""} onClick={() => navigate("/login")}>Login</button></li>
                <li className="nav-item"><button className="nav-link" disabled={username !== ""} onClick={() => navigate("/register")}>Register</button></li>
                <li className="nav-item"><button className="nav-link" disabled={username === ""} onClick={() => navigate("/games")}>Games</button></li>
                <li className="nav-item"><button className="nav-link" disabled={username === ""} onClick={() => {
                    setUsername("")
                    navigate("/")
                }}>Logout</button></li>
            </ul>
        </header>
    </div>)
}