import React from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { Navigate, Outlet } from "react-router-dom";

const HomePage = (props) => {
  const { token, logOut, loginInProgress } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const name = authContext?.idTokenData?.name ?? "user";
  console.log(authContext, props)
  if(loginInProgress){
    return <p className="login-message">Please Wait while we log you in</p>;
  }
  return (
    <>
      {token ? (
        <div className="login-container">
          <p className="login-message">Welcome {name}</p>
          <button className="login-button" onClick={() => logOut()}>
            Logout
          </button>
          <Outlet/>
        </div>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default HomePage;
