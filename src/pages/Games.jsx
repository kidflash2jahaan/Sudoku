import GameCard from "../components/GameCard.jsx";
import {useContext, useEffect, useState} from "react";
import {GlobalStateContext} from "../GlobalStateContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Games() {
    const {endpoint, username} = useContext(GlobalStateContext)
    const [games, setGames] = useState([])
    const [newDifficulty, setNewDifficulty] = useState("Easy")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(endpoint + "/users/" + username + "/games", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            },
        }).then(async r => {
            setGames(await r.json())
        })
    }, [endpoint, username]);

    return (<div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">Games</h1>
            <div className="container text-start my-5">
                <div className="p-5 bg-body-secondary rounded-3">
                    <div className="row">
                        <h1 className="text-body-emphasis col-8">Create a New Game</h1>
                        <div className="dropdown col-2">
                            <button className="btn btn-dark dropdown-toggle fs-3 mb-2" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Difficulty: <span className="text-success">{newDifficulty}</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => setNewDifficulty("Easy")}>Easy</a></li>
                                <li><a className="dropdown-item" onClick={() => setNewDifficulty("Medium")}>Medium</a></li>
                                <li><a className="dropdown-item" onClick={() => setNewDifficulty("Hard")}>Hard</a></li>
                            </ul>
                        </div>
                        <button className="btn btn-success" onClick={() => {
                            fetch(endpoint + "/users/" + username + "/new?difficulty=" + newDifficulty, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }}).then(async r => await r.json().then(r => navigate(r.location)))
                        }}>Play
                        </button>
                    </div>
                </div>
            </div>
            {games.slice().reverse().map(game => {
                const {id, difficulty} = game

                return (<GameCard key={id} idProp={id} difficultyProp={difficulty}/>)
            })}
        </div>
    </div>)
}
