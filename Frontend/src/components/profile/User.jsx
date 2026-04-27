import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserName from "./EditUserName";

function User() {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="header">
      {isEditing ? (
        <EditUserName setIsEditing={setIsEditing}/>
  ) : (
    <>
      <h1>Welcome back<br /> {user ? `${user.firstName} ${user.lastName} !` : ""} </h1>
      <button onClick={() => setIsEditing(true)} className="edit-button">Edit Name</button>
    </>
  )}
  </div>
  )
}

export default User