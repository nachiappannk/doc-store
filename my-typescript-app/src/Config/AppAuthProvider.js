import { AuthProvider } from "react-oauth2-code-pkce";
const origin = window.location.origin.replace(/\/$/, "") + "/";

const login = window.location.origin.replace(/\/$/, "") + "/login";

const AuthConfig = {
  clientId: "6eb6e1f06303fb4a94296cc3452564cb01801b4e964422509497519a7fea65e4",
  authorizationEndpoint: "https://gitlab.com/oauth/authorize",
  tokenEndpoint: "https://gitlab.com/oauth/token",
  redirectUri: origin,
  logoutRedirect: login,
  scope:
    "api read_api read_user create_runner read_repository write_repository read_registry write_registry read_observability write_observability sudo admin_mode openid profile email",
  onRefreshTokenExpire: (event) =>
    window.confirm(
      "Session expired. Refresh page to continue using the site?"
    ) && event.login(),
  autoLogin: false,
  decodeToken: false
};

const AppAuthProvider = (props) => {
  return <AuthProvider authConfig={AuthConfig}>{props.children}</AuthProvider>;
};

export default AppAuthProvider;
