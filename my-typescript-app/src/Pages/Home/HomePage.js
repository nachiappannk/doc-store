import React from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { Navigate, Outlet } from "react-router-dom";

const HomePage = (props) => {
  const { token, loginInProgress } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const name = authContext?.idTokenData?.name ?? "user";
  console.log(authContext, props);
  if (loginInProgress) {
    return (
      <section className="flex justify-center items-center">
        <div className="h-40 p-4 flex justify-center items-center text-2xl ">
          <p>Please wait while we log you in ...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {token ? (
        <>         
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default HomePage;
