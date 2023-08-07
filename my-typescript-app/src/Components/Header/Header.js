import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import BrandLogo from "../../Components/Images/BrandLogo.svg";
import { clearAuthToken } from "../../Api";

export const Header = () => {
  const { token, logOut, loginInProgress } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const name = authContext?.idTokenData?.name ?? "user";
  const handleLogout = () => {
    logOut()
    clearAuthToken()
  }

  if(!token ){
    return (
      <header className="absolute flex flex-row z-10 m-10 ml-24 items-center">
        <img className="h-8 w-8 mr-1" src={BrandLogo} />
        <p className="text-2xl font-semibold">DocuCrypt</p>
      </header>
    );
  }
  return (
    <header className="absolute flex justify-center z-10 w-full items-center bg-slate-300">
      <section className="flex p-8 max-w-5xl w-full justify-between items-center">
        <div className="flex flex-row flex-nowrap justify-center items-center">
          <img src={BrandLogo} className="h-12 m-2" />
          <p className="text-2xl text-center font-semibold">DocuCrypt</p>
        </div>
        <div className=" flex flex-col justify-center items-end text-lg ">
          <p className="p-1 px-2 text-end">{name}</p>
          <button
            className="text-md p-1 px-3 text-end rounded border-2 border-slate-600 hover:border-slate-800 hover:bg-slate-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
    </header>
  );
};
