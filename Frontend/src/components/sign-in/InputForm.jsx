import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function InputForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            const data = await response.json()

            if (!response.ok) {
                setError("Identifiants incorrects")
                return
            }

            dispatch(setCredentials({ token: data.body.token }));
            navigate("/profile");
            console.log("Token reçu :", data.body.token);
            
        } catch (error) {
            setError("erreur de connexion au serveur");
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p className="sign-in-content__error">{error}</p>}
            <button type="submit" className="sign-in-button">Sign In</button>
        </form>
    )
}

export default InputForm
