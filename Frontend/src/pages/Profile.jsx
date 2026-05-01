import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/profile/User";
import Account from "../components/profile/Account";
import { setUser } from "../features/auth/authSlice";

function Profile() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile",{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        const data = await response.json();

        if (!response.ok) {
          return;
        }

        dispatch(setUser(data.body))
      } catch {
        return;
      }
    }
    if (token) {
      fetchProfile()
    }
  }, [token, dispatch]

  )

  return (
    <main className="main bg-dark">
      <User />
      <Account />
    </main>
  )
}

export default Profile
