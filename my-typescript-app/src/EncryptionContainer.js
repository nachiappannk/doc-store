import React from 'react';
import { useState, createContext, useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import './EncryptionContainer.css';

const EncryptionContext = createContext();

const EncryptionContainer = (props) => {
  const [encryptionPhrase, setEncryptionPhrase] = useState("Nachiappan");
  const { token } = useContext(AuthContext);
  const [groupName, setGroupName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [passPhrase, setPassPhrase] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handlePassPhraseChange = (event) => {
    setPassPhrase(event.target.value);
  };


  return <>
    {token ? (
      <>
        <div className="centered-container">
          <EncryptionContext.Provider value={encryptionPhrase}>
            <div>
              <div className="input-group">
                <label htmlFor="group-name-input">Group Name:</label>
                <input
                  type="text"
                  id="group-name-input"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </div>
              <br />
              <div className="input-group">
                <label htmlFor="project-name-input">Project Name</label>
                <input
                  type="text"
                  id="project-name-input"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>
              <br/>
              <div className="input-group">
                <label htmlFor="passphrase">Encryption Pass Phrase</label>
                <input
                  type="password"
                  id="passphrase"
                  value={passPhrase}
                  onChange={handlePassPhraseChange}
                />
              </div>
              <br/>
            </div>
            <div>start of encryption container</div>
            <div>
              {props.children}
            </div>
            <div>end of encryption container</div>
          </EncryptionContext.Provider>
        </div>
      </>
    ) : (
      <>
        <div>Error</div>
      </>
    )}
  </>
}

export { EncryptionContext }
export default EncryptionContainer;

