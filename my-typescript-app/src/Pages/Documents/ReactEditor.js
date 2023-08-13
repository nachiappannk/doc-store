import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Typography } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ReactEditor.css";

import { EncryptionContext } from "../../Containers";
import { Loader } from "../../Components/Progress";
import { AlertWithAction } from "../../Components/Alerts";
import {
  createNewFileInRepository,
  getProjectFileData,
} from "../../Api/Services/ProjectsService";

export const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileName, setFileName] = useState("");
  const [isFileEdited, setFileEdited] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [
    selectedProject,
    encryptionKey,
    groupAccositedProjectList,
    clearEncryption,
    showAlertPopup,
  ] = useContext(EncryptionContext);
  const navigate = useNavigate();

  const onEditorStateChange = (eState) => {
    setEditorState(eState);
    setFileEdited(true);
  };

  const handleGoBack = (e) => {
    if (isFileEdited) {
      e.preventDefault();
      e.stopPropagation();
      showAlertPopup(true);
      return;
    } else {
      navigate("/");
    }
  };
  const saveFile = async () => {
    setUploading(true);
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);
    const content = {
      branch: "main",
      content: btoa(data),
      commit_message: "create a new file",
      encoding: "base64",
    };
    const res = await createNewFileInRepository(
      selectedProject.id,
      fileName + ".raw",
      content,
      encryptionKey
    );

    setUploading(false);
    setFileEdited(false);
  };

  const fetchAndUpdateFileData = async () => {
    setUploading(true);
    setFileName(props.fileName);
    console.log("filenameSet");
    const data = await getProjectFileData(
      selectedProject.id,
      props.fileName,
      encryptionKey
    );
    console.log("datafecth");
    console.log(data);
    const rawData = convertFromRaw(data);
    console.log("raw converted");
    const editorState = EditorState.createWithContent(rawData);
    setEditorState(editorState);
    setUploading(false);
  };

  useEffect(() => {
    if (props.fileName) {
      console.log("initiating fecth");
      fetchAndUpdateFileData();
    }
  }, []);
  return (
    <div className="p-4 w-full flex flex-col justify-start items-start">
      <Link
        className="flex flex-row justify-start items-start w-full md:w-auto hover:ring-blue-500 hover:border-blue-500"
        to={"/"}
        onClick={handleGoBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
        >
          <path
            fill="#000000"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          />
          <path
            fill="#000000"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          />
        </svg>
        <Typography>Go back</Typography>
      </Link>
      <div className="flex my-4 gap-2 flex-row justify-start items-center">
        <label htmlFor="editor-Filename">File Name </label>
        <input
          type="text"
          id="editor-Filename"
          value={fileName}
          placeholder="untitled"
          onChange={(e) => setFileName(e.target.value)}
          className="h-7 mt-2 px-3 border-b-2 border-slate-300"
        />
      </div>
      <div className="w-full">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <button
        onClick={saveFile}
        className="my-2 w-auto bg-teal-600 hover:bg-teal-900 p-2 px-4 rounded text-color-3-100"
      >
        <Typography>Save</Typography>
      </button>
      <Loader loading={uploading} />
    </div>
  );
};

export const EditExistingFile = (props) => {
  const { fileName } = useParams();
  return (
    <>
      <TextEditor fileName={fileName} {...props} />
    </>
  );
};
