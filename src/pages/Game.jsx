import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GlobalStateContext} from "../GlobalStateContext.jsx";

export default function Game() {
    const {id} = useParams();
    const {endpoint, username} = useContext(GlobalStateContext);
    const [game, setGame] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(endpoint + "/games/" + id, {
            method: "GET", headers: {
                "Content-Type": "application/json"
            },
        }).then(async r => {
            setGame(await r.json());
        });
    }, [endpoint, id, username]);

    if (!game) return null;

    return (
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
                <h1 className="text-body-emphasis mb-5">{id}</h1>
                <div className="container d-flex flex-wrap" style={{width: "500px"}}>
                    {game.value.flat().map((cell, index) => {
                        const row = Math.floor(index / 9);
                        const col = index % 9;

                        const borderStyle = {
                            width: '50px',
                            height: '50px',
                            fontSize: '40px',
                            padding: 0,
                            textAlign: 'center',
                            border: '1px solid #ddd',
                            borderTop: row % 3 === 0 ? '2px solid #000' : '1px solid #ddd',
                            borderLeft: col % 3 === 0 ? '2px solid #000' : '1px solid #ddd',
                            borderRight: (col + 1) % 3 === 0 ? '2px solid #000' : '1px solid #ddd',
                            borderBottom: (row + 1) % 3 === 0 ? '2px solid #000' : '1px solid #ddd'
                        };

                        return (
                            <input
                                key={index}
                                type="text"
                                className="form-control text-center"
                                style={borderStyle}
                                value={cell === 0 ? "" : cell}
                                onChange={async (event) => {
                                    const input = event.target.value;
                                    const solution = game.solution.flat()[index].toString();

                                    if (cell === 0 && input === solution) {
                                        const updatedGame = { ...game };
                                        updatedGame.value[row][col] = Number(solution);

                                        setGame(updatedGame);

                                        await fetch(endpoint + "/games/" + id, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(updatedGame.value)
                                        });
                                    }
                                }}
                            />
                        );
                    })}
                    <button className="btn btn-success mt-4" style={{width: "450px"}} onClick={() => navigate("/games")}>Back</button>
                </div>
            </div>
        </div>
    );
}
