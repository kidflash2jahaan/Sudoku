import {useNavigate} from "react-router-dom";

export default function GameCard(props) {
    const navigate = useNavigate()
    
    return (<div className="container text-start my-5">
        <div className="p-5 bg-body-secondary rounded-3">
            <div className="row">
                {/* eslint-disable-next-line react/prop-types */}
                <h1 className="text-body-emphasis col-8">{props.idProp}</h1>
                {/* eslint-disable-next-line react/prop-types */}
                <div className="col fs-2">Difficulty: <span className="text-success">{props.difficultyProp}</span></div>
                {/* eslint-disable-next-line react/prop-types */}
                <button className="btn btn-primary" onClick={() => navigate("/games/" + props.idProp)}>Play</button>
            </div>
        </div>
    </div>)
}