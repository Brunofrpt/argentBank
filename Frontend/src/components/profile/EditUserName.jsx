import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

function EditUserName ({ setIsEditing }) {
    const user = useSelector((state) => state.auth.user);
    const [username, setUsername] = useState(user ? user.userName : "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userName: username,
                })
            });
            const data = await response.json();

            if (!response.ok) {
                setError("Le nom d'utilisateur n'a pas pu être modifié");
                return;
            }

            dispatch(setUser(data.body));
            setIsEditing(false);
        } catch {
            setError("erreur de connexion au serveur");
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    return (
        <section className="sign-in-content">
            <h1 className="edit-user-title">Edit user info</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">user name:</label>
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="firstname">First name:</label>
                    <input type="text" id="firstname" value={user ? user.firstName : ""} disabled />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="lastName">Last name:</label> 
                    <input type="text" id="lastName" value={user ? user.lastName : ""} disabled />
                </div>
                {error && <p className="sign-in-content__error">{error}</p>}
                <div className="edit-user-actions">
                    <button className="edit-button" type="submit">Save</button>
                    <button className="edit-button" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default EditUserName
