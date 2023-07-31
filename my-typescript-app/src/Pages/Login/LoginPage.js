import React from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  return (
    <section>
      <div className="login-container">
        <p className="login-message">
          Kindly use your GitLab account to log in
        </p>
        <p className="login-message">
          In case you do not possess an account, kindly proceed to create one on{" "}
          <a href="https://gitlab.com/" target="_blank">
            {" "}
            Gitlab{" "}
          </a>
        </p>
        <button className="login-button" onClick={() => login()}>
          Login with Gitlab
        </button>
      </div>
    </section>
  );
};

export default LoginPage;
