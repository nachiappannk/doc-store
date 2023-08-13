import React, { useEffect } from "react";
import { useState, createContext } from "react";
import sha256 from "crypto-js/sha256";
import CryptoJs from "crypto-js";
import { getAllAccesibleUserProjects } from "../../Api";
import { BasicSelect } from "../../Components/Selection/BasicSelect";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { genPassword } from "../../Utils/RandomPasswordGenerator";
import { Loader } from "../../Components/Progress";
import { AlertWithAction } from "../../Components/Alerts";
import { useNavigate } from "react-router-dom";
const EncryptionContext = createContext({});

const EncryptionContainer = (props) => {
  const [isContextSet, setIsContextSet] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isPassPhraseEnabled, setIsPassPhraseEnabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [groupAccositedProjectList, setGroupAccositedPProjectList] = useState(
    []
  );
  
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleProjectNameChange = (event) => {
    setSelectedProject(event.target.value);
    setProjectName(event.target.value.name);
    handleNext(event.target.value.name, passPhrase);
  };

  const handlePassPhraseChange = (event) => {
    let passPhraseLocal = event.target.value ?? "";
    setPassPhrase(passPhraseLocal);
    generateVerificationCode(passPhraseLocal);
  };
  const generateVerificationCode = (passPhraseLocal) => {
    let sha256Code = sha256(passPhraseLocal);
    let hexCode = sha256Code.toString(CryptoJs.enc.Hex).substring(0, 4);
    let intcode = parseInt(hexCode, 16);
    let verificationCode = intcode % 1000;
    let verificationCodeString = verificationCode.toString();
    setVerificationCode(verificationCodeString);
    handleNext(projectName, passPhraseLocal);
  };

  const handleNext = (pName, pp) => {
    let isValid = true;
    isValid = isValid && isStringValid(pName);
    setIsPassPhraseEnabled(isValid);
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
  };

  const copyPassPhrase = async () => {
    if ("clipboard" in navigator && passPhrase) {
      await navigator.clipboard.writeText(passPhrase);
    }
  };

  const fetchAllProjectData = async () => {
    await getAllAccesibleUserProjects().then(({ data }) => {
      const pList = data.flatMap((project) => {
        return {
          id: project.id,
          name: project.name_with_namespace,
        };
      });
      setGroupAccositedPProjectList(pList);
    });
  };

  const handleSetEncryption = () => {
    setIsContextSet(true);
  };

  const clearEncryption = () => {
    setPassPhrase("")
    setVerificationCode("")
    setIsContextSet(false);
  };

  useEffect(() => {
    fetchAllProjectData();
  }, []);

  const showAlertPopup =(val) => {
    setShowPopup(val)
  }

  if (!groupAccositedProjectList || groupAccositedProjectList.length === 0) {
    return (
      <div className="relative w-full h-full">
        <div className="mt-52 w-full h-full">
          <Loader
            loading={
              !groupAccositedProjectList ||
              groupAccositedProjectList.length === 0
            }
          />
        </div>
      </div>
    );
  }
  console.log(showPopup)
  return (
    <EncryptionContext.Provider
      value={[
        selectedProject,
        passPhrase,
        groupAccositedProjectList,
        clearEncryption,
        showAlertPopup,
      ]}
    >
      <div className=" h-full w-full flex flex-col justify-center items-center ">
        <div className="max-w-4xl mt-52 flex flex-row gap-2 md:gap-4 m-4 md:p-0 flex-wrap md:flex-nowrap justify-center items-start">
          <div className="w-full">
            <label htmlFor="project-select-outlined">Project Name</label>
            <BasicSelect
              Id="project-select-outlined"
              value={selectedProject}
              lists={groupAccositedProjectList}
              setDropdownValue={handleProjectNameChange}
              disabled={isContextSet}
            />
          </div>
          <div className="w-full">
            <label htmlFor="passphrase">Encryption Pass Phrase</label>
            <br />
            <input
              type="password"
              id="passphrase"
              value={passPhrase}
              disabled={!isPassPhraseEnabled || isContextSet}
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
              disabled={!isPassPhraseEnabled || isContextSet}
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
          <div className="w-full">
            <label htmlFor="verification-code">Verification Code</label>
            <br />
            <input
              type="text"
              id="verification-code"
              readOnly={true}
              value={verificationCode}
              disabled={!isPassPhraseEnabled || isContextSet}
              className="h-7 w-full mt-2 px-3 rounded border-2 border-slate-300"
            />
          </div>
          {!isContextSet ? (
            <button
              className={`w-full mt-7 h-7 text-center rounded border-2 border-slate-300 ${
                !isNextEnabled
                  ? "bg-slate-300"
                  : "hover:border-slate-800 hover:bg-slate-400"
              } `}
              disabled={!isNextEnabled}
              onClick={handleSetEncryption}
            >
              Set Encryption Key
            </button>
          ) : (
            <button
              className={`w-full mt-7 h-7 text-center rounded border-2 border-slate-300 ${
                !isContextSet
                  ? "bg-slate-300"
                  : "hover:border-slate-800 hover:bg-slate-400"
              } `}
              disabled={!isContextSet}
              onClick={clearEncryption}
            >
              Clear Encryption Key
            </button>
          )}
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 max-w-4xl w-full" />
        <div className="max-w-4xl w-full">{isContextSet && props.children}</div>
        {showPopup && (
          <AlertWithAction
            onConfim={() => {
              showAlertPopup(false);
              navigate("/");
            }}
            onCancel={() => showAlertPopup(false)}
          />
        )}
      </div>
    </EncryptionContext.Provider>
  );
};

export { EncryptionContext, EncryptionContainer };
