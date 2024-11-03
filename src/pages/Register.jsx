import {useContext, useState} from "react";
import {GlobalStateContext} from "../GlobalStateContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const {setUsername, endpoint} = useContext(GlobalStateContext)
    
    const [tempUsername, setTempUsername] = useState("")
    const [tempPassword, setTempPassword] = useState("")
    const [validationColor, setValidationColor] = useState("white")
    const [existsColor, setExistsColor] = useState("white")
    
    const navigate = useNavigate()

    return (<div className="container my-5" style={{maxWidth: "500px"}}>
        <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis mb-5">Register</h1>
            <form className="text-start" onSubmit={(event) => {
                event.preventDefault()
                if (tempUsername.length >= 8 && tempUsername.length <= 20 && !tempUsername.includes(" ") && tempPassword.length >= 8 && tempPassword.length <= 20 && !tempPassword.includes(" ")) {
                    fetch(endpoint + "/users/new", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            username: tempUsername,
                            password: tempPassword,
                        })
                    }).then((r) => {
                        if (r.status === 500) {
                            setExistsColor("danger")
                        } else {
                            setUsername(tempUsername)
                            navigate("/")
                        }
                    })
                } else {
                    setValidationColor("danger")
                }
            }}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" onChange={(event) => {
                        setTempUsername(event.target.value)
                        setValidationColor("white")
                        setExistsColor("white")
                    }}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" aria-label="Password"
                           aria-describedby="basic-addon2" onChange={(event) => {
                        setTempPassword(event.target.value)
                        setValidationColor("white")
                    }}/>
                </div>
                <div className={"form-text mb-3 text-opacity-75 text-" + validationColor}>
                    Your username and password must be 8-20 characters long and must not contain spaces.
                </div>
                <div className={"form-text mb-3 text-opacity-75 text-" + existsColor}>
                    Your username must not already exist.
                </div>
                <div className="mb-5"/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>);
}
