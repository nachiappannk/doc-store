import React from 'react';
import { useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"


const DocumentLister = (props) => {
    const {token} = useContext(AuthContext);
    return <>
      {token ? (
        <>
          <div>
                <h4>Main Document</h4>
                <span>The token: </span>{token}
          </div>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export default DocumentLister;