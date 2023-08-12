import React from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileShield } from "@fortawesome/free-solid-svg-icons";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";

import { redirect } from "react-router-dom";

const LoginPage = () => {
  const { login, token } = useContext(AuthContext);
  if (token) {
    redirect("/");
  }

  return (
    <div>
      <section className="container-2xl h-[100vh]  justify-center  items-center flex flex-row flex-wrap">
        <div className="m-8 mt-20 md:m-8 flex flex-row flex-wrap gap-5 justify-start  items-center w-full md:w-7/12">
          <FontAwesomeIcon
            icon={faFileShield}
            className="w-12 h-12 md:w-[240px] md:h-[240px] text-primary-400"
          />
          <div className="flex flex-col col-auto w-80 text-gray-500">
            <p className="text-4xl font-bold">Welcome to DocuCrypt</p>
            <p className="text-xl mt-4">
              Super charge your privacy with documents
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 h-80 m-4 p-8 border-2 rounded shadow hover:shadow-lg">
          <p className="text-lg font-semibold">
            Use your GitLab account to log in
          </p>
          <button
            className="border-2 p-1 rounded flex flex-row w-full  justify-center text-primary-400 font-semibold hover:bg-primary-200"
            onClick={() => login()}
          >
            <FontAwesomeIcon
              icon={faGitlab}
              className="w-[20px] h-[20px]  p-1"
            />
            <span>Login with Gitlab</span>
          </button>
          <p className="text-lg font-semibold">or</p>
          <p className="text-lg font-semibold">Create Gitlab account</p>
          <a
            className="border-2 p-1 rounded flex flex-row w-full  justify-center bg-primary-500 hover:bg-primary-600"
            href="https://gitlab.com/"
            target="_blank"
          >
            <button>Sign up</button>
          </a>
        </div>
        <div className="absolute left-0 top-0 bg-teal-950 overflow-hidden -z-10 h-1/2 w-full rounded-b-[200px] md:rounded-bl-[0px] md:rounded-br-[200px] md:rounded-r-[200px] md:h-full md:w-7/12" />
      </section>
    </div>
  );
};

export default LoginPage;
