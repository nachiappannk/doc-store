import React, { useEffect } from "react";
import { useState, createContext } from "react";
import "./EncryptionContainer.css";
import sha256 from "crypto-js/sha256";
import CryptoJs from "crypto-js";
import { getGroups } from "../../Api";
import { BasicSelect } from "../../Components/Selection/BasicSelect";
import { getGroupProjects } from "../../Api/Services/ProjectsService";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { genPassword } from "../../Utils/RandomPasswordGenerator";
const EncryptionContext = createContext({});

const EncryptionContainer = (props) => {
  const [isContextSet, setIsContextSet] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isPassPhraseEnabled, setIsPassPhraseEnabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");

  const [groupList, setGroupList] = useState([]);
  const [groupAccositedProjectList, setGroupAccositedPProjectList] = useState(
    []
  );

  const handleGroupNameChange = async (event) => {
    setGroupName(event.target.value);
    handleNext(event.target.value, projectName, passPhrase);    
    await fetchProjectData(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
    handleNext(groupName, event.target.value, passPhrase);
  };

  const handlePassPhraseChange = (event) => {
    let passPhraseLocal = event.target.value ?? "";
    setPassPhrase(passPhraseLocal);
    generateVerificationCode(passPhraseLocal)
  };
  const generateVerificationCode = (passPhraseLocal) => {
    let sha256Code = sha256(passPhraseLocal);
    let hexCode = sha256Code.toString(CryptoJs.enc.Hex).substring(0, 4);
    let intcode = parseInt(hexCode, 16);
    let verificationCode = intcode % 1000;
    let verificationCodeString = verificationCode.toString();
    setVerificationCode(verificationCodeString);
    handleNext(groupName, projectName, passPhraseLocal);
  };

  const handleNext = (gName, pName, pp) => {
    let isValid = true;
    isValid = isValid && isStringValid(gName);
    isValid = isValid && isStringValid(pName);
    setIsPassPhraseEnabled(isValid)
    isValid = isValid && isStringValid(pp);
    setIsNextEnabled(isValid);
  };

  const isStringValid = (str) => {
    return !!(str && str.trim());
  };

  const genrateRandomKey = () => {
    const ppGenerated = genPassword();
    setPassPhrase(ppGenerated);
    generateVerificationCode(ppGenerated);
  }

  const copyPassPhrase = async () => {
    if ("clipboard" in navigator && passPhrase) {
      await navigator.clipboard.writeText(passPhrase);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await getGroups().then(({ data }) => {
        setGroupList(data)
      });
    }
    fetchData();
  }, []);

  
  const fetchProjectData = async (gName) => {
      const group = groupList.filter((x) => x.name == gName);
      await getGroupProjects(group[0].id).then(({ data }) => {
        setGroupAccositedPProjectList(data);
      });
  }

  const handleSetEncryption = () => {
    setIsContextSet(true)

  }

  const clearEncryption = () => {
    setIsContextSet(false);
  };

  if (groupList === []){
    <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        loading...
      </div>
    </div>;
  }
    return (
      <>
        {!isContextSet ? (
          <>
            <div className="relative  flex flex-row justify-center items-center ">
              <div className="mt-52 flex flex-col justify-center items-start">
                <div className="w-full">
                  <label htmlFor="group-select-outlined">Group Name</label>
                  <BasicSelect
                    Id="group-select-outlined"
                    value={groupName}
                    lists={groupList}
                    setDropdownValue={handleGroupNameChange}
                  />
                </div>
                <br />
                <div className="w-full">
                  <label htmlFor="project-select-outlined">Project Name</label>
                  <BasicSelect
                    Id="project-select-outlined"
                    value={projectName}
                    lists={groupAccositedProjectList}
                    setDropdownValue={handleProjectNameChange}
                  />
                </div>
                <br />
                <div className="w-full">
                  <label htmlFor="passphrase">Encryption Pass Phrase</label>
                  <br />
                  <input
                    type="password"
                    id="passphrase"
                    value={passPhrase}
                    disabled={!isPassPhraseEnabled}
                    onChange={handlePassPhraseChange}
                    className="w-full h-7 px-3 mt-2 rounded border-2 border-slate-300"
                  />
                  <br />
                  <button
                    className={`text-sm p-1 mt-2 rounded border-2 border-slate-300 ${
                      !isPassPhraseEnabled
                        ? "bg-slate-300"
                        : "hover:border-slate-800 hover:bg-slate-400"
                    } `}
                    onClick={genrateRandomKey}
                    disabled={!isPassPhraseEnabled}
                  >
                    Generate
                  </button>
                  <button
                    disabled={!isPassPhraseEnabled}
                    onClick={copyPassPhrase}
                    className={` ${
                      !isPassPhraseEnabled ? "" : "hover:text-color-3-700"
                    } `}
                  >
                    <ContentCopyIcon
                      sx={{
                        p: 0.5,
                        mx: 1,
                        height: 32,
                      }}
                      onClick={copyPassPhrase}
                    />
                  </button>
                </div>
                <br />
                <div className="w-full">
                  <label htmlFor="verification-code">Verification Code</label>
                  <br />
                  <input
                    type="text"
                    id="verification-code"
                    readOnly={true}
                    value={verificationCode}
                    disabled={!isPassPhraseEnabled}
                    className="h-7 w-full mt-2 px-3 rounded border-2 border-slate-300"
                  />
                </div>
                <br />
                <button
                  className={`w-full h-7 text-center rounded border-2 border-slate-300 ${
                    !isNextEnabled
                      ? "bg-slate-300"
                      : "hover:border-slate-800 hover:bg-slate-400"
                  } `}
                  disabled={!isNextEnabled}
                  onClick={handleSetEncryption}
                >
                  Set Encryption Key
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <EncryptionContext.Provider
              value={[groupName, projectName, passPhrase, groupAccositedProjectList, clearEncryption]}
            >
              <div>{props.children}</div>
            </EncryptionContext.Provider>
          </>
        )}
      </>
    );
};

export { EncryptionContext, EncryptionContainer };
