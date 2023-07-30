import React from 'react';
import { useContext } from 'react';
import { AuthContext } from "react-oauth2-code-pkce"
import { EncryptionContext } from "../Containers";


const DocumentLister = (props) => {
    const {token} = useContext(AuthContext);
    const [groupName, projectName, encryptionKey, clear] = useContext(EncryptionContext);
    
    return <>
      {token ? (
        <>
          <div><span>The token: </span>{token}</div>
          <div><span>The Group: </span>{groupName}</div>
          <div><span>The project: </span>{projectName}</div>
          <div><span>The EncryptionKey: </span>{encryptionKey}</div>
          <div>https://docs.gitlab.com/ee/api/repositories.html</div>
          <div>curl --request GET --header "Authorization: Bearer {token}" --header "Content-Type:application/json" "https://gitlab.com/api/v4/projects/{groupName}%2F{projectName}/repository/tree"</div>
          <div>curl --request GET --header "Authorization: Bearer {token}" --header "Content-Type:application/json" --header "Accept:application/json" "https://gitlab.com/api/v4/projects/{groupName}%2F{projectName}/repository/files/README.md?ref=main"</div>
          <button onClick={()=> clear()}>clear encryption key</button>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export default DocumentLister;