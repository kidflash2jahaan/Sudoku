import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {GlobalStateContext} from "../GlobalStateContext.jsx";

export default function Home() {
    const navigate = useNavigate();
    const {username} = useContext(GlobalStateContext)

    useEffect(() => {
        if (username !== "") {
            navigate("/games")
        } else {
            navigate("/login")
        }
    }, [navigate, username]);

    return (<main/>)
}