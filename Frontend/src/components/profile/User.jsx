import { useSelector } from "react-redux"

function User () {
    const user = useSelector((state) => state.auth.user)
    return (
        <div className="header">
        <h1>Welcome back<br /> {user ? `${user.firstName} ${user.lastName} !`: ""} </h1>
        <button className="edit-button">Edit Name</button>
      </div>
    )
}

export default User