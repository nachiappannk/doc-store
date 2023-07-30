import React from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { EncryptionContext } from "../Containers";

const GetTokenFromCache = () => {
  const { token } = useContext(AuthContext);
  return token;
};

const GetEncryptionDetails = () => {
  const [groupName, projectName, encryptionKey, clear] =
    useContext(EncryptionContext);

  return { groupName, projectName, encryptionKey, clear };
};
